// "use client";

// import { FC, useState, useRef, useEffect } from "react";
// import Button from "@/components/common/Button";
// import { Label } from "@/components/ui/label";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import Image from "next/image";
// import type { WatchlistItem } from "@/types/watchlist";
// import { useWatchlist } from "@/contexts/WatchlistContext";
// import TokenCard, { TokenCardProps } from "../common/TokenCard";
// import { TokenDeploymentEvent } from "./SolanaTokenFeed";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// interface NotificationItem {
//   id: string;
//   type: "message" | "warning" | "email";
//   heading: string;
//   description: string;
//   timestamp: string;
//   actions?: { url?: string; label?: string }[];
// }

// // TODO: review this works as expected
// const convertTokenDeploymentEventToTokenCardProps = (
//   token: TokenDeploymentEvent,
// ): TokenCardProps => {
//   return {
//     name: token.tokenName,
//     ticker: token.tokenSymbol,
//     value: token.additionalData?.price
//       ? token.additionalData.price.toString()
//       : "0",
//     change: token.additionalData?.priceData
//       ? token.additionalData.priceData.toString()
//       : undefined,
//     icon: token.image ?? "",
//     pairAddress: token.liquidityPoolAddress,
//     volume: token.additionalData?.volume24h
//       ? token.additionalData.volume24h.toString()
//       : token.volume24h?.toString(),
//     marketCap: token.additionalData?.marketCap
//       ? token.additionalData.marketCap.toString()
//       : token.marketCap?.toString(),
//     snipers: token.additionalData?.snipers?.toString(),
//     insiders: token.additionalData?.insiders?.join(", "),
//     topTenHolders: token.additionalData?.topTenHolders,
//     holders:
//       token.additionalData?.holders?.toString() ?? token.holders?.toString(),
//     proTraders: token.additionalData?.proTraders?.toString(),
//     socials: token.socials,
//     unmodifiedToken: token,
//   };
// };

// const convertWatchlistItemToTokenCardProps = (
//   item: WatchlistItem & { tokenData?: any },
// ): TokenCardProps => {
//   return {
//     name: item.name,
//     ticker: item.symbol,
//     value:
//       item.tokenData?.currentPrice !== undefined
//         ? item.tokenData.currentPrice.toString()
//         : "0",
//     change:
//       item.tokenData?.priceChange24h !== undefined
//         ? item.tokenData.priceChange24h.toString()
//         : undefined,
//     icon: item.imageURI ?? "",
//     pairAddress: item.tokenAddress,
//     volume:
//       item.tokenData?.volume24h !== undefined
//         ? item.tokenData.volume24h.toString()
//         : undefined,
//     marketCap:
//       item.tokenData?.currentMcap !== undefined
//         ? item.tokenData.currentMcap.toString()
//         : undefined,
//     snipers: undefined,
//     insiders: undefined,
//     topTenHolders: undefined,
//     holders: undefined,
//     proTraders: undefined,
//     socials: undefined,
//     unmodifiedToken: item,
//   };
// };

// const WatchList: FC = () => {
//   const router = useRouter();
//   const { watchlist, loading, refreshWatchlist } = useWatchlist();

//   const cleanedWatchlist = watchlist.map(convertWatchlistItemToTokenCardProps);

//   const handleOpenChange = (open: boolean) => {
//     if (open) {
//       refreshWatchlist();
//     }
//   };

//   const handleCardClick = (pairAddress: string) => {
//     if (!pairAddress) return toast.error("Invalid pair address.");
//     router.push(`/charting/${pairAddress}`);
//   };

//   return (
//     <Sheet onOpenChange={handleOpenChange}>
//       <SheetTrigger
//       // asChild
//       >
//         <Button variant="icon">
//           <Image
//             src="/icons/star-light.svg"
//             alt="star"
//             width={20}
//             height={20}
//             className="opacity-90 hover:opacity-100"
//           />
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="bg-[#101010] p-0 text-white border border-[#101010]">
//         <div className="h-full flex flex-col justify-between gap-4 bg-[url('/watchlist-bg.png')] py-4 text-white bg-cover bg-top">
//           <SheetHeader className="px-4 border-b border-white/10">
//             <SheetTitle className="flex items-center justify-between text-white pr-12">
//               <span>Watchlist</span>
//             </SheetTitle>
//             <SheetDescription></SheetDescription>
//           </SheetHeader>
//           <div className="flex-1 flex flex-col gap-4 px-4 rounded-lg overflow-y-auto custom-scrollbar">
//             {!cleanedWatchlist?.length && (
//               <div className="h-full flex items-center justify-center">
//                 <div className="max-w-80 flex flex-col gap-4 items-center">
//                   <span className="text-lg font-medium text-white">
//                     Your Watchlist is empty
//                   </span>
//                   <span className="text-center text-xs  text-white/60">
//                     Click the bookmark icon on any token page to add it here.
//                     Track prices, trends, and updates in one place{" "}
//                   </span>
//                   <Button
//                     variant="small-light"
//                     onClick={() => router.push("/")}
//                   >
//                     <Image
//                       src="/icons/plus-dark.svg"
//                       alt="Add to Watchlist"
//                       width={20}
//                       height={20}
//                     />
//                     <span>Add to Watchlist</span>
//                   </Button>
//                 </div>
//               </div>
//             )}
//             {cleanedWatchlist?.map((item) => (
//               <SheetClose key={item.pairAddress} className="">
//                 <TokenCard
//                   {...item}
//                   onClick={() => handleCardClick(item.pairAddress!)}
//                 />
//               </SheetClose>
//             ))}
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );

//   // return (
//   //   <div className="relative" ref={dropdownRef}>
//   //     <button
//   //       onClick={() => setIsOpen(!isOpen)}
//   //       className="p-2 h-[34px] border border-[rgba(255,255,255,0.1)] rounded-lg"
//   //     >
//   //       <Image
//   //         src="/icons/notification-icon.svg"
//   //         alt="Notifications"
//   //         width={20}
//   //         height={20}
//   //       />
//   //     </button>

//   //     {isOpen && (
//   //       <div
//   //         className="absolute right-[-144px] top-[-14px] w-[382px] bg-[#1A1A1A] rounded-[12px] border border-[rgba(255,255,255,0.1)] shadow-lg z-50 min-h-screen max-h-screen overflow-hidden"
//   //         style={{
//   //           padding: "24px 0",
//   //         }}
//   //       >
//   //         <div className="flex items-center justify-between px-6 pb-6 border-b border-[rgba(255,255,255,0.1)]">
//   //           <h2 className="text-white text-lg font-medium">Activity</h2>
//   //           <button onClick={() => setIsOpen(false)}>
//   //             <Image
//   //               src="/icons/Close.svg"
//   //               alt="Close"
//   //               width={24}
//   //               height={24}
//   //             />
//   //           </button>
//   //         </div>

//   //         <div
//   //           className="overflow-y-auto overflow-x-hidden max-h-[calc(100vh-150px)]"
//   //           style={{ gap: "24px" }}
//   //         >
//   //           {notifications.map((notification) => (
//   //             <div
//   //               key={notification.id}
//   //               className="pl-[14px] pr-[36px] pt-6 pb-[8px] border-b border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)]"
//   //             >
//   //               <div className="flex items-start gap-3 h-[136px]">
//   //                 <Image
//   //                   src={getNotificationIcon(notification.type)}
//   //                   alt={notification.type}
//   //                   width={24}
//   //                   height={24}
//   //                 />
//   //                 <div className="flex-1">
//   //                   <div className="flex justify-between items-start mb-1">
//   //                     <h3 className="text-white text-sm font-medium">
//   //                       {notification.heading}
//   //                     </h3>
//   //                     <span className="text-[rgba(255,255,255,0.6)] text-xs">
//   //                       {notification.timestamp}
//   //                     </span>
//   //                   </div>
//   //                   <p className="text-[rgba(255,255,255,0.6)] text-sm">
//   //                     {notification.description}
//   //                   </p>
//   //                   <div className="flex gap-2 mt-2">
//   //                     <button className="px-4 py-1 bg-[#2E2E2E] text-white text-sm rounded">
//   //                       Action
//   //                     </button>
//   //                     <button className="px-4 py-1 text-[rgba(255,255,255,0.6)] text-sm">
//   //                       Action
//   //                     </button>
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           ))}
//   //         </div>
//   //       </div>
//   //     )}
//   //   </div>
//   // );
// };

// export default WatchList;
