// "use client";

// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/providers/auth-provider";
// import Link from "next/link";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import Button from "./common/Button";
// import ToggleItem from "./common/ToggleItem";
// import { useWatchlist } from "@/contexts/WatchlistContext";

// const caretDown = (
//   <Image
//     src="/icons/caret-down.svg"
//     alt="Dropdown"
//     width={20}
//     height={20}
//     className="opacity-60 hover:opacity-80 group-hover:opacity-80 pt-0.5"
//   />
// );

// const caretDownSmall = (
//   <Image
//     src="/icons/caret-down.svg"
//     alt="Dropdown"
//     width={16}
//     height={16}
//     className="opacity-60 hover:opacity-80 group-hover:opacity-80 pt-0.5"
//   />
// );

// interface UserProfileProps {
//   userName: string;
//   userEmail: string;
//   userImage?: string;
// }

// const UserProfile: React.FC<UserProfileProps> = ({
//   userName,
//   userEmail,
//   userImage = "/default-avatar.png",
// }) => {
//   const router = useRouter();
//   const { logout } = useAuth();

//   const { showWatchlistHeader, handleShowWatchlistHeader } = useWatchlist();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       // setIsOpen(false);
//       router.push("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const getCountryFlag = (countryCode: string = "us") => (
//     <Image
//       src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
//       alt={`${countryCode?.toUpperCase()} flag`}
//       width={20}
//       height={20}
//       className="opacity-60 hover:opacity-80 group-hover:opacity-80 aspect-square object-cover rounded-full"
//     />
//   );

//   return (
//     <Popover>
//       <PopoverTrigger
//         className={`group flex items-center gap-3 cursor-pointer hover:text-white/70`}
//       >
//         <Image
//           src={userImage}
//           alt={userName}
//           width={32}
//           height={32}
//           className="min-w-8 rounded-full border-2 border-[#89CFF0]"
//         />
//         <div className="flex flex-col gap-px">
//           <span className="hidden xl:block text-sm text-white text-nowrap">
//             {userName}
//           </span>
//           <span className="text-2xs text-white/60 line-clamp-2">
//             @{userName}
//           </span>
//         </div>
//         {caretDown}
//       </PopoverTrigger>
//       <PopoverContent
//         align="end"
//         sideOffset={8}
//         className="min-w-40 bg-[#060606] p-0 rounded-xl border border-white/10 overflow-hidden"
//       >
//         <div className="flex flex-col gap-2 pt-4 border-none">
//           {/* User Info */}
//           <div className="flex gap-3 px-4 items-center">
//             <Image
//               src={userImage}
//               alt={userName}
//               width={48}
//               height={48}
//               className="rounded-full"
//             />
//             <div className="flex flex-col gap-px">
//               <span className="text-xl text-white">{userName}</span>
//               <span className="text-sm text-white/60">{userEmail}</span>
//             </div>
//           </div>

//           {/* User Actions */}
//           <div className="flex flex-col gap-1">
//             <Link
//               href={"/account-settings"}
//               className="w-full flex items-center gap-2 px-4 py-1.5 text-white/80 hover:bg-white/5"
//             >
//               <Image
//                 src={"/icons/user.svg"}
//                 alt={"Account-Settings"}
//                 width={16}
//                 height={16}
//               />
//               <span>{"Account Settings"}</span>
//             </Link>

//             <Link
//               href={"/language"}
//               className="group w-full flex items-center justify-between gap-2 px-4 py-1.5 text-white/80 hover:bg-white/5"
//             >
//               <div className="flex items-center gap-2">
//                 <Image
//                   src={"/icons/language-2.svg"}
//                   alt={"Language"}
//                   width={16}
//                   height={16}
//                 />
//                 <span>{"Language"}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 {getCountryFlag()}
//                 {caretDownSmall}
//               </div>
//             </Link>

//             <Link
//               href={"/help-support"}
//               className="w-full flex items-center gap-2 px-4 py-1.5 text-white/80 hover:bg-white/5"
//             >
//               <Image
//                 src={"/icons/heart-handshake.svg"}
//                 alt={"Help&Support"}
//                 width={16}
//                 height={16}
//               />
//               <span>{"Help & Support"}</span>
//             </Link>

//             <ToggleItem
//               label={<span className="">Watchlist / Active Pos.</span>}
//               isOn={showWatchlistHeader}
//               handleToggle={(v) => handleShowWatchlistHeader(v!)}
//               className="w-full flex items-center gap-2 px-4 py-1.5 text-white/80 rounded-none hover:bg-white/5"
//             />
//           </div>

//           <Button
//             className="w-full min-h-12 flex items-center gap-2 px-4 text-white/80 border-t border-white/10 rounded-none hover:bg-white/5"
//             onClick={handleLogout}
//           >
//             <Image
//               src="/icons/log-out.svg"
//               alt="Logout"
//               width={16}
//               height={16}
//             />
//             <span className="text-base">Logout</span>
//           </Button>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );

//   //  {
//   //    viewSettings?.[stage as keyof ViewSettings]?.quickBuy && (
//   //      <Popover>
//   //        <PopoverTrigger className={`group p-0`}>
//   //          <Button
//   //            variant="icon"
//   //            className="xl:min-w-32 pr-1.5 border border-[#0B9981]"
//   //          >
//   //            <span className="flex items-center gap-0.5 text-[10px] text-[#0B9981]">
//   //              <Image
//   //                src="/icons/bolt-green.svg"
//   //                alt="buy"
//   //                width={14}
//   //                height={14}
//   //              />
//   //              <span className="hidden xl:flex text-xs">Quick Buy</span>
//   //            </span>

//   //            <span className="w-px h-4 bg-white/10"></span>

//   //            <span className="flex items-center gap-0.5 text-xs">
//   //              <Image
//   //                src="/icons/Solana-new.svg"
//   //                alt="SOL"
//   //                width={14}
//   //                height={14}
//   //              />
//   //              <span className="text-[10px]">P1</span>
//   //              {/* {caretDownXSmall} */}
//   //            </span>
//   //          </Button>
//   //        </PopoverTrigger>
//   //        <PopoverContent
//   //          side="bottom"
//   //          align="end"
//   //          sideOffset={8}
//   //          alignOffset={0}
//   //          className="w-full min-w-48 bg-[#101010] p-0 rounded-md border border-white/10 overflow-hidden"
//   //        >
//   //          {Object.keys(presetMapping).map((label) => {
//   //            const relatedPresetKey =
//   //              presetMapping[label as keyof typeof presetMapping];
//   //            const relatedPreset =
//   //              presetData[relatedPresetKey as keyof typeof presetData];
//   //            const relatedBuySettings = relatedPreset?.buySettings;

//   //            return (
//   //              <div
//   //                key={label}
//   //                className="flex gap-2.5 text-xs text-white px-2 py-2 border-b border-white/10 last:border-b-0 hover:bg-white/5 cursor-pointer"
//   //                onClick={() => {
//   //                  setActivePresets((prev) => ({
//   //                    ...prev,
//   //                    [stage]: label,
//   //                  }));
//   //                }}
//   //              >
//   //                <div className="flex gap-1 items-center justify-center">
//   //                  {label}
//   //                </div>
//   //                <div className="min-w-14 flex gap-1 items-center justify-center">
//   //                  <Image
//   //                    src="/icons/slipping.svg"
//   //                    alt="slipping"
//   //                    width={16}
//   //                    height={16}
//   //                  />
//   //                  <span>{relatedBuySettings?.slippageLimit || ""}%</span>
//   //                </div>
//   //                <div className="min-w-14 flex gap-1 items-center justify-center">
//   //                  <Image
//   //                    src="/icons/gas-pump.svg"
//   //                    alt="gas-pump"
//   //                    width={16}
//   //                    height={16}
//   //                  />
//   //                  <span>{relatedBuySettings?.priorityFee}</span>
//   //                </div>
//   //                <div className="min-w-14 flex gap-1 items-center justify-center">
//   //                  <Image
//   //                    src="/icons/Holdings-coin.svg"
//   //                    alt="Holdings-coin"
//   //                    width={16}
//   //                    height={16}
//   //                  />
//   //                  <span>{relatedBuySettings?.bribe}</span>
//   //                </div>
//   //                <div className="min-w-14 flex gap-1 items-center justify-center">
//   //                  <Image
//   //                    src={
//   //                      relatedBuySettings?.mevProtection === "enabled"
//   //                        ? "/icons/robo.svg"
//   //                        : "/icons/robo-red.svg"
//   //                    }
//   //                    alt="bot"
//   //                    width={16}
//   //                    height={16}
//   //                  />
//   //                  <span>
//   //                    {relatedBuySettings?.mevProtection === "enabled"
//   //                      ? "On"
//   //                      : "Off"}
//   //                  </span>
//   //                </div>
//   //                <div className="min-w-14 flex gap-1 items-center justify-center">
//   //                  <Image
//   //                    src={
//   //                      activePresets[stage] === label
//   //                        ? "/icons/checkbox-checked-blue.svg"
//   //                        : "/icons/checkbox.svg"
//   //                    }
//   //                    alt="slipping"
//   //                    width={16}
//   //                    height={16}
//   //                  />
//   //                </div>
//   //              </div>
//   //            );
//   //          })}
//   //        </PopoverContent>
//   //      </Popover>
//   //    );
//   //  }

// };

// export default UserProfile;
