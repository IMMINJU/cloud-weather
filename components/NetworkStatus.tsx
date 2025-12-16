'use client';

import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { FiWifiOff, FiWifi } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export function NetworkStatus() {
  const { isOnline, wasOffline } = useNetworkStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg"
        >
          <FiWifiOff className="w-5 h-5" />
          <span className="font-medium">No internet connection</span>
        </motion.div>
      )}

      {isOnline && wasOffline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
        >
          <FiWifi className="w-5 h-5" />
          <span className="font-medium">Back online</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
