import React, { useRef, useState, useEffect, useCallback } from "react";

type ResizeDirection =
  | "right"
  | "bottom"
  | "left"
  | "top"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface ResizableDivProps {
  baseWidth?: number;
  baseHeight?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  className?: string;
  children?: React.ReactNode;
}

const ResizableDiv: React.FC<ResizableDivProps> = ({
  baseWidth = 420,
  baseHeight = 240,
  minWidth = 380,
  minHeight = 240,
  maxWidth = 640,
  maxHeight = 270,
  className = "",
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [size, setSize] = useState({ width: baseWidth, height: baseHeight });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState<ResizeDirection | null>(null);
  const [scale, setScale] = useState(1);

  // const handleMouseUp = () => {
  //   setIsResizing(null);
  //   console.log("mouse click is up");
  //   document.removeEventListener("mousemove", handleMouseMove);
  //   document.removeEventListener("mouseup", handleMouseUp);
  // };

  // const handleMouseDown = (dir: ResizeDirection) => {
  //   console.log({ dir });
  //   setIsResizing(dir);
  //   document.addEventListener("mousemove", handleMouseMove);
  //   document.addEventListener("mouseup", handleMouseUp);
  // };

  // Track initial values at the start of a resize
  const startRef = useRef({
    x: 0,
    y: 0,
    width: baseWidth,
    height: baseHeight,
  });

  // // For scaling content. Not used
  // useEffect(() => {
  //   const widthScale = size.width / baseWidth;
  //   const heightScale = size.height / baseHeight;
  //   setScale(Math.min(widthScale, heightScale));
  // }, [size, baseWidth, baseHeight]);

  // Mouse move handler (memoized)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const { x: startX, y: startY, width, height } = startRef.current;
      const rect = containerRef.current.getBoundingClientRect();

      let newWidth = size.width;
      let newHeight = size.height;
      let newX = position.x;
      let newY = position.y;

      switch (isResizing) {
        case "right":
          newWidth = width + (e.clientX - startX);
          break;
        case "bottom":
          newHeight = height + (e.clientY - startY);
          break;
        case "left":
          newWidth = width - (e.clientX - startX);
          newX = e.clientX - rect.left;
          break;
        case "top":
          newHeight = height - (e.clientY - startY);
          newY = e.clientY - rect.top;
          break;
        case "top-left":
          newWidth = width - (e.clientX - startX);
          newHeight = height - (e.clientY - startY);
          newX = e.clientX - rect.left;
          newY = e.clientY - rect.top;
          break;
        case "top-right":
          newWidth = width + (e.clientX - startX);
          newHeight = height - (e.clientY - startY);
          newY = e.clientY - rect.top;
          break;
        case "bottom-left":
          newWidth = width - (e.clientX - startX);
          newHeight = height + (e.clientY - startY);
          newX = e.clientX - rect.left;
          break;
        case "bottom-right":
          newWidth = width + (e.clientX - startX);
          newHeight = height + (e.clientY - startY);
          break;
      }

      const getInBoundValue = (
        value: number,
        min: number,
        max: number
      ): number => {
        if (min && value < min) return min;
        if (max && value > max) return max;
        return value;
      };

      const validHeight = getInBoundValue(newHeight, minHeight, maxHeight);
      const validWidth = getInBoundValue(newWidth, minWidth, maxWidth);

      // setSize({
      //   width: Math.max(minWidth, newWidth),
      //   height: Math.max(minHeight, newHeight),
      // });

      setSize({
        width: validWidth,
        height: validHeight,
      });
      setPosition({ x: newX, y: newY });
    },
    [
      isResizing,
      size.width,
      size.height,
      position.x,
      position.y,
      minWidth,
      minHeight,
    ]
  );

  // Mouse up handler
  const handleMouseUp = useCallback(() => {
    setIsResizing(null);
  }, []);

  // Attach/detach global listeners when resizing
  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
      document.body.style.cursor = "crosshair";
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "default";
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Start resizing
  const handleMouseDown = (dir: ResizeDirection, e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(dir);

    if (containerRef.current) {
      startRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      };
    }
  };

  const handleStyle = (cursor: string, extra: string) =>
    `absolute ${extra} ${cursor} z-10 hover:bg-white/10 transition-colors rounded-full`;

  return (
    <div
      ref={containerRef}
      className={`relative border-2 border-white/10 rounded-2xl ${className}`}
      style={{ width: size.width, height: size.height }}
    >
      <div className="w-full h-full p-1">{children}</div>

      {/* Resize handles */}
      <div
        onMouseDown={(e) => handleMouseDown("top-left", e)}
        className={handleStyle("cursor-nwse-resize", "top-0 left-0 w-3 h-3")}
      />
      <div
        onMouseDown={(e) => handleMouseDown("top", e)}
        className={handleStyle(
          "cursor-ns-resize",
          "top-0 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] h-1"
        )}
      />
      <div
        onMouseDown={(e) => handleMouseDown("top-right", e)}
        className={handleStyle("cursor-nesw-resize", "top-0 right-0 w-3 h-3")}
      />
      <div
        onMouseDown={(e) => handleMouseDown("right", e)}
        className={handleStyle(
          "cursor-ew-resize",
          "top-1/2 right-0 -translate-y-1/2 w-1 h-[calc(100%-32px)]"
        )}
      />
      <div
        onMouseDown={(e) => handleMouseDown("bottom-right", e)}
        className={handleStyle(
          "cursor-nwse-resize",
          "bottom-0 right-0 w-3 h-3"
        )}
      />
      <div
        onMouseDown={(e) => handleMouseDown("bottom", e)}
        className={handleStyle(
          "cursor-ns-resize",
          "bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] h-1"
        )}
      />
      <div
        onMouseDown={(e) => handleMouseDown("bottom-left", e)}
        className={handleStyle("cursor-nesw-resize", "bottom-0 left-0 w-3 h-3")}
      />
      <div
        onMouseDown={(e) => handleMouseDown("left", e)}
        className={handleStyle(
          "cursor-ew-resize",
          "top-1/2 left-0 -translate-y-1/2 w-1 h-[calc(100%-32px)]"
        )}
      />
    </div>
  );
};

export default ResizableDiv;
