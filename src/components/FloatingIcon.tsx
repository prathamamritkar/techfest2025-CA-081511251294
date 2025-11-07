interface FloatingIconProps {
  emoji: string;
  delay: number;
  duration: number;
  startX: number;
}

export function FloatingIcon({ emoji, delay, duration, startX }: FloatingIconProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${startX}%`,
        bottom: '-50px',
        fontSize: '24px',
        opacity: 0.6,
        animation: `floatUp ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 0 10px rgba(0, 255, 136, 0.5))',
      }}
    >
      {emoji}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
