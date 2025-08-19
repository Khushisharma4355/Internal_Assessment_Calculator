import { motion } from "framer-motion";

export const RingLoader = ({ size = 40, color = "#0d6efd", speed = 1 }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "50vh" }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        style={{
          width: size,
          height: size,
          border: `${size / 8}px solid ${color}33`, // faded background ring
          borderTop: `${size / 8}px solid ${color}`, // highlighted top ring
          borderRadius: "50%",
        }}
      />
    </div>
  );
};
