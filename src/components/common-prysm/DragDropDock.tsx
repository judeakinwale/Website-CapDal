// "use client";

// import React, { useState, useCallback, useEffect, useRef, useId } from "react";
// import { Rnd } from "react-rnd";
// import { motion, AnimatePresence } from "framer-motion";
// import { GripVertical, Minus, X } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { useDock } from "@/contexts/DockContext";

// interface DragDropDockProps {
//   trigger: React.ReactNode;
//   children: React.ReactNode;
//   title?: React.ReactNode;
//   defaultDocked?: "left" | "right" | null;
//   defaultSize?: { width: number; height: number };
//   minWidth?: number;
//   minHeight?: number;
//   dockedWidth?: number;
//   dockThreshold?: number;
// }

// const DragDropDock: React.FC<DragDropDockProps> = ({
//   trigger,
//   children,
//   title,
//   defaultDocked = null,
//   defaultSize = { width: 400, height: 600 },
//   minWidth = 300,
//   minHeight = 200,
//   dockedWidth = 400,
//   dockThreshold = 20,
// }) => {
//   const panelId = useId();
//   const {
//     dockPanel,
//     undockPanel,
//     updatePanel,
//     closePanel,
//     toggleMinimize,
//     leftDock,
//     rightDock,
//     isDocked,
//     toggleDocked: setIsDocked,
//     setLeftDock,
//     setRightDock,
//     size,
//     setSize,
//     position,
//     setPosition,
//   } = useDock();

//   const [isOpen, setIsOpen] = useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);
//   // const [size, setSize] = useState(defaultSize);
//   // const [position, setPosition] = useState({ x: 100, y: 100 });
//   const [isResizing, setIsResizing] = useState(false);
//   const [dockedWidthState, setDockedWidthState] = useState(dockedWidth);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const rndRef = useRef<Rnd>(null);

//   // Sync docked state with context
//   const currentDockedPanel =
//     isDocked === "left" ? leftDock : isDocked === "right" ? rightDock : null;
//   const isDockedInContext = currentDockedPanel?.id === panelId;

//   // Update context when docked state changes
//   useEffect(() => {
//     if (isDocked && isOpen) {
//       dockPanel(isDocked, {
//         id: panelId,
//         content: children,
//         title,
//         width: dockedWidthState,
//         isMinimized,
//         isOpen,
//       });
//     } else if (!isDocked && isDockedInContext) {
//       undockPanel(panelId);
//     }
//   }, [
//     isDocked,
//     isOpen,
//     dockedWidthState,
//     isMinimized,
//     panelId,
//     dockPanel,
//     undockPanel,
//     children,
//     title,
//     isDockedInContext,
//   ]);

//   // Update content and title when they change while docked
//   useEffect(() => {
//     if (isDockedInContext && currentDockedPanel) {
//       updatePanel(panelId, { content: children, title });
//     }
//   }, [
//     children,
//     title,
//     isDockedInContext,
//     currentDockedPanel,
//     updatePanel,
//     panelId,
//   ]);

//   // Sync minimized and open state with context
//   useEffect(() => {
//     if (isDockedInContext && currentDockedPanel) {
//       setIsMinimized(currentDockedPanel.isMinimized);
//       setIsOpen(currentDockedPanel.isOpen);
//     } else if (!isDocked && !isDockedInContext) {
//       // If not docked, sync from context if panel was closed there
//       const leftPanel = leftDock?.id === panelId ? leftDock : null;
//       const rightPanel = rightDock?.id === panelId ? rightDock : null;
//       const panelInContext = leftPanel || rightPanel;
//       if (panelInContext && !panelInContext.isOpen) {
//         setIsOpen(false);
//       }
//     }
//   }, [
//     isDockedInContext,
//     currentDockedPanel,
//     isDocked,
//     leftDock,
//     rightDock,
//     panelId,
//   ]);

//   // const prevDockedWidthRef = useRef<number | null>(null);
//   // useEffect(() => {
//   //   const prev = prevDockedWidthRef.current;
//   //   const curr = dockedWidthState;
//   //   prevDockedWidthRef.current = curr;
//   // }, [dockedWidthState]);

//   // Handle window resize to maintain dock state
//   useEffect(() => {
//     const handleWindowResize = () => {
//       // if (prevDockedWidthRef.current === dockedWidthState) return;
//       if (isDocked && isDockedInContext) {
//         updatePanel(panelId, { width: dockedWidthState });
//       }
//     };

//     window.addEventListener("resize", handleWindowResize);
//     return () => window.removeEventListener("resize", handleWindowResize);
//   }, [isDocked, dockedWidthState, isDockedInContext, updatePanel, panelId]);

//   const handleDragStop = useCallback(
//     (_: any, d: any) => {
//       if (isResizing || isAnimating) return;

//       const windowWidth = window.innerWidth;
//       const windowHeight = window.innerHeight;
//       const currentWidth = isDocked ? dockedWidthState : size.width;
//       // 200px to account for the inaccuracies after moving from docked to floating
//       const rightEdge = windowWidth - (d.x + currentWidth) - 200;

//       console.log({
//         rightEdge,
//         dock: isDocked,
//         dockThreshold,
//         d,
//         windowWidth,
//         popupWidth: size.width,
//         currentWidth,
//       });

//       // Detect docking
//       if (d.x <= dockThreshold) {
//         setIsAnimating(true);
//         setIsDocked("left");
//         setPosition({ x: 0, y: 0 });
//         setSize({ width: dockedWidthState, height: windowHeight });
//         // Update context will happen in useEffect
//         setTimeout(() => setIsAnimating(false), 300);
//       } else if (rightEdge <= dockThreshold) {
//         setIsAnimating(true);
//         setIsDocked("right");
//         setPosition({ x: windowWidth - dockedWidthState, y: 0 });
//         setSize({ width: dockedWidthState, height: windowHeight });
//         // Update context will happen in useEffect
//         setTimeout(() => setIsAnimating(false), 300);
//       } else {
//         // Undock if currently docked
//         if (isDocked) {
//           setIsAnimating(true);
//           setIsDocked(null);
//           setSize(defaultSize);
//           setPosition({ x: d.x, y: d.y });
//           // Update context will happen in useEffect
//           setTimeout(() => setIsAnimating(false), 300);
//         } else {
//           setIsDocked(null);
//           setPosition({ x: d.x, y: d.y });
//         }
//       }
//     },
//     [
//       isResizing,
//       isAnimating,
//       isDocked,
//       size.width,
//       dockThreshold,
//       dockedWidthState,
//       defaultSize,
//     ]
//   );

//   const handleResizeStart = useCallback(() => {
//     setIsResizing(true);
//   }, []);

//   const handleResizeStop = useCallback(
//     (_: any, __: any, ref: any, ___: any, pos: any) => {
//       const newWidth = parseInt(ref.style.width);
//       const newHeight = parseInt(ref.style.height);

//       if (isDocked && isDockedInContext) {
//         // When docked, only resize width
//         setDockedWidthState(newWidth);
//         setSize({ width: newWidth, height: window.innerHeight });
//         updatePanel(panelId, { width: newWidth });
//         if (isDocked === "right") {
//           setPosition({ x: window.innerWidth - newWidth, y: 0 });
//         } else {
//           setPosition({ x: 0, y: 0 });
//         }
//       } else {
//         setSize({ width: newWidth, height: newHeight });
//         setPosition(pos);
//       }
//       setIsResizing(false);
//     },
//     [isDocked]
//   );

//   const handleToggle = useCallback(() => {
//     if (isDockedInContext) {
//       // If docked, toggle open state in context
//       const newOpenState = !currentDockedPanel?.isOpen;
//       updatePanel(panelId, { isOpen: newOpenState });
//       if (newOpenState) {
//         updatePanel(panelId, { isMinimized: false });
//       }
//     } else {
//       setIsOpen((prev) => !prev);
//       if (!isOpen) {
//         setIsMinimized(false);
//       }
//     }
//   }, [isOpen, isDockedInContext, currentDockedPanel, updatePanel, panelId]);

//   const handleMinimize = useCallback(() => {
//     if (isDockedInContext) {
//       toggleMinimize(panelId);
//     } else {
//       setIsMinimized((prev) => !prev);
//     }
//   }, [isDockedInContext, toggleMinimize, panelId]);

//   const handleClose = useCallback(() => {
//     if (isDockedInContext) {
//       closePanel(panelId);
//     } else {
//       setIsOpen(false);
//     }
//     // State persists (isDocked remains)
//   }, [isDockedInContext, closePanel, panelId]);

//   // Get resize handles based on dock state
//   const getResizeHandles = () => {
//     if (isDocked === "left") {
//       return {
//         top: false,
//         right: true,
//         bottom: false,
//         left: false,
//         topRight: false,
//         bottomRight: false,
//         bottomLeft: false,
//         topLeft: false,
//       };
//     } else if (isDocked === "right") {
//       return {
//         top: false,
//         right: false,
//         bottom: false,
//         left: true,
//         topRight: false,
//         bottomRight: false,
//         bottomLeft: false,
//         topLeft: false,
//       };
//     } else {
//       // Floating mode - all handles enabled
//       return {
//         top: true,
//         right: true,
//         bottom: true,
//         left: true,
//         topRight: true,
//         bottomRight: true,
//         bottomLeft: true,
//         topLeft: true,
//       };
//     }
//   };

//   const getDockedPosition = () => {
//     if (isDocked === "left") {
//       return { x: 0, y: 0 };
//     } else if (isDocked === "right") {
//       return { x: window.innerWidth - dockedWidthState, y: 0 };
//     }
//     return position;
//   };

//   const currentPosition =
//     isDocked && !isDockedInContext ? getDockedPosition() : position;
//   const currentSize =
//     isDocked && !isDockedInContext
//       ? { width: dockedWidthState, height: window.innerHeight }
//       : size;

//   // Don't render docked panel here - it will be rendered in layout
//   const shouldRenderFloating = isOpen && (!isDocked || !isDockedInContext);

//   return (
//     <>
//       {/* Trigger Button */}
//       <div onClick={handleToggle} className="cursor-pointer">
//         {trigger}
//       </div>

//       {/* Panel - only render if floating or not docked in context */}
//       <AnimatePresence>
//         {shouldRenderFloating && (
//           <motion.div
//             key={isDocked ? `docked-${isDocked}` : "floating"}
//             initial={
//               isDocked ? { width: 0, opacity: 0 } : { opacity: 0, scale: 0.9 }
//             }
//             animate={
//               isDocked
//                 ? { width: dockedWidthState, opacity: 1 }
//                 : { opacity: 1, scale: 1 }
//             }
//             exit={
//               isDocked ? { width: 0, opacity: 0 } : { opacity: 0, scale: 0.9 }
//             }
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="fixed inset-0 z-50 pointer-events-none"
//           >
//             <Rnd
//               ref={rndRef}
//               size={currentSize}
//               position={currentPosition}
//               onDragStop={handleDragStop}
//               onResizeStart={handleResizeStart}
//               onResizeStop={handleResizeStop}
//               enableResizing={getResizeHandles()}
//               disableDragging={isResizing || isAnimating}
//               dragHandleClassName="drag-handle"
//               minWidth={minWidth}
//               minHeight={isDocked ? window.innerHeight : minHeight}
//               maxHeight={isDocked ? window.innerHeight : undefined}
//               bounds="window"
//               className="pointer-events-auto"
//               style={{
//                 transition: isAnimating ? "all 0.3s ease-in-out" : "none",
//               }}
//             >
//               <Card
//                 className={cn(
//                   "h-full w-full shadow-2xl border border-border bg-[#060606]",
//                   isDocked && "rounded-none"
//                 )}
//               >
//                 <CardContent className="h-full flex flex-col p-0">
//                   {/* Header with drag handle and controls */}
//                   <div className="flex items-center justify-between p-2 border-b border-border bg-[#0a0a0a]">
//                     <div className="drag-handle flex items-center gap-2 cursor-grab active:cursor-grabbing flex-1">
//                       <GripVertical className="h-4 w-4 text-muted-foreground" />
//                       {/* {isDocked && (
//                         <span className="text-sm text-muted-foreground">
//                           Docked {isDocked}
//                         </span>
//                       )} */}
//                       <span className="text-sm text-white/70">{title}</span>
//                     </div>
//                     <div className="flex items-center gap-1 flex-shrink-0">
//                       {/* <button
//                         onClick={handleMinimize}
//                         className="p-1.5 hover:bg-white/10 rounded transition-colors"
//                         aria-label="Minimize"
//                       >
//                         <Minus className="h-4 w-4 text-muted-foreground" />
//                       </button> */}
//                       <button
//                         onClick={handleClose}
//                         className="p-1.5 hover:bg-white/10 rounded transition-colors"
//                         aria-label="Close"
//                       >
//                         <X className="h-4 w-4 text-muted-foreground" />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <AnimatePresence>
//                     {!isMinimized && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex-1 overflow-auto"
//                         style={{ minHeight: 0 }}
//                       >
//                         <div className={cn("p-4", isDocked && "p-2")}>
//                           {children}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </CardContent>
//               </Card>
//             </Rnd>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default DragDropDock;
