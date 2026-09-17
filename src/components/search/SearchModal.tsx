"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Button from "@/components/common/Button";
import { useIsMutating } from "@tanstack/react-query";
import {
  useCreateItem,
  useGetItems,
  useGetMutationResult,
} from "@/hooks/react-query-general";
import Image from "next/image";
import Link from "next/link";
import { SearchToken, useSearch } from "@/contexts/SearchContext";
import { Socials } from "@/types/tokenInfo";
import router from "next/router";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiClient, polyMarketClient } from "@/config/api";
import {
  BackendPolyMarketSearchResult,
  PolyMarketEvent,
} from "@/types/polymarket";
// import { copyToClipboard } from "@/utils/common";
// import TokenCard, { TokenCardProps } from "@/components/common/TokenCard";

export const copyToClipboard = (text: string) => {
  if (!text) return;
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

const timeSince = (timestamp: number, maxUnits = 2) => {
  if (!timestamp) return "";

  const now = new Date();
  const then = new Date(timestamp);
  console.log({ now, then });
  let diff = Math.floor((now.getTime() - then.getTime()) / 1000); // seconds

  const units: [string, number][] = [
    ["y", 60 * 60 * 24 * 365], // years
    ["m", 60 * 60 * 24 * 30], // months (approx)
    ["d", 60 * 60 * 24], // days
    ["h", 60 * 60], // hours
    ["m", 60], // minutes
    ["s", 1], // seconds
  ];

  const parts: string[] = [];

  for (const [label, seconds] of units) {
    if (diff >= seconds) {
      const value = Math.floor(diff / seconds);
      diff -= value * seconds;
      parts.push(`${value}${label}`);
    }
    if (parts.length >= maxUnits) break; // stop once we hit limit
  }

  return parts.length > 0 ? parts.join(" ") : "0s";
};

// Mocked data
const popularChains: TokenCardProps[] = [
  {
    name: "Bitcoin",
    ticker: "BTC",
    value: "$98,829.93",
    change: "12.5%",
    icon: "/icons/BTC.svg",
    color: "bg-orange-500",
  },
  {
    name: "Binance",
    ticker: "BSC",
    value: "$83.9K",
    change: "12.5%",
    icon: "/icons/Binance.svg",
    color: "bg-yellow-500",
  },
  {
    name: "Ethereum",
    ticker: "ETH",
    value: "$98,829.93",
    change: "12.5%",
    icon: "/icons/ETH.svg",
    color: "bg-blue-500",
  },
  {
    name: "Solana",
    ticker: "SOL",
    value: "$98,829.93",
    change: "12.5%",
    icon: "/icons/Solana.svg",
    color: "bg-purple-500",
  },
];

// const history: TokenCardProps[] = Array.from({ length: 4 }).map((_, i) => ({
//   ticker: "SLOW",
//   name: `Slow Cook ${i + 1}`,
//   time: `${12 + i}m`,
//   value: `${0.01 + i * 0.01}`,
//   color: "bg-red-600",
//   volume24: "$2.5k",
//   marketCap: "$200.5k",
//   icon: "/icons/token-placeholder.svg",
// }));

/**
 * example token response from backend
 * 
 * 
      "name": "Kayyo",
      "address": "FRohT7yR1m8ur2oS4Vc5ssYWnaBNh2Qa25diQJvJkBLV",
      "networkId": 1399811149,
      "isScam": null,
      "imageSmallUrl": "https://token-media.defined.fi/1399811149_FRohT7yR1m8ur2oS4Vc5ssYWnaBNh2Qa25diQJvJkBLV_1757432705_small.png",
      "createdAt": 1751159569,
      "volume24": "5542",
      "marketCap": "156430",
      "pair": {
        "address": "C1qmybyyTboDm5A7SmtWcoiqgEYbHBUxxsZUtFj8bgcq"
      },
      "socials": {
        "telegram": "https://t.me/KayyoAppSol",
        "twitter": "https://x.com/kayyoxyz",
        "website": "https://kayyo.co/"
      }
 */

// general functions
export function getCurrencyValue(value: string | number) {
  if (typeof value === "string" && value.includes("$")) return value;
  let num = Number(value || 0);
  if (isNaN(num)) {
    num = 0;
  }
  return `$${num.toLocaleString()}`;
}

export async function getTokensFromPolyMarket(query: string) {
  const response = await apiClient.get<BackendPolyMarketSearchResult>(
    `/api/search?q=${query}`
  );
  return response.data?.data || [];
}

export type TokenCardVariant = "chain" | "token";

export interface TokenCardProps {
  variant?: TokenCardVariant;
  name: string;
  ticker: string;
  value: string;
  change?: string;
  icon: string;
  color?: string;
  time?: string;
  pairAddress?: string;
  extra?: React.ReactNode;
  active?: boolean; // highlight state
  volume?: string;
  marketCap?: string;
  buySellRatio?: string;
  sellTax?: string;
  transactionTax?: string;
  socials?: Socials;
  buyerCount?: string;
  defaultQuickBuyAmount?: number;
  handleQuickBuy?: () => void;
  onClick?: () => void;
  unmodifiedToken?: any;
}

const TokenCard = ({
  icon,
  variant = "token",
  name,
  ticker,
  value,
  change,
  time,
  extra,
  buySellRatio,
  sellTax,
  transactionTax,
  volume,
  marketCap,
  active,
  socials,
  buyerCount,
  defaultQuickBuyAmount = 0.01,
  pairAddress,
  handleQuickBuy,
  onClick,
}: TokenCardProps) => {
  return (
    <div
      className={`flex items-center justify-between p-3 transition cursor-pointer border-b border-white/5 last:border-b-0 ${
        active ? "bg-white/5" : "bg-transparent hover:bg-white/5"
      }`}
    >
      {variant === "chain" && (
        <>
          <div className="min-w-64 flex items-center gap-3" onClick={onClick}>
            <div className="w-14 h-14 flex items-center justify-center">
              <Image
                src={icon}
                alt={ticker || ""}
                width={44}
                height={44}
                className="rounded-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              {/* token name and ticker */}
              <div className="flex items-center gap-2">
                {name && (
                  <span className="text-sm font-medium text-white">{name}</span>
                )}
                {ticker && (
                  <span className="bg-white/5 px-2 py-1 text-xs text-white/50 rounded-full">
                    {ticker}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-px items-end text-sm text-white">
            {value && <span className="text-sm text-white">{value}</span>}
            {change && (
              <span className="font-light text-[#0B9981]">{change}</span>
            )}

            {extra}
          </div>
        </>
      )}

      {variant === "token" && (
        <>
          <div className="min-w-64 flex items-center gap-3" onClick={onClick}>
            <div className="w-14 h-14 flex items-center justify-center">
              <Image
                src={icon}
                alt={ticker || ""}
                width={54}
                height={54}
                className="rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-1">
              {/* token name and ticker */}
              <div className="flex items-center gap-1">
                <span className="flex-col items-center gap-1">
                  {name && (
                    <span className="text-sm font-medium text-white">
                      {name}
                    </span>
                  )}
                  {ticker && (
                    <span className="flex items-center gap-1 text-xs text-white/50 truncate">
                      {ticker}
                      <span
                        onClick={(e) => {
                          e.stopPropagation(); // prevent outer click
                        }}
                      >
                        <Image
                          src="/icons/copy-2.svg"
                          alt="copy"
                          width={12}
                          height={12}
                          onClick={() => copyToClipboard(ticker!)}
                        />
                      </span>
                    </span>
                  )}
                </span>
                {time && <span className="text-xs text-[#89CFF0]">{time}</span>}
              </div>

              {/* token stats */}
              <div className="flex items-center gap-2">
                {buySellRatio && (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/icons/user-up-green.svg"
                      alt="user"
                      width={12}
                      height={12}
                    />
                    <span className="text-xs text-[#0B9981]">
                      {buySellRatio}
                    </span>
                  </span>
                )}
                {sellTax && (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/icons/target-red.svg"
                      alt="target"
                      width={12}
                      height={12}
                    />
                    <span className="text-xs text-[#FB5252]">{sellTax}</span>
                  </span>
                )}

                {transactionTax && (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/icons/fan-red.svg"
                      alt="tax"
                      width={12}
                      height={12}
                    />
                    <span className="text-xs text-[#FB5252]">
                      {transactionTax}
                    </span>
                  </span>
                )}
              </div>

              {/* token value and market cap */}
              <div className="flex items-center gap-3">
                {volume && (
                  <span className="flex items-center gap-1">
                    <span className="text-xs text-white/50">V</span>
                    <span className="text-xs text-white">
                      {getCurrencyValue(volume)}
                    </span>
                  </span>
                )}
                {marketCap && (
                  <span className="flex items-center gap-1">
                    <span className="text-xs text-white/50">MC</span>
                    <span className="text-xs text-white">
                      {getCurrencyValue(marketCap)}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* quick buy button and buyer count and social links */}
          <div className="flex flex-col gap-2 items-end text-sm text-white">
            {/* quick buy button */}
            <Button variant="small-dark" className="" onClick={handleQuickBuy}>
              <span className="flex items-center gap-1">
                <Image
                  src="/icons/bolt-blue.svg"
                  alt="buy"
                  width={14}
                  height={14}
                />
                <span className="text-xs text-[#89CFF0]">
                  {defaultQuickBuyAmount}
                </span>
              </span>
            </Button>

            {/* buyer count and social links */}
            <div className="flex items-center gap-2">
              {/* buyer count */}
              <span className="flex items-center gap-1">
                <Image
                  src="/icons/user-min.svg"
                  alt="Search"
                  width={12}
                  height={12}
                />
                <span className="text-xs text-white/60">
                  {buyerCount || "0"}
                </span>
              </span>

              <div className="w-px h-5 bg-white/10"></div>

              {/* social links */}
              <span className="flex items-center gap-1">
                {/* x */}
                {socials?.twitter && (
                  <Link
                    href={`${socials?.twitter}`}
                    className="w-5 h-5 flex items-center justify-center bg-white/10 rounded-full"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/icons/x-grey.svg"
                      alt="Search"
                      width={12}
                      height={12}
                    />
                  </Link>
                )}
                {/* website */}
                {socials?.website && (
                  <Link
                    href={`${socials?.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-5 h-5 flex items-center justify-center bg-white/10 rounded-full"
                  >
                    <Image
                      src="/icons/globe.svg"
                      alt="Search"
                      width={12}
                      height={12}
                    />
                  </Link>
                )}
                {/* telegram */}
                {socials?.telegram && (
                  <Link
                    href={`${socials?.telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-5 h-5 flex items-center justify-center bg-white/10 rounded-full"
                  >
                    <Image
                      src="/icons/Telegram.svg"
                      alt="Search"
                      width={12}
                      height={12}
                    />
                  </Link>
                )}
                {/* search */}
                <Link
                  href={`${socials?.website || "#"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-5 h-5 flex items-center justify-center bg-white/10 rounded-full"
                >
                  <Image
                    src="/icons/search-icon.svg"
                    alt="Search"
                    width={12}
                    height={12}
                  />
                </Link>
              </span>
            </div>

            {extra}
          </div>
        </>
      )}
    </div>
  );
};

interface ApiToken {
  name: string;
  address: string;
  networkId: number;
  isScam: boolean | null;
  imageSmallUrl: string;
  createdAt: number;
  volume24: string;
  marketCap: string;
  pair: {
    address: string;
  };
  socials: Socials;
}

export function convertApiTokenToTokenCardProps(
  tokens: ApiToken[]
): TokenCardProps[] {
  return tokens.map((token) => ({
    icon: token?.imageSmallUrl,
    variant: "token", // Assuming a default variant here, adjust if needed
    name: token?.name,
    ticker: token?.name?.slice(0, 4).toUpperCase(), // Assuming ticker is the same as name, adjust if different
    value: token?.marketCap, // Or another relevant value
    volume: token?.volume24,
    marketCap: token?.marketCap,
    socials: token?.socials,
    pairAddress: token?.pair?.address,
    // Add other fields as necessary, or set defaults/undefined if not available
    unmodifiedToken: token, // store a copy of the original token info for the onclick function
  }));
}

export function convertPolyMarketEventToTokenCardProps(
  events: PolyMarketEvent[]
): TokenCardProps[] {
  return events.map((event) => ({
    icon: event.icon,
    variant: "token", // Assuming a default variant here, adjust if needed
    name: event.title,
    ticker: event.ticker,
    value: event.estimatedValue,
    volume: String(event.volume),
    marketCap: String(event.liquidity),
    // socials: event.socials,
    pairAddress: event.id,
    unmodifiedToken: event, // store a copy of the original token / event
  }));
}

// -----------------------------
// Main Modal Component
// -----------------------------
interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  view?: "newUser" | "history"; // decide view
}

const SearchModal = ({
  open,
  onOpenChange,
  view = "history",
}: SearchModalProps) => {
  const isLoading = Boolean(useIsMutating());
  const router = useRouter();
  const { setNavigationToken } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);

  const searchHistory = useMemo(() => {
    if (typeof window === "undefined") return [];

    const historyStr = localStorage.getItem("searchHistory");
    const previousHistory = historyStr ? JSON.parse(historyStr) : [];
    return previousHistory?.slice(0, 5) as PolyMarketEvent[];
  }, []);

  const isNewUser = view === "newUser" && !searchHistory.length;

  const [fetchedData, setFetchedData] = useState<PolyMarketEvent[]>(
    searchHistory || []
  );
  const [isFetchingTokens, setIsFetchingTokens] = useState(false);

  // const {
  //   mutateAsync: fetchTokens,
  //   isPending: isFetchingTokens,
  //   data: fetchedData = searchHistory,
  // } = useGetMutationResult();

  // State
  const [highlighted, setHighlighted] = useState(0);
  const [search, setSearch] = useState("");

  const handleSelect = (token: PolyMarketEvent) => {
    // Prepare token data for the charting page
    const convertApiTokenToSearchToken = (token: ApiToken): SearchToken => ({
      address: token.address,
      name: token.name,
      symbol: token.name.slice(0, 4).toUpperCase(),
      imageUrl: token.imageSmallUrl,
      dex: undefined, // No DEX info from search API - keep blank
      // Use single pair address from search response
      pairAddress: token.pair.address,
      // Optional properties for compatibility
      priceUsd: undefined, // Not available from search API
      priceChange24h: undefined, // Not available from search API
      tokenStage: undefined, // Not available from search API
      platformConfig: undefined, // Not available from search API
      socials: token.socials,
    });

    const convertPolyMarketEventToSearchToken = (
      event: PolyMarketEvent
    ): SearchToken => {
      return {
        address: event.id,
        name: event.title,
        symbol: event.ticker,
        imageUrl: event.icon,
        dex: undefined, // No DEX info from search API - keep blank
        // Use single pair address from search response
        pairAddress: event.id,
        // priceUsd: undefined, // Not available from search API
        // priceChange24h: undefined, // Not available from search API
        // tokenStage: undefined, // Not available from search API
        // platformConfig: undefined, // Not available from search API
        // socials: undefined, // Not available from search API
        unmodifiedEvent: event, // store a copy of the original polymarket event info
      };
    };

    try {
      const tokenForCharting = convertPolyMarketEventToSearchToken(token);

      // Store in SearchContext for instant in-app navigation
      setNavigationToken(tokenForCharting, token.id);

      // TODO: Confirm if using the id or ticker for the charting page is better
      // store in search history
      const previousHistory = [...searchHistory];
      const isInHistory = previousHistory.some((t) => t.id === token.id);
      if (isInHistory) {
        previousHistory.splice(previousHistory.indexOf(token), 1);
      } else {
        previousHistory.unshift(token);
      }
      localStorage.setItem("searchHistory", JSON.stringify(previousHistory));

      console.log({ tokenForCharting });
    } catch (error) {
      console.error("❌ Error in handleTokenClick:", error);
    } finally {
      onOpenChange(false);
      const defaultMarket = token.markets[0];
      router.push("/charting/" + token.id + "/" + defaultMarket.id);
    }
  };

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      setHighlighted(0);
      setSearch("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // // ensure data is [] when search is empty
  // const convertedData = convertApiTokenToTokenCardProps(
  //   (search?.length ? fetchedData : searchHistory) as ApiToken[]
  // );
  const preConvertedData =
    search?.length && fetchedData.length ? fetchedData : searchHistory;
  console.log({ preConvertedData, fetchedData, searchHistory });
  const convertedData =
    convertPolyMarketEventToTokenCardProps(preConvertedData);
  const filteredItems = convertedData.sort((a, b) =>
    a?.name?.toLowerCase().includes(search.toLowerCase()) ? -1 : 1
  );

  // Send search request to backend
  useEffect(() => {
    // const fetchTokensDebounced = async () => {
    //   const POLY_MARKET_API_URL =
    //     process.env.NEXT_PUBLIC_POLY_MARKET_API_URL ||
    //     "https://gamma-api.polymarket.com";
    //   const tokens: any[] = await fetchTokens({
    //     relativeUrl: `${POLY_MARKET_API_URL}/public-search?q=${search}&limit_per_type=20&sort=volume`,
    //     // relativeUrl: `/api/get/filtered-tokens/${search}`,
    //     method: "GET",
    //   })?.catch(console.error);

    //   console.log({ tokens });
    // };

    if (search.length >= 3) {
      // Add debounce to prevent excessive API calls
      const timeoutId = setTimeout(() => {
        setIsFetchingTokens(true);
        getTokensFromPolyMarket(search)
          .then((tokens) => setFetchedData(tokens))
          .finally(() => setIsFetchingTokens(false));
        // fetchTokensDebounced();
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [search]);

  console.log({ search, fetchedData });

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlighted((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlighted(
          (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filteredItems[highlighted];
        if (item) {
          console.log("Selected:", item); // replace with callback
          handleSelect((item as TokenCardProps)?.unmodifiedToken || item);
          onOpenChange(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [highlighted, filteredItems, open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-transparent py-8 px-2 max-w-lg w-full border-none rounded-xl">
        {/* Search Input */}
        <div className="relative bg-[#060606] rounded-full">
          <span className="absolute left-6 top-1/2 -translate-y-1/2">
            <Image
              src="/icons/search-normal.svg"
              alt="Search"
              width={20}
              height={20}
            />
          </span>
          <Input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ticker, token name"
            className="bg-[#101010] pl-14 py-8 border border-white/5 text-white/90 placeholder:text-white/40 rounded-2xl"
          />
          <div className="absolute flex gap-1 right-5 top-5 text-xs text-white/40 cursor-default">
            <span className="w-6 h-6 flex items-center justify-center bg-[#1c1c1c] text-lg border border-white/5 rounded-sm">
              ⌘
            </span>
            <span className="w-6 h-6 flex items-center justify-center bg-[#1c1c1c] text-lg border border-white/5 rounded-sm">
              F
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 min-h-72 bg-[#060606] py-4 border border-white/5 rounded-2xl">
          <div className="text-white/60 text-sm px-4 mb-2">
            {isNewUser ? "Popular Chains" : "History"}
          </div>

          {isFetchingTokens && (
            <div className="min-h-64 flex flex-col gap-4 items-center justify-start text-white/40 text-sm text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
              <p className="text-white/60 text-sm mt-2">Searching tokens...</p>
            </div>
          )}

          {!filteredItems.length && !isFetchingTokens && (
            <div className="min-h-64 flex flex-col gap-4 items-center justify-start text-white/40 text-sm text-center py-4">
              <Image
                src="/icons/search-normal.svg"
                alt="Search"
                width={80}
                height={80}
                className="opacity-40"
              />
              No results found
            </div>
          )}

          {!!filteredItems.length && !isFetchingTokens && (
            <div className="max-h-96 min-h-64 flex flex-col overflow-y-auto custom-scrollbar">
              {filteredItems.map((item: TokenCardProps, i: number) => (
                <TokenCard
                  variant={isNewUser ? "chain" : "token"}
                  key={item.name + i}
                  icon={item.icon || "/icons/Holdings-coin.svg"}
                  name={item.name}
                  value={item?.value}
                  ticker={item?.ticker}
                  volume={item?.volume}
                  marketCap={item?.marketCap}
                  pairAddress={item?.pairAddress}
                  time={timeSince(Number(item?.time || 0))}
                  active={i === highlighted}
                  onClick={() =>
                    handleSelect(item?.unmodifiedToken as PolyMarketEvent)
                  }
                  socials={item?.socials}
                />
              ))}
            </div>
          )}
          {/* new user call to action */}
          {isNewUser && (
            <div className="flex items-center justify-center backdrop-blur-2xl">
              <Button variant="default-light" className="" onClick={() => {}}>
                <span className="text-sm">Explore more popular tokens</span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt="Search"
                  width={16}
                  height={16}
                />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
