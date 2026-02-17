'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LikeButton({ slug }: { slug: string }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const key = `liked-${slug}`;
    const countKey = `likes-${slug}`;
    setLiked(localStorage.getItem(key) === 'true');
    setCount(parseInt(localStorage.getItem(countKey) || '0'));
  }, [slug]);

  const handleLike = () => {
    const key = `liked-${slug}`;
    const countKey = `likes-${slug}`;
    if (liked) {
      setLiked(false);
      setCount((c) => { const n = Math.max(0, c - 1); localStorage.setItem(countKey, String(n)); return n; });
      localStorage.removeItem(key);
    } else {
      setLiked(true);
      setCount((c) => { const n = c + 1; localStorage.setItem(countKey, String(n)); return n; });
      localStorage.setItem(key, 'true');
    }
  };

  return (
    <motion.button
      onClick={handleLike}
      whileTap={{ scale: 1.3 }}
      className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all ${
        liked
          ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
          : 'text-[var(--text-secondary)] hover:text-red-500'
      }`}
      style={!liked ? { background: 'var(--bg-tertiary)' } : undefined}
    >
      <motion.span
        animate={liked ? { scale: [1, 1.5, 1] } : {}}
        transition={{ duration: 0.3 }}
        className="text-lg"
      >
        {liked ? '❤️' : '🤍'}
      </motion.span>
      {count > 0 && <span>{count}</span>}
      <span>{liked ? 'Liked!' : 'Like'}</span>
    </motion.button>
  );
}
