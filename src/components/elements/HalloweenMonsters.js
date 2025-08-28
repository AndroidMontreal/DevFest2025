'use client';
import { useEffect, useState } from 'react';

const HalloweenMonsters = () => {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    const createMonster = (type, emoji, delay = 0) => ({
      id: Math.random(),
      type,
      emoji,
      createdAt: Date.now(),
      style: {
        top: Math.random() * 60 + 20 + '%', // Keep monsters in middle area
        left: type === 'bat' ? '-100px' : Math.random() * 80 + 10 + '%',
        animationDelay: delay + 's',
      }
    });

    const monstersList = [
      createMonster('ghost', '👻', 0),
      createMonster('bat', '🦇', 2),
      createMonster('spider', '🕷️', 1),
      createMonster('pumpkin', '🎃', 3),
      createMonster('ghost', '👻', 4),
      createMonster('bat', '🦇', 6),
      createMonster('spider', '🕸️', 2.5),
      createMonster('pumpkin', '🎃', 5),
      createMonster('ghost', '💀', 7),
    ];

    setMonsters(monstersList);

    // Add flying bats periodically
    const batInterval = setInterval(() => {
      setMonsters(prev => [
        ...prev.filter(monster => monster.type !== 'bat' || Date.now() - monster.createdAt < 10000),
        createMonster('bat', '🦇', 0)
      ]);
    }, 6000);

    return () => clearInterval(batInterval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[-1]">
      {/* Animated monsters */}
      {monsters.map((monster) => (
        <div
          key={monster.id}
          className={`halloween-monster ${monster.type}`}
          style={monster.style}
        >
          {monster.emoji}
        </div>
      ))}
      
      {/* Static decorative monsters in corners */}
      <div className="absolute top-4 left-4 text-3xl opacity-60 animate-float">
        🕸️
      </div>
      <div className="absolute top-4 right-4 text-3xl opacity-60 animate-float" style={{animationDelay: '1s'}}>
        🦇
      </div>
      <div className="absolute bottom-4 left-4 text-3xl opacity-60 animate-float" style={{animationDelay: '2s'}}>
        💀
      </div>
      <div className="absolute bottom-4 right-4 text-3xl opacity-60 animate-float" style={{animationDelay: '3s'}}>
        🎃
      </div>
      
      {/* Additional floating monsters */}
      <div className="absolute top-1/4 left-8 text-4xl opacity-40 animate-float" style={{animationDelay: '0.5s'}}>
        👻
      </div>
      <div className="absolute top-1/3 right-8 text-4xl opacity-40 animate-float" style={{animationDelay: '1.5s'}}>
        👻
      </div>
      <div className="absolute bottom-1/4 left-16 text-4xl opacity-40 animate-float" style={{animationDelay: '2.5s'}}>
        🧙‍♀️
      </div>
      <div className="absolute bottom-1/3 right-16 text-4xl opacity-40 animate-float" style={{animationDelay: '3.5s'}}>
        🧛‍♂️
      </div>
      
      {/* More scattered monsters */}
      <div className="absolute top-1/2 left-1/4 text-2xl opacity-30 animate-float" style={{animationDelay: '4s'}}>
        🕷️
      </div>
      <div className="absolute top-3/4 right-1/4 text-2xl opacity-30 animate-float" style={{animationDelay: '5s'}}>
        🦇
      </div>
      <div className="absolute top-1/6 right-1/3 text-2xl opacity-30 animate-float" style={{animationDelay: '6s'}}>
        👻
      </div>
    </div>
  );
};

export default HalloweenMonsters;