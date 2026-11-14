import React, { useMemo } from "react";
import styles from "./styles.module.scss";

interface SkeletonProps {
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  borderRadius?: string | number;
  className?: string;
  animated?: boolean;
  aspectRatio?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  children,
  width = "100%",
  height = "100%",
  minWidth,
  borderRadius = "8px",
  className = "",
  animated = true,
  aspectRatio,
}) => {
  const style = useMemo(() => ({
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    minWidth: minWidth ? (typeof minWidth === "number" ? `${minWidth}px` : minWidth) : undefined,
    borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
    aspectRatio: aspectRatio ? String(aspectRatio) : undefined,
  }), [width, height, minWidth, borderRadius, aspectRatio]);

  return (
    <div
      className={`${styles.skeleton} ${animated ? styles.animated : ""} ${className}`}
      style={style}
      role="status"
      aria-label="Loading content"
      aria-busy="true"
    >
      {children}
    </div>
  );
};

export default Skeleton;