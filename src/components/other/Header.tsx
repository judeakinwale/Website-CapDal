"use client";
import { FC, useState } from "react";
import Image from "next/image";
import SearchModal from "@/components/search/SearchModal";
import UserProfile from "@/components/UserProfile";
import ActivityNotification from "./ActivityNotification";
import DepositModal from "./DepositModal";
import Link from "next/link";
import { useEmbeddedWallets } from "@/contexts/EmbeddedWalletContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { usePathname } from "next/navigation";
import Button from "../common/Button";
import WatchList from "./WatchList";
import { Input } from "../ui/input";
import { Hamburger, Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import ActivePosAndWatchListHeader from "./WatchlistHeader";
import { useWatchlist } from "@/contexts/WatchlistContext";

const chevronDown = (
  <Image
    src="/icons/chevron-down.svg"
    alt="Dropdown"
    width={20}
    height={20}
    className="opacity-60 hover:opacity-80 group-hover:opacity-80 pt-0.5"
  />
);

const caretDown = (
  <Image
    src="/icons/caret-down.svg"
    alt="Dropdown"
    width={20}
    height={20}
    className="opacity-60 hover:opacity-80 group-hover:opacity-80 pt-0.5"
  />
);

type TopNavLink = {
  title: string;
  url?: string;
  children?: TopNavLink[];
};

const navLinks: TopNavLink[] = [
  { title: "Discover", url: "#" },
  { title: "Spectrum", url: "/dashboard" },
  { title: "Trackers", url: "/trackers" },
  { title: "Automations", url: "/automations" },
  { title: "Rewards", url: "/rewards" },
  {
    title: "Folio",
    url: "",
    children: [
      { title: "Wallet", url: "/wallet" },
      { title: "Portfolio", url: "/portfolio" },
    ],
  },
];

const Header: FC = () => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDepositOpen, setDepositOpen] = useState(false);

  // Sample data for modal
  const token = {
    name: "Solana",
    symbol: "SOL",
    icon: "/icons/solana.svg",
  };
  const { embeddedWallets, addEmbeddedWallet, setEmbeddedWallets } =
    useEmbeddedWallets();


  console.log("embeddedWallets", embeddedWallets);
  const mainWallet = embeddedWallets.find((wallet) => wallet.isMain);
  const address = mainWallet?.walletAddress;
  const balance = mainWallet?.balance;

  return (
    <>
      <nav className="flex items-center justify-between gap-2 bg-[#ffffff0b] px-2 lg:px-6 w-full h-14 border-b border-white/10">
        <div className="h-full flex items-center gap-4 lg:gap-8">
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="flex items-center cursor-pointer"
              prefetch={false}
            >
              <Image
                src="/prysm-logo.svg"
                alt="prysm"
                width={115}
                height={30}
                className="min-w-28 hover:opacity-90"
              />
            </Link>
          </div>
          <div className="hidden lg:inline-block w-px h-10 bg-white/25"></div>
          <div className="hidden h-full lg:flex gap-6 overflow-x-auto custom-scrollbar">
            {navLinks?.map((l) => {
              // TODO: handle for sublinks
              const isActive = l.url && pathname === l.url;

              // ("#89CFF0");
              if (!l.url) {
                return (
                  <DropdownMenu.Root key={l.title + l.url}>
                    <DropdownMenu.Trigger
                      className={`group flex items-center gap-1 cursor-pointer hover:text-white/70 ${
                        isActive
                          ? "text-white/95 border-b-2 border-[#89CFF0] "
                          : "text-white/50 "
                      }`}
                    >
                      {l.title}
                      {/* {chevronDown} */}
                      {caretDown}
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="w-40 bg-[#1c1c1c] rounded-xl border border-white/10 overflow-hidden">
                      {l.children?.map((c) => {
                        return (
                          <DropdownMenu.Item
                            key={c.title + c.url}
                            className="border-none"
                          >
                            <Link
                              href={c.url!}
                              className="flex items-center justify-center p-2 text-white hover:bg-white/5 border-none"
                            >
                              {c.title}
                            </Link>
                          </DropdownMenu.Item>
                        );
                      })}
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                );
              }
              return (
                <Link
                  key={l.title + l.url}
                  href={l.url}
                  className={`flex items-center justify-center hover:text-white/70 ${
                    isActive
                      ? "text-white/95 border-b-2 border-[#89CFF0] "
                      : "text-white/50 "
                  }`}
                >
                  {l.title}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className={"min-w-28 text-white/40"}
            onClick={() => setIsSearchOpen(true)}
          >
            {
              // TODO: replace this with actual component
              // <Image
              //   src="/icons/Global-Search.svg"
              //   alt="Search"
              //   width={145}
              //   height={32}
              //   className="hidden lg:flex hover:opacity-90"
              // />
            }
            <div className="relative w-full max-w-32 lg:max-w-44 flex items-center">
              <span className="absolute left-3 top-0 translate-y-1/2">
                <Image
                  src="/icons/search-normal.svg"
                  alt="Filter"
                  width={16}
                  height={16}
                />
              </span>
              <Input
                className="w-full h-8 bg-[#060606] rounded-lg pl-8 pr-3 py-2 text-sm text-white/80 placeholder:text-white/70 border border-white/20 focus-visible:border-white/30 focus-visible:outline-none focus-visible:ring-0 cursor-pointer"
                placeholder="Search"
                value={""}
                readOnly
                // onChange={(e) => {
                //   setSearchTerm(e.target.value);
                // }}
              />
              <span className="hidden lg:inline-block absolute right-1 top-1/2 -translate-y-1/2">
                <span className="w-6 h-6 flex items-center justify-center bg-white/10 pb-0.5 text-white/80 text-sm border border-white/15 rounded-md ">
                  /
                </span>
              </span>
            </div>
          </Button>

          <Button variant="small-light" onClick={() => setDepositOpen(true)}>
            <Image
              src="/icons/wallet-black.svg"
              alt="star"
              width={20}
              height={20}
              className="opacity-90"
            />
            Deposit
          </Button>

          {/* <Button variant="icon" onClick={() => setDepositOpen(true)}>
            <Image
              src="/icons/star-light.svg"
              alt="star"
              width={20}
              height={20}
              className="opacity-90 hover:opacity-100"
            />
          </Button> */}

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-4">
            <WatchList />

            <ActivityNotification />

            <div className="w-px h-10 bg-white/25"></div>
            <UserProfile
              // TODO: get the user during login and store in local storage
              userName="User Name"
              userEmail="username@email.com"
              userImage="/icons/user-avatar.png"
            />
          </div>

          <div className="flex lg:hidden">
            <HamburgerMenu />
          </div>
        </div>
      </nav>
      <ActivePosAndWatchListHeader />

      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setDepositOpen(false)}
        address={address!}
        balance={balance!}
        token={token}
      />
    </>
  );
};

const HamburgerMenu: FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="icon">
          <Menu className="cursor-pointer" color="#ffffffb3" size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[#101010] p-0 text-white border border-[#101010]">
        <div className="h-full flex flex-col justify-between gap-4 py-4 text-white">
          <SheetHeader className="px-4">
            <SheetTitle className="flex  items-center justify-between text-white pr-12">
              <Menu className="cursor-pointer" color="#ffffffb3" size={20} />
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex-1 flex flex-col gap-4 px-4 rounded-lg overflow-y-auto custom-scrollbar">
            {navLinks?.map((l) => {
              // TODO: handle for sublinks
              const isActive = l.url && pathname === l.url;

              // ("#89CFF0");
              if (!l.url) {
                return (
                  <DropdownMenu.Root
                    key={l.title + l.url}
                    open={dropdownOpen}
                    onOpenChange={setDropdownOpen}
                  >
                    <DropdownMenu.Trigger
                      className={`group flex items-center justify-center gap-1 cursor-pointer hover:text-white/70 hover:!bg-white/20 ${
                        isActive
                          ? "text-white/95 border-b-2 border-[#89CFF0] "
                          : "text-white/50 "
                      }`}
                    >
                      {l.title}
                      {/* {chevronDown} */}
                      {caretDown}
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="w-40 bg-[#1c1c1c] rounded-xl border border-white/10 overflow-hidden">
                      {l.children?.map((c) => {
                        return (
                          <SheetClose asChild key={c.title + c.url}>
                            <DropdownMenu.Item
                              className="border-none"
                              onClick={() => {
                                setOpen(false);
                                setDropdownOpen(false);
                              }}
                            >
                              <Link
                                href={c.url!}
                                className="flex items-center justify-center p-2 text-white hover:bg-white/5 border-none"
                              >
                                {c.title}
                              </Link>
                            </DropdownMenu.Item>
                          </SheetClose>
                        );
                      })}
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                );
              }
              return (
                <SheetClose asChild key={l.title + l.url}>
                  <Link
                    href={l.url}
                    className={`flex items-center justify-center hover:text-white/70 hover:!bg-white/20 ${
                      isActive
                        ? "text-white/95 border-b-2 border-[#89CFF0] "
                        : "text-white/50 "
                    }`}
                  >
                    {l.title}
                  </Link>
                </SheetClose>
              );
            })}
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="small-dark">Close</Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Header;
