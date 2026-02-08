import { motion } from 'framer-motion';

const shapes = [
  { size: 80, x: '10%', y: '20%', delay: 0, duration: 6, color: 'rgba(59, 130, 246, 0.15)', borderRadius: '50%' },
  { size: 60, x: '80%', y: '15%', delay: 1, duration: 8, color: 'rgba(168, 85, 247, 0.12)', borderRadius: '30%' },
  { size: 100, x: '70%', y: '60%', delay: 2, duration: 7, color: 'rgba(236, 72, 153, 0.1)', borderRadius: '50%' },
  { size: 50, x: '20%', y: '70%', delay: 0.5, duration: 9, color: 'rgba(59, 130, 246, 0.1)', borderRadius: '40%' },
  { size: 70, x: '50%', y: '80%', delay: 1.5, duration: 6.5, color: 'rgba(168, 85, 247, 0.08)', borderRadius: '50%' },
  { size: 40, x: '90%', y: '40%', delay: 3, duration: 8, color: 'rgba(52, 199, 89, 0.1)', borderRadius: '35%' },
];

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: shape.color,
            borderRadius: shape.borderRadius,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
