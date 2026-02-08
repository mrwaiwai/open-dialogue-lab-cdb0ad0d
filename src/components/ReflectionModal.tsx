import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionsDone: number;
}

export default function ReflectionModal({ isOpen, onClose, questionsDone }: ReflectionModalProps) {
  const [text, setText] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(30px)', background: 'rgba(0,0,0,0.4)' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card w-full max-w-md p-8 text-center"
          >
            <div className="text-5xl mb-4">⏸️</div>
            <h2 className="text-2xl font-bold mb-2">反思時刻</h2>
            <p className="text-muted-foreground mb-2">
              你已完成 {questionsDone} 個情境
            </p>
            <p className="text-muted-foreground mb-6">讓我們停下來想一想...</p>

            <div className="glass-card p-4 mb-6 text-left" style={{ borderRadius: '1rem' }}>
              <p className="text-sm font-medium mb-2">💭 回想剛才嘅情境，你平時會點回應？</p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="寫低你嘅想法（可選）..."
                className="w-full bg-transparent border-none outline-none resize-none text-sm placeholder:text-muted-foreground/60"
                rows={4}
              />
            </div>

            <button
              onClick={onClose}
              className="glass-button w-full py-3 px-6 font-semibold text-foreground hover:shadow-glass-hover"
            >
              繼續遊戲
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
