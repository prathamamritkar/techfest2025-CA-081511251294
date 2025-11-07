import { useEffect, useState } from 'react';

interface Plant {
  id: number;
  x: number;
  growth: number;
  type: 'flower' | 'tree' | 'mushroom';
}

export function GardenVisualizer() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    // Initialize plants
    const initialPlants: Plant[] = [
      { id: 1, x: 15, growth: 0, type: 'flower' },
      { id: 2, x: 35, growth: 0, type: 'tree' },
      { id: 3, x: 55, growth: 0, type: 'mushroom' },
      { id: 4, x: 75, growth: 0, type: 'flower' },
      { id: 5, x: 85, growth: 0, type: 'tree' },
    ];
    setPlants(initialPlants);

    // Animate growth
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setPlants((prev) =>
        prev.map((plant) => ({
          ...plant,
          growth: Math.min(100, plant.growth + Math.random() * 2),
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const renderPlant = (plant: Plant) => {
    const heightPercent = plant.growth;

    if (plant.type === 'flower') {
      return (
        <div
          key={plant.id}
          style={{
            position: 'absolute',
            left: `${plant.x}%`,
            bottom: 0,
            transform: 'translateX(-50%)',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Stem */}
          <div
            style={{
              width: '3px',
              height: `${heightPercent * 0.6}px`,
              background: 'linear-gradient(to top, #2d5016, #4a7c2f)',
              margin: '0 auto',
              borderRadius: '2px',
              transformOrigin: 'bottom',
              animation: 'sway 3s ease-in-out infinite',
              animationDelay: `${plant.id * 0.2}s`,
            }}
          />
          {/* Flower */}
          {heightPercent > 50 && (
            <div
              style={{
                width: '20px',
                height: '20px',
                background: `radial-gradient(circle, #ff00ff, #ff0088)`,
                borderRadius: '50%',
                margin: '-10px auto 0',
                opacity: (heightPercent - 50) / 50,
                boxShadow: '0 0 10px rgba(255, 0, 255, 0.5)',
              }}
            />
          )}
        </div>
      );
    }

    if (plant.type === 'tree') {
      return (
        <div
          key={plant.id}
          style={{
            position: 'absolute',
            left: `${plant.x}%`,
            bottom: 0,
            transform: 'translateX(-50%)',
          }}
        >
          {/* Trunk */}
          <div
            style={{
              width: '6px',
              height: `${heightPercent * 0.8}px`,
              background: 'linear-gradient(to top, #3d2817, #5a4029)',
              margin: '0 auto',
              borderRadius: '3px',
            }}
          />
          {/* Foliage */}
          {heightPercent > 40 && (
            <div
              style={{
                width: `${30 + (heightPercent - 40) * 0.5}px`,
                height: `${30 + (heightPercent - 40) * 0.5}px`,
                background: 'radial-gradient(circle, #00ff88, #00cc66)',
                borderRadius: '50%',
                margin: '-15px auto 0',
                opacity: (heightPercent - 40) / 60,
                boxShadow: '0 0 15px rgba(0, 255, 136, 0.5)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            />
          )}
        </div>
      );
    }

    // Mushroom
    return (
      <div
        key={plant.id}
        style={{
          position: 'absolute',
          left: `${plant.x}%`,
          bottom: 0,
          transform: 'translateX(-50%)',
        }}
      >
        {/* Stem */}
        <div
          style={{
            width: '4px',
            height: `${heightPercent * 0.3}px`,
            background: '#e8e8e8',
            margin: '0 auto',
            borderRadius: '2px',
          }}
        />
        {/* Cap */}
        {heightPercent > 30 && (
          <div
            style={{
              width: '18px',
              height: '12px',
              background: 'linear-gradient(to bottom, #ff3366, #cc2244)',
              borderRadius: '50% 50% 0 0',
              margin: '-6px auto 0',
              opacity: (heightPercent - 30) / 70,
              boxShadow: '0 0 8px rgba(255, 51, 102, 0.4)',
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        height: '150px',
        margin: '40px auto',
        background: 'linear-gradient(to top, rgba(0, 255, 136, 0.1), transparent)',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(0, 255, 136, 0.2)',
      }}
    >
      {/* Ground */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '8px',
          background: 'linear-gradient(to top, rgba(0, 255, 136, 0.3), transparent)',
        }}
      />
      {plants.map(renderPlant)}
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
      `}</style>
    </div>
  );
}
