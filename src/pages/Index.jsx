import React, { useEffect, useRef, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const ParticleVisualization = () => {
  const canvasRef = useRef(null);
  const [particleCount, setParticleCount] = useState(100);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speed: (Math.random() * 2 + 0.5) * speedMultiplier,
      angle: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        if (isRunning) {
          particle.x += Math.cos(particle.angle) * particle.speed;
          particle.y += Math.sin(particle.angle) * particle.speed;

          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, speedMultiplier, isRunning]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Particle Visualization</h1>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="bg-black rounded-lg shadow-lg mb-4"
      />
      <div className="w-full max-w-md space-y-4">
        <div>
          <label htmlFor="particle-count" className="block text-sm font-medium text-white mb-2">
            Particle Count: {particleCount}
          </label>
          <Slider
            id="particle-count"
            min={10}
            max={500}
            step={10}
            value={[particleCount]}
            onValueChange={(value) => setParticleCount(value[0])}
          />
        </div>
        <div>
          <label htmlFor="speed-multiplier" className="block text-sm font-medium text-white mb-2">
            Speed Multiplier: {speedMultiplier.toFixed(1)}
          </label>
          <Slider
            id="speed-multiplier"
            min={0.1}
            max={5}
            step={0.1}
            value={[speedMultiplier]}
            onValueChange={(value) => setSpeedMultiplier(value[0])}
          />
        </div>
        <Button
          onClick={() => setIsRunning(!isRunning)}
          className="w-full"
        >
          {isRunning ? 'Pause' : 'Resume'}
        </Button>
      </div>
    </div>
  );
};

export default ParticleVisualization;