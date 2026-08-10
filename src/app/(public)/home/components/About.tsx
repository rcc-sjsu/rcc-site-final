'use client';
import React, { useEffect, useState, useRef } from 'react';

import styles from '../about.module.css';
import Link from 'next/link';

/* animations for text when viewport loads them in */
export default function About() {
  const [titleVisible, setTitleVisible] = useState(false);
  const [descVisible, setDescVisible] = useState(false);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === titleRef.current && entry.isIntersecting) {
            setTitleVisible(true);
          }
          if (entry.target === descRef.current && entry.isIntersecting) {
            setDescVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (descRef.current) observer.observe(descRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.container}>
      <div ref={titleRef} className={`${styles.title} ${titleVisible ? styles.visible : ''}`}>
        Responsible Computing Club
      </div>

      <p ref={descRef} className={`${styles.description} ${descVisible ? styles.visible : ''}`}>
        A student organization at SJSU that empowers people to shape the future of technology. We{' '}
        <strong>explore the ethics of tech</strong> through hands-on, cross-disciplinary events and projects.
      </p>

      <div className={styles.buttons}>
        <Link href="/about#get-involved" className={styles.ctaButton}>
          Get Involved
        </Link>

        <Link href="/about" className={styles.secondaryButton}>
          Get to Know Us
        </Link>
      </div>
    </section>
  );
}
