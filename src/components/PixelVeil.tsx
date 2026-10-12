'use client';

import { useEffect, useRef } from 'react';

// number of recent pointer positions kept for the magenta pixel trail
const TRAIL_LENGTH = 12;

const VERTEX_SHADER = `attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

// One density field decides how "pixelated" each cell is: dense toward the edges, drifting noise patches, more as
// the page scrolls, cleared around the pointer, and boosted along the pointer trail. Dense cells become solid pixel
// squares (the cell's average photo color) separated by a thin dark gap; light cells show the sharp photo.
const FRAGMENT_SHADER = `precision highp float;
uniform sampler2D u_tex;
uniform vec2 u_res; uniform float u_cell; uniform vec2 u_off; uniform vec2 u_scale; uniform float u_aspect;
uniform float u_time; uniform float u_reveal; uniform float u_scroll; uniform float u_radius;
uniform vec3 u_mouse; uniform vec3 u_trail[${TRAIL_LENGTH}];
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 src(vec2 p) { return texture2D(u_tex, u_off + clamp(p / u_res, 0.0, 1.0) * u_scale).rgb; }
void main() {
  vec2 p = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  vec2 cell = floor(p / u_cell); vec2 c0 = cell * u_cell; vec2 mid = c0 + u_cell * 0.5;
  vec3 photo = src(p);
  vec3 cc = (src(c0 + u_cell * vec2(0.25)) + src(c0 + u_cell * vec2(0.75, 0.25)) +
             src(c0 + u_cell * vec2(0.25, 0.75)) + src(c0 + u_cell * vec2(0.75))) * 0.25;

  // density, evaluated once per cell so every square is uniform
  vec2 q = mid / u_res - vec2(0.62, 0.42);
  float a = smoothstep(0.2, 0.8, length(vec2(q.x * u_aspect * 1.6, q.y * 1.6)));
  float nz = noise(vec2(mid.x / u_res.x * 3.2 + u_time * 0.035, mid.y / u_res.y * 2.4 - u_time * 0.022));
  a = max(a, smoothstep(0.55, 0.95, nz) * 0.75);
  a = clamp(a + u_scroll * 0.8, 0.0, 1.0);
  a *= mix(1.0, smoothstep(0.2, 1.0, length(mid - u_mouse.xy) / u_radius), u_mouse.z);
  float trail = 0.0;
  for (int i = 0; i < ${TRAIL_LENGTH}; i++) {
    vec3 t = u_trail[i];
    trail = max(trail, t.z * (1.0 - smoothstep(0.0, u_cell * 5.0, length(mid - t.xy))));
  }
  a = max(a, trail * 0.9);
  a = mix(1.0, a, u_reveal);
  float k = a * a * (3.0 - 2.0 * a);

  // squares grow with density; per-cell jitter scatters the edge of the veil; 1px gap between squares
  float size = clamp(k * 1.15 - hash(cell) * 0.25, 0.0, 1.0);
  vec2 d = abs(fract(p / u_cell) - 0.5);
  float inSquare = step(max(d.x, d.y), 0.5 * size - 0.5 / u_cell) * step(0.02, size);

  vec3 gap = vec3(0.043, 0.114, 0.184);
  vec3 col = mix(mix(photo, gap, k), cc, inSquare);
  col = mix(col, vec3(1.0), step(0.985, hash(cell + 7.0)) * k * inSquare * 0.35);
  col = mix(col, vec3(1.0, 0.36, 0.72), clamp(trail * 1.4, 0.0, 1.0) * inSquare);
  gl_FragColor = vec4(col, 1.0);
}`;

const UNIFORMS = [
  'u_tex',
  'u_res',
  'u_cell',
  'u_off',
  'u_scale',
  'u_aspect',
  'u_time',
  'u_reveal',
  'u_scroll',
  'u_radius',
  'u_mouse',
  'u_trail',
] as const;

// eases `from` toward `to`, snapping once it's close enough to stop re-rendering
const approach = (from: number, to: number, rate: number) => {
  const next = from + (to - from) * rate;
  return Math.abs(next - to) < 0.002 ? to : next;
};

/**
 * WebGL "pixel veil" over the hero photo. The photo is the `<img>` already in the hero (passed in via `imageSelector`),
 * so there's nothing extra to download. With a mouse on a wide screen the veil drifts, clears around the cursor,
 * leaves a magenta pixel trail, and fills in as you scroll; otherwise (touch, small screens, reduced motion) it
 * renders a single still frame. If WebGL isn't available the canvas stays hidden and the plain photo shows.
 */
export default function PixelVeil({ imageSelector }: { imageSelector: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Shader compile + texture upload are deferred until the browser is idle so they never compete with the page's
    // first paint and hydration; the photo underneath is already visible in the meantime.
    const setup = (): (() => void) | undefined => {
      const canvas = canvasRef.current;
      const host = canvas?.parentElement;
      const image = host?.querySelector<HTMLImageElement>(imageSelector);
      if (!canvas || !host || !image) return;

      const options = { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'low-power' };
      const gl = (canvas.getContext('webgl2', options) ?? canvas.getContext('webgl', options)) as
        | WebGL2RenderingContext
        | WebGLRenderingContext
        | null;
      if (!gl) return;

      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
      };
      const vertex = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
      const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      const program = gl.createProgram();
      if (!vertex || !fragment || !program) return;
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
      gl.useProgram(program);

      // one oversized triangle covering the screen
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'a_pos');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      const uniform = Object.fromEntries(
        UNIFORMS.map((name) => [name, gl.getUniformLocation(program, name)])
      ) as Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>;

      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.uniform1i(uniform.u_tex, 0);

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const wideScreen = window.matchMedia('(min-width: 760px)').matches;
      const motion = !reduceMotion && wideScreen;

      let dpr = 1;
      let width = 1;
      let height = 1;
      let frame = 0;
      let visible = true;
      let textureReady = false;
      let disposed = false;
      const start = performance.now();
      let revealStart = 0;
      let reveal = motion ? 0 : 1;
      let scroll = 0;
      // pointer position (eased toward target) and how strongly it clears the veil (0..1)
      let mouseX = -1e5;
      let mouseY = -1e5;
      let targetX = -1e5;
      let targetY = -1e5;
      let mouseStrength = 0;
      let targetStrength = 0;
      let lastTrailPush = 0;
      const trail: { x: number; y: number; s: number }[] = [];
      const trailData = new Float32Array(TRAIL_LENGTH * 3);

      const resize = () => {
        const bounds = canvas.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = Math.max(1, Math.round(bounds.width * dpr));
        height = Math.max(1, Math.round(bounds.height * dpr));
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      };

      const render = (now: number) => {
        frame = 0;
        if (disposed || !textureReady) return;

        if (reveal < 1) {
          revealStart ||= now;
          reveal = 1 - (1 - Math.min(1, (now - revealStart) / 1500)) ** 3;
        }
        mouseStrength = approach(mouseStrength, targetStrength, 0.08);
        mouseX = mouseX < -1e4 ? targetX : approach(mouseX, targetX, 0.2);
        mouseY = mouseY < -1e4 ? targetY : approach(mouseY, targetY, 0.2);
        for (const point of trail) point.s *= 0.93;
        while (trail.length && trail[0].s < 0.02) trail.shift();

        // "object-fit: cover" mapping from the canvas onto the photo
        const imageAspect = image.naturalWidth / image.naturalHeight;
        const canvasAspect = width / height;
        const scaleX = imageAspect > canvasAspect ? canvasAspect / imageAspect : 1;
        const scaleY = imageAspect > canvasAspect ? 1 : imageAspect / canvasAspect;
        const cell = (width / dpr < 1100 ? 9 : 11) * dpr;

        gl.uniform2f(uniform.u_res, width, height);
        gl.uniform1f(uniform.u_cell, cell);
        gl.uniform2f(uniform.u_off, (1 - scaleX) * 0.5, (1 - scaleY) * 0.5);
        gl.uniform2f(uniform.u_scale, scaleX, scaleY);
        gl.uniform1f(uniform.u_aspect, Math.min(1, height / width + 0.35));
        gl.uniform1f(uniform.u_time, motion ? (now - start) / 1000 : 0);
        gl.uniform1f(uniform.u_reveal, reveal);
        gl.uniform1f(uniform.u_scroll, scroll);
        gl.uniform1f(uniform.u_radius, Math.max(180 * dpr, Math.min(width, height) * 0.28));
        gl.uniform3f(uniform.u_mouse, mouseX, mouseY, mouseStrength);
        trailData.fill(0);
        trail.forEach((point, index) => trailData.set([point.x, point.y, point.s], index * 3));
        gl.uniform3fv(uniform.u_trail, trailData);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        canvas.style.opacity = '1';

        // with motion on, the drift keeps it running; otherwise one still frame is enough
        if (motion && visible && !document.hidden) schedule();
      };

      const schedule = () => {
        if (!frame && !disposed) frame = requestAnimationFrame(render);
      };

      const uploadTexture = () => {
        if (!image.complete || !image.naturalWidth) return;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        textureReady = true;
        schedule();
      };

      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        const bounds = canvas.getBoundingClientRect();
        targetX = (event.clientX - bounds.left) * dpr;
        targetY = (event.clientY - bounds.top) * dpr;
        targetStrength = 1;
        const now = performance.now();
        if (now - lastTrailPush > 32) {
          lastTrailPush = now;
          trail.push({ x: targetX, y: targetY, s: 1 });
          if (trail.length > TRAIL_LENGTH) trail.shift();
        }
        schedule();
      };
      const onPointerLeave = () => {
        targetStrength = 0;
        schedule();
      };
      const onScroll = () => {
        const bounds = canvas.getBoundingClientRect();
        const next = Math.min(1, Math.max(0, -bounds.top / Math.max(1, bounds.height)));
        if (Math.abs(next - scroll) > 0.004) {
          scroll = next;
          schedule();
        }
      };
      const onVisibilityChange = () => {
        if (!document.hidden) schedule();
      };

      let resizeTimer = 0;
      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          resize();
          schedule();
        }, 120);
      };

      const visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) schedule();
        },
        { rootMargin: '160px 0px' }
      );

      resize();
      uploadTexture();
      image.addEventListener('load', uploadTexture);
      visibilityObserver.observe(canvas);
      window.addEventListener('resize', onResize);
      document.addEventListener('visibilitychange', onVisibilityChange);
      if (motion) {
        host.addEventListener('pointermove', onPointerMove, { passive: true });
        host.addEventListener('pointerleave', onPointerLeave);
        window.addEventListener('scroll', onScroll, { passive: true });
      }

      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        window.clearTimeout(resizeTimer);
        image.removeEventListener('load', uploadTexture);
        visibilityObserver.disconnect();
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        host.removeEventListener('pointermove', onPointerMove);
        host.removeEventListener('pointerleave', onPointerLeave);
        window.removeEventListener('scroll', onScroll);
        // (no loseContext(): in dev, React remounts effects on the same canvas and would get the dead context back)
      };
    };

    let cleanup: (() => void) | undefined;
    const run = () => {
      cleanup = setup();
    };
    const idle = 'requestIdleCallback' in window;
    const handle = idle ? window.requestIdleCallback(run, { timeout: 800 }) : window.setTimeout(run, 200);
    return () => {
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      cleanup?.();
    };
  }, [imageSelector]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[15] size-full opacity-0 transition-opacity duration-500 motion-reduce:transition-none"
    />
  );
}
