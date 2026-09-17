"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Button from "@/components/common/Button";
import { ChevronDown, Plus } from "lucide-react";

const caretDownXSmall = (
  <Image
    src="/icons/caret-down.svg"
    alt="Dropdown"
    width={14}
    height={14}
    className="opacity-80 hover:opacity-100 group-hover:opacity-100 pt-0.5"
  />
);

interface BlockListItem {
  id: string;
  image?: string;
  chain?: string;
  address?: string;
  word?: string;
}

interface BlockListData {
  contractAddress: BlockListItem[];
  devAddress: BlockListItem[];
  keyword: BlockListItem[];
}

const sampleBlockList: BlockListData = {
  contractAddress: [
    {
      id: "1",
      chain: "Solana",
      image: "/icons/Solana-new.svg",
      address: "0x1234567890123456789012345678901234567890",
    },
    {
      id: "2",
      chain: "Ethereum",
      image: "/icons/ETH.svg",
      address: "0x1234567890123456789012345678901234567890",
    },
  ],
  devAddress: [
    {
      id: "3",
      chain: "BTC",
      image: "/icons/BTC.svg",
      address: "0x1234567890123456789012345678901234567890",
    },
    {
      id: "4",
      chain: "Base",
      image: "/icons/BS.svg",
      address: "0x1234567890123456789012345678901234567890",
    },
  ],
  keyword: [
    { id: "5", chain: "Solana", image: "/icons/Solana-new.svg", word: "test" },
    { id: "6", chain: "Ethereum", image: "/icons/ETH.svg", word: "test" },
    { id: "7", chain: "BSC", image: "/icons/BTC.svg", word: "test" },
    { id: "8", chain: "Base", image: "/icons/BS.svg", word: "test" },
  ],
};

const blockListTabs: { label: string; value: keyof BlockListData }[] = [
  { label: "Contract Address", value: "contractAddress" },
  { label: "Dev Address", value: "devAddress" },
  { label: "Keyword", value: "keyword" },
];

const Blocklist = () => {
  // const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] =
    useState<keyof BlockListData>("contractAddress");
  const [blockListData, setBlockListData] = useState(sampleBlockList);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSelectedTabData = blockListData[
    selectedTab as keyof BlockListData
  ].filter((item) => {
    const cleanedSearchTerm = searchTerm.trim().toLowerCase();
    if (!cleanedSearchTerm) return true;
    return (
      (item as BlockListItem)?.address
        ?.toLowerCase()
        .includes(cleanedSearchTerm) ||
      (item as BlockListItem)?.word
        ?.toLowerCase()
        .includes(cleanedSearchTerm) ||
      (item as BlockListItem)?.chain?.toLowerCase().includes(cleanedSearchTerm)
    );
  });

  return (
    <Dialog>
      <DialogTrigger className={`group`}>
        <Button variant="icon">
          <Image src="/icons/stop-2.svg" alt="Dex" width={16} height={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-[#101010] p-0 py-4 text-white rounded-2xl border border-white/10">
        <DialogHeader className="px-4">
          <DialogTitle className="text-2xl font-normal">Block List</DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-[30vh] max-h-[70vh] flex flex-col gap-4  overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-4 px-4">
            {/* Search and Filter */}
            <div className="flex items-center justify-between gap-2">
              <div className="relative w-full flex items-center">
                <span className="absolute left-3 top-0 translate-y-1/2">
                  <Image
                    src="/icons/search-normal.svg"
                    alt="Filter"
                    width={16}
                    height={16}
                  />
                </span>
                <Input
                  className="w-full h-8 bg-[#060606] rounded-lg pl-8 pr-3 py-2 text-sm text-white/70 placeholder:text-white/50 border border-white/10 focus-visible:border-white/30 focus-visible:outline-none focus-visible:ring-0"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2">
                  <span className="w-6 h-6 flex items-center justify-center bg-white/10 text-sm border border-white/15 rounded-md ">
                    /
                  </span>
                </span>
              </div>
              <Button variant="small">
                <Image
                  src="/icons/filter-white.svg"
                  alt="Filter"
                  width={16}
                  height={16}
                />
                <span className="text-xs">Filter</span>
                <ChevronDown className="h-3.5 w-3.5 min-h-3.5 min-w-3.5" />
              </Button>
            </div>

            {/* Tabs */}
            <div className="grid w-full grid-cols-3 gap-1 rounded-lg bg-white/5 p-px">
              {blockListTabs.map(({ label, value }) => {
                const isActive = selectedTab === value;
                return (
                  <div
                    key={value}
                    className={`w-full h-9 flex items-center justify-center py-2 text-xs font-normal rounded-xl cursor-pointer ${
                      isActive ? "bg-[#89CFF0] text-black" : "border-none"
                    } transition duration-150`}
                    onClick={() => setSelectedTab(value)}
                  >
                    {label}
                  </div>
                );
              })}
            </div>

            {/* Chain Addresses */}
            <div className="flex flex-col min-h-[15vh] max-h-[50vh] overflow-y-auto custom-scrollbar">
              {filteredSelectedTabData.map((item) => {
                return (
                  // blockListData[selectedTab as keyof BlockListData].map((item) => (
                  <div className="flex items-center justify-between px-3 py-3 hover:bg-white/5 border-b border-white/10 rounded-xs last:border-b-0">
                    <div className="flex items-center gap-2">
                      {selectedTab !== "keyword" && (
                        <>
                          <Image
                            src={item?.image || "/icons/solana-green.svg"}
                            alt={"solana icon"}
                            width={26}
                            height={26}
                          />
                          <div className="flex flex-col gap-px">
                            <span className="text-xs">{item?.chain}</span>
                            <span className="text-2xs text-white/50">
                              {(item as BlockListItem)?.address}
                            </span>
                          </div>
                        </>
                      )}
                      {selectedTab === "keyword" && (
                        <div className="flex flex-col gap-px">
                          <span className="text-xs">{item?.word}</span>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="close"
                      onClick={() => {
                        const selectedTabItems =
                          blockListData[selectedTab as keyof BlockListData];
                        const updatedItems = selectedTabItems.filter(
                          (i) => i.id !== item.id
                        );
                        setBlockListData({
                          ...blockListData,
                          [selectedTab as keyof BlockListData]: updatedItems,
                        });
                      }}
                    />
                  </div>
                );
              })}
              <div className="py-2">
                <Button
                  className="w-full bg-[#060606] text-white/50 hover:bg-white/5 hover:text-white/70"
                  variant="default-dark"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col px-4">
          <div className="w-full flex gap-2">
            <Button className="w-full" variant="default-light">
              Import
            </Button>
            <Button className="w-full" variant="default-dark">
              Export
            </Button>
          </div>
          {/* <DialogClose asChild className="w-full">
            <Button variant="large-light">Continue</Button>
          </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Blocklist;
