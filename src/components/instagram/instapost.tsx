'use client';

import { useState, useCallback, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';
import Image from 'next/image';
import styles from './instapost.module.css';

interface InstagramPost {
  id: string;
  media_url: string;
  media_type: string;
  thumbnail_url?: string;
  timestamp: string;
}

export default function InstaCarousel() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch('/api/instagram');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts((data.posts || []).slice(0, 8));
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load Instagram posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const getPostsPerSet = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 4; // Desktop
    }
    return 4;
  };

  const [postsPerSet, setPostsPerSet] = useState(getPostsPerSet());

  useEffect(() => {
    const handleResize = () => {
      setPostsPerSet(getPostsPerSet());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSets = Math.ceil(posts.length / postsPerSet);

  const getCurrentPosts = () => {
    const startIndex = currentSetIndex * postsPerSet;
    return posts.slice(startIndex, startIndex + postsPerSet);
  };

  const nextSlide = useCallback(() => {
    setCurrentSetIndex((prevIndex) => (prevIndex + 1) % totalSets);
  }, [totalSets]);

  const prevSlide = useCallback(() => {
    setCurrentSetIndex((prevIndex) => (prevIndex - 1 + totalSets) % totalSets);
  }, [totalSets]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading Instagram posts...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  const currentPosts = getCurrentPosts();

  const MediaContent = ({ post }: { post: InstagramPost }) => {
    if (post.media_type === 'VIDEO') {
      return (
        <div className={styles.mediaContainer}>
          <Image
            src={post.thumbnail_url || post.media_url}
            alt="Instagram video thumbnail"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={currentSetIndex === 0}
            className={styles.image}
          />
          <div className={styles.videoOverlay}>
            <div className={styles.videoOverlayBg}></div>
            <FaPlay className={styles.playIcon} />
          </div>
        </div>
      );
    }

    return (
      <div className={styles.mediaContainer}>
        <Image
          src={post.media_url}
          alt="Instagram post"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={currentSetIndex === 0}
          className={styles.image}
        />
      </div>
    );
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={`hidden md:block ${styles.leftArrow}`}>
        <button onClick={prevSlide} className={styles.navigationButton} aria-label="Previous posts">
          <FaChevronLeft />
        </button>
      </div>

      <div className={styles.postGrid}>
        {currentPosts.map((post) => (
          <div key={post.id} className={styles.postItem}>
            <MediaContent post={post} />
            <div className={styles.dateContainer}>
              <span className={styles.date}>{formatDate(post.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`hidden md:block ${styles.rightArrow}`}>
        <button onClick={nextSlide} className={styles.navigationButton} aria-label="Next posts">
          <FaChevronRight />
        </button>
      </div>

      <div className={styles.dotsContainer}>
        {Array.from({ length: totalSets }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSetIndex(index)}
            className={`${styles.dot} ${currentSetIndex === index ? styles.dotActive : styles.dotInactive}`}
            aria-label={`Go to set ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
