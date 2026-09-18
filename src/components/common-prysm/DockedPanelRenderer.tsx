// "use client";

// import React, { useEffect } from "react";
// import { useDock } from "@/contexts/DockContext";
// import { Card, CardContent } from "@/components/ui/card";
// import { GripVertical, Minus, X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { motion, AnimatePresence } from "framer-motion";

// interface DockedPanelRendererProps {
//   side: "left" | "right";
// }

// export const DockedPanelRenderer: React.FC<DockedPanelRendererProps> = ({
//   side,
// }) => {
//   const {
//     leftDock,
//     rightDock,
//     position,
//     size,
//     toggleMinimize,
//     closePanel,
//     updatePanel,
//     undockPanel,
//     setLeftDock,
//     setRightDock,
//     setPosition,
//     setSize,
//   } = useDock();
//   const panel = side === "left" ? leftDock : rightDock;

//   if (!panel || !panel.isOpen) {
//     return null;
//   }

//   // // ensure updatePanel is run once when the panel is mounted
//   // useEffect(() => {
//   //   if (!panel) return;
//   //   updatePanel(panel.id, { width: panel.width });
//   // }, [panel?.id]);

//   const handleMinimize = () => {
//     console.log("In minimize", { size });
//     toggleMinimize(panel.id);
//     undockPanel(panel.id);
//     // closePanel(panel.id)

//     const windowWidth = window.innerWidth;
//     // const windowHeight = window.innerHeight;
//     const xPos = side === "left" ? 50 : windowWidth - size.width - 400;
//     setPosition({ x: xPos, y: 100 });

//     const updatedSize = {
//       width: size.width < 400 ? 500 : size.width,
//       height: size.height > 700 ? 400 : size.height,
//     };
//     setSize(updatedSize);
//     // setSize(size);
//     // setSize({ width: 600, height: 400 })
//   };

//   const handleClose = () => {
//     closePanel(panel.id);
//   };

//   const handleResize = (e: React.MouseEvent, startX: number) => {
//     e.preventDefault();
//     const startWidth = panel.width;
//     const startMouseX = e.clientX;

//     const handleMouseMove = (moveEvent: MouseEvent) => {
//       console.log("handle resize", { startWidth, side, panel });
//       const deltaX = moveEvent.clientX - startMouseX;
//       const newWidth =
//         side === "left"
//           ? Math.max(200, startWidth + deltaX)
//           : Math.max(200, startWidth - deltaX);
//       updatePanel(panel.id, { width: newWidth });
//     };

//     const handleMouseUp = () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   console.log("Docked panel render", { leftDock, rightDock });
//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ width: 0, opacity: 0 }}
//         animate={{ width: panel.width, opacity: 1 }}
//         exit={{ width: 0, opacity: 0 }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//         className={cn(
//           "h-full flex-shrink-0 relative border-r border-border bg-[#060606]",
//           side === "right" && "border-r-0 border-l"
//         )}
//         style={{ width: panel.width }}
//       >
//         <Card className="h-full w-full shadow-2xl border-0 bg-[#060606] rounded-none">
//           <CardContent className="h-full flex flex-col p-0">
//             {/* Header */}
//             <div className="flex items-center justify-between p-2 border-b border-border bg-[#0a0a0a]">
//               <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing flex-1">
//                 <GripVertical className="h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm text-white/70">{panel.title}</span>
//               </div>
//               <div className="flex items-center gap-1 flex-shrink-0">
//                 <button
//                   onClick={handleMinimize}
//                   className="p-1.5 hover:bg-white/10 rounded transition-colors"
//                   aria-label="Minimize"
//                 >
//                   <Minus className="h-4 w-4 text-muted-foreground" />
//                 </button>
//                 <button
//                   onClick={handleClose}
//                   className="p-1.5 hover:bg-white/10 rounded transition-colors"
//                   aria-label="Close"
//                 >
//                   <X className="h-4 w-4 text-muted-foreground" />
//                 </button>
//               </div>
//             </div>

//             {/* Content */}
//             <AnimatePresence>
//               {!panel.isMinimized && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex-1 overflow-auto"
//                   style={{ minHeight: 0 }}
//                 >
//                   <div className="p-2">{panel.content}</div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </CardContent>
//         </Card>

//         {/* Resize handle */}
//         <div
//           onMouseDown={(e) => handleResize(e, panel.width)}
//           className={cn(
//             "absolute top-0 bottom-0 w-1 cursor-ew-resize hover:bg-white/20 transition-colors z-10",
//             side === "left" ? "right-0" : "left-0"
//           )}
//           style={{ cursor: "ew-resize" }}
//         />
//       </motion.div>
//     </AnimatePresence>
//   );
// };
