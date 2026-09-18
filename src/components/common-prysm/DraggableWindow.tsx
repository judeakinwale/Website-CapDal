// "use client";

// import { useState } from "react";
// import { Rnd } from "react-rnd";
// import { motion, AnimatePresence } from "framer-motion";
// import Button from "@/components/common/Button";
// import { Card, CardContent } from "@/components/ui/card";
// import * as DialogPrimitive from "@radix-ui/react-dialog";

// export default function DraggableWindow() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDocked, setIsDocked] = useState<"left" | "right" | null>(null);

//   const [size, setSize] = useState({ width: 400, height: 300 });
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   // const [position, setPosition] = useState({ x: 200, y: 100 });

//   // from ˜-506 on the left to ˜908 on the right
//   const handleDragStop = (_: any, d: any) => {
//     // Detect docking
//     console.log({ x: d.x });
//     console.log({ windowWidth: window.innerWidth });
//     console.log(d.x + size.width);
//     console.log({ right: window.innerWidth - (d.x + size.width) });
//     // if (d.x <= -1800) {
//     if (d.x <= 20) {
//       setIsDocked("left");
//     } else if (window.innerWidth - (d.x + size.width) <= 20) {
//       setIsDocked("right");
//     } else {
//       setIsDocked(null);
//       setPosition({ x: d.x, y: d.y });
//       // setPosition({ x: d.x, y: d.y });
//     }
//   };

//   const handleResizeStop = (_: any, __: any, ref: any, ___: any, pos: any) => {
//     setSize({
//       width: parseInt(ref.style.width),
//       height: parseInt(ref.style.height),
//     });
//     setPosition(pos);
//   };

//   return (
//     <>
//       <Button onClick={() => setIsOpen(!isOpen)}>
//         {isOpen ? "Close Window" : "Open Window"}
//       </Button>

//       {isOpen && (
//         <div
//           className="absolute top-0 left-0 w-screen min-h-screen flex items-center justify-center bg-orange-600 "
//           onClick={(e) => {
//             e.preventDefault();
//             // e.stopPropagation();
//           }}
//         >
//           <AnimatePresence>
//             {isOpen && (
//               <motion.div
//                 key="window"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {isDocked ? (
//                   <motion.div
//                     className={`fixed top-0 h-full bg-[#060606] shadow-xl border-l border-border ${
//                       isDocked === "left"
//                         ? "left-0 border-r"
//                         : "right-0 border-l"
//                     }`}
//                     animate={{ width: "25%" }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Card className="h-full rounded-none">
//                       <CardContent className="h-full flex flex-col justify-center items-center">
//                         <p className="text-lg font-medium mb-4">
//                           Docked to {isDocked}
//                         </p>
//                         <Button
//                           variant="small-dark"
//                           onClick={() => setIsDocked(null)}
//                         >
//                           Undock
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 ) : (
//                   <Rnd
//                     size={{ width: size.width, height: size.height }}
//                     position={{ x: position.x, y: position.y }}
//                     onDragStop={handleDragStop}
//                     onResizeStop={handleResizeStop}
//                     bounds="window"
//                     minWidth={300}
//                     minHeight={200}
//                     className="z-50"
//                   >
//                     <Card className="h-full w-full shadow-2xl border border-border bg-[#060606]">
//                       <CardContent className="h-full flex flex-col justify-center items-center">
//                         <p className="text-lg font-semibold mb-4">
//                           Draggable Window
//                         </p>
//                         <p className="text-sm text-muted-foreground mb-4">
//                           Drag near edges to dock.
//                         </p>
//                         <Button
//                           variant="small-dark"
//                           onClick={() => setIsOpen(false)}
//                         >
//                           Close
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   </Rnd>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       )}
//     </>
//   );
// }
