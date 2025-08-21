'use client';

import { useState, useCallback, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';
import Image from 'next/image';

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
        <div className="relative" style={{ aspectRatio: '3/4' }}>
          <Image
            src={post.thumbnail_url || post.media_url}
            alt="Instagram video thumbnail"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={currentSetIndex === 0}
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
            <FaPlay className="text-white text-3xl z-10" />
          </div>
        </div>
      );
    }

    return (
      <div className="relative" style={{ aspectRatio: '3/4' }}>
        <Image
          src={post.media_url}
          alt="Instagram post"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={currentSetIndex === 0}
          className="object-cover rounded-lg"
        />
      </div>
    );
  };

  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-8">
      {/*navigation arrows; hidden on mobile for now*/}
      <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 lg:-ml-16 z-10">
        <button
          onClick={prevSlide}
          className="bg-purple-100 hover:bg-purple-200 rounded-full p-3 transition-colors"
          aria-label="Previous posts"
        >
          <FaChevronLeft className="text-purple-800" />
        </button>
      </div>

      {/*grids for post */}
      <div
        className={`grid gap-4 py-12 ${
          postsPerSet === 1
            ? 'grid-cols-1'
            : postsPerSet === 2
              ? 'grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}
      >
        {currentPosts.map((post) => (
          <div key={post.id} className="overflow-hidden flex flex-col">
            <MediaContent post={post} />
            <div className="py-2 flex-grow flex items-center justify-center">
              <span className="text-sm sm:text-base font-medium">{formatDate(post.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 lg:-mr-16 z-10">
        <button
          onClick={nextSlide}
          className="bg-purple-100 hover:bg-purple-200 rounded-full p-3 transition-colors"
          aria-label="Next posts"
        >
          <FaChevronRight className="text-purple-800" />
        </button>
      </div>

      {/* post dots */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalSets }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSetIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              currentSetIndex === index ? 'bg-purple-800' : 'bg-purple-200'
            }`}
            aria-label={`Go to set ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
