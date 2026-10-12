'use client';

import { useEffect, useRef } from 'react';

type Point = [number, number, number];

export type WireShapeKind = 'scales' | 'leaf' | 'access';

// sample `count` points along a straight segment
function line(from: Point, to: Point, count: number): Point[] {
  return Array.from({ length: count + 1 }, (_, i) => {
    const t = i / count;
    return [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t, from[2] + (to[2] - from[2]) * t];
  });
}

// sample a circle around `center`; `plane` picks which two axes it spans
function circle(center: Point, radius: number, count: number, plane: 'xy' | 'xz' = 'xy', from = 0, to = Math.PI * 2) {
  return Array.from({ length: count }, (_, i): Point => {
    const a = from + ((to - from) * i) / count;
    const u = Math.cos(a) * radius;
    const v = Math.sin(a) * radius;
    return plane === 'xy' ? [center[0] + u, center[1] + v, center[2]] : [center[0] + u, center[1], center[2] + v];
  });
}

// Each shape is a cloud of points sampled along 3D curves, all within a unit sphere (y points down on screen).
const SHAPES: Record<WireShapeKind, () => Point[]> = {
  // balance scales: ethical design
  scales: () => {
    const points: Point[] = [];
    points.push(...line([0, -0.62, 0], [0, 0.6, 0], 70)); // pillar
    points.push(...line([-0.28, 0.6, 0], [0.28, 0.6, 0], 30)); // base
    points.push(...circle([0, 0.6, 0], 0.28, 60, 'xz')); // base disc
    points.push(...circle([0, -0.68, 0], 0.06, 24)); // finial
    points.push(...line([-0.62, -0.5, 0], [0.62, -0.5, 0], 80)); // beam
    for (const side of [-1, 1]) {
      const x = side * 0.58;
      // chains down to a shallow pan
      points.push(...line([x, -0.5, 0], [x - 0.2, 0.05, 0], 30), ...line([x, -0.5, 0], [x + 0.2, 0.05, 0], 30));
      points.push(...line([x, -0.5, 0], [x, 0.05, -0.2], 30), ...line([x, -0.5, 0], [x, 0.05, 0.2], 30));
      for (let ring = 0; ring < 3; ring++)
        points.push(...circle([x, 0.05 + ring * 0.035, 0], 0.2 - ring * 0.05, 60, 'xz'));
    }
    return points;
  },
  // leaf with midrib, veins, and stem: sustainability
  leaf: () => {
    const points: Point[] = [];
    const width = (t: number) => Math.sin(Math.PI * t) ** 0.9 * 0.36;
    const curl = (t: number) => Math.sin(Math.PI * t) * 0.12;
    for (let i = 0; i <= 160; i++) {
      const t = i / 160;
      const y = 0.72 - t * 1.44;
      points.push([width(t), y, curl(t)], [-width(t), y, curl(t)]); // outline
      points.push([0, y, curl(t) * 1.3]); // midrib
    }
    for (let v = 1; v < 8; v++) {
      const t0 = v / 8;
      const y0 = 0.72 - t0 * 1.44;
      for (const side of [-1, 1]) {
        const tip = Math.min(0.98, t0 + 0.12);
        const yTip = 0.72 - tip * 1.44;
        points.push(...line([0, y0, curl(t0) * 1.3], [side * width(tip) * 0.92, yTip, curl(tip)], 24));
      }
    }
    points.push(...line([0, 0.72, 0], [0.06, 0.92, 0.04], 20)); // stem
    return points;
  },
  // universal accessibility figure inside a ring: accessibility
  access: () => {
    const points: Point[] = [];
    for (let ring = 0; ring < 2; ring++) points.push(...circle([0, 0, ring * 0.05 - 0.025], 0.82 - ring * 0.04, 220));
    for (let ring = 0; ring < 3; ring++) points.push(...circle([0, -0.46, 0], 0.11 - ring * 0.03, 50)); // head
    points.push(...line([-0.5, -0.24, 0], [0.5, -0.24, 0], 70)); // outstretched arms
    points.push(...line([0, -0.24, 0], [0, 0.14, 0], 40)); // body
    points.push(...line([0, 0.14, 0], [-0.3, 0.58, 0], 50), ...line([0, 0.14, 0], [0.3, 0.58, 0], 50)); // legs
    return points;
  },
};

/**
 * Slowly swaying wireframe symbol drawn as fine dots, for value tiles. It animates only while on screen, spins
 * faster while its parent `group/tile` is hovered, and holds still for reduced motion.
 */
export default function WireShape({ kind, className }: { kind: WireShapeKind; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const points = SHAPES[kind]();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hoverTarget = canvas.closest<HTMLElement>('.group\\/tile') ?? canvas;
    let size = 0;
    let frame = 0;
    let visible = false;
    let angle = 0.4;
    let speed = 1;
    let targetSpeed = 1;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.getBoundingClientRect().width;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      frame = 0;
      const dt = last ? Math.min(50, now - last) : 16;
      last = now;
      speed += (targetSpeed - speed) * 0.08;
      if (!reduceMotion) angle += dt * 0.0005 * speed;

      ctx.clearRect(0, 0, size, size);
      // sway back and forth (rather than spinning all the way round) so each symbol stays readable
      const yaw = Math.sin(angle) * 0.9;
      const tiltX = 0.18 + Math.sin(angle * 0.6) * 0.15;
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);
      const half = size / 2;
      const scale = size * 0.42;

      for (const [px, py, pz] of points) {
        // rotate around Y, then X, then project with light perspective
        const x1 = px * cosY + pz * sinY;
        const z1 = -px * sinY + pz * cosY;
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;
        const perspective = 1 / (1.8 - z2 * 0.5);
        const depth = (z2 + 1) / 2;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.25 + depth * 0.7})`;
        const dot = 0.6 + depth * 0.9;
        ctx.fillRect(
          half + x1 * scale * perspective * 1.6 - dot / 2,
          half + y2 * scale * perspective * 1.6 - dot / 2,
          dot,
          dot
        );
      }

      if (visible && !reduceMotion) frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!frame) {
        last = 0;
        frame = requestAnimationFrame(draw);
      }
    };

    const onEnter = () => (targetSpeed = 4);
    const onLeave = () => (targetSpeed = 1);

    resize();
    draw(performance.now());
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduceMotion) start();
    });
    visibilityObserver.observe(canvas);
    hoverTarget.addEventListener('pointerenter', onEnter);
    hoverTarget.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      hoverTarget.removeEventListener('pointerenter', onEnter);
      hoverTarget.removeEventListener('pointerleave', onLeave);
    };
  }, [kind]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
