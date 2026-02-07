import { motion } from "framer-motion";
import { Leaf, Sprout, Flower2 } from "lucide-react";

const particles = [
  { Icon: Leaf, x: "10%", y: "20%", delay: 0, duration: 6 },
  { Icon: Sprout, x: "85%", y: "15%", delay: 1, duration: 7 },
  { Icon: Leaf, x: "70%", y: "70%", delay: 2, duration: 5 },
  { Icon: Flower2, x: "20%", y: "75%", delay: 0.5, duration: 8 },
  { Icon: Sprout, x: "50%", y: "10%", delay: 1.5, duration: 6 },
  { Icon: Leaf, x: "90%", y: "50%", delay: 3, duration: 7 },
];

export const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/10"
          style={{ left: particle.x, top: particle.y }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, 0, -10, 0],
            rotate: [0, 15, 0, -15, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        >
          <particle.Icon className="h-6 w-6 md:h-8 md:w-8" />
        </motion.div>
      ))}
    </div>
  );
};
