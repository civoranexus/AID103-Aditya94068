import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utilis";

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: number;
}

export const InteractiveCard = ({
  children,
  className = "",
  delay = 0,
  hoverScale = 1.02,
}: InteractiveCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        scale: hoverScale,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      className={cn("cursor-default", className)}
    >
      {children}
    </motion.div>
  );
};
