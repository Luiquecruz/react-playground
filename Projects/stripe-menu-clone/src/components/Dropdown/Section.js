import React, { useContext } from "react";
import { motion } from "framer-motion";

import { Context } from "./Provider";

export function DropdownSection({ option }) {
  const { updateOptionProps, cachedId } = useContext(Context);

  const { id, optionDimensions, optionCenterX, contentDimensions } = option;

  const isActive = cachedId === id;

  const contentWidth = contentDimensions?.width || 0;

  const x = optionCenterX - contentWidth / 2;

  return (
    <motion.div
      className="dropdown-section"
      initial={{ x }}
      animate={{
        x,
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "unset" : "none",
      }}
      transition={{
        ease: "easeOut",
        opacity: { duration: 0.2 },
      }}
    >
      <option.WrappedContent />
    </motion.div>
  );
}
