'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useNavigation } from '@/lib/navigation';

export default function NavigationProgress() {
  const { isPending } = useNavigation();

  return (
    <AnimatePresence>
      {isPending && (
        <motion.div
          key="nav-progress"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 0.85, transition: { duration: 0.8, ease: 'easeOut' } }}
          exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }}
          className="fixed top-0 left-0 right-0 z-[200] h-[3px] origin-left bg-[var(--accent-blue)]"
        />
      )}
    </AnimatePresence>
  );
}
