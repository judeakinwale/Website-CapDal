"use client";

import Button from "@/components/common/Button";
import Image from "next/image";
import Link from "next/link";
import { Socials } from "@/types/tokenInfo";
import toast from "react-hot-toast";
import {
  useViewSettingsStore,
  ViewSettings,
} from "@/stores/useViewSettingsStore";
import { TokenDeploymentEvent } from "../dashboard/SolanaTokenFeed";

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

export type TokenCardVariant = "chain" | "token" | "detailed-token";

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
  txsCount?: string; // transactions count
  buySellRatio?: string;
  sellTax?: string;
  transactionTax?: string;
  snipers?: string;
  devMigrations?: string;
  insiders?: string;
  bundleHolding?: string;
  devHolding?: string;
  socials?: Socials;
  holders?: string;
  proTraders?: string;
  topTenHolders?: string;
  defaultQuickBuyAmount?: number;
  handleQuickBuy?: () => void;
  onClick?: () => void;
  unmodifiedToken?: any;
  token?: TokenDeploymentEvent;
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
  snipers = "0",
  devMigrations = "0",
  insiders = "0",
  bundleHolding = "0",
  devHolding = "0",
  volume,
  marketCap,
  txsCount,
  active,
  socials,
  holders,
  proTraders,
  topTenHolders,
  defaultQuickBuyAmount = 0.01,
  pairAddress,
  handleQuickBuy,
  onClick,
  token,
}: TokenCardProps) => {
  const stage: any = token?.tokenStage || token?.stage;

  console.log({ stage });

  // function to copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // ---------------------------------------------------------------------------------------
  // view settings for token feed
  const { viewSettings, setViewSettings } = useViewSettingsStore();
  // ---------------------------------------------------------------------------------------
  // viewSettings?.[stage as keyof ViewSettings]?.quickBuy &&

  // transactionCount;
  // progressBar;
  // dexes;
  // proTraders;
  // devHolding;
  // top10Holding;
  // holders;
  // snipers;
  // dexScreener;
  // social;
  // quickBuy;

  return (
    <div
      className={`flex items-center justify-between p-3 transition cursor-pointer border-b border-white/5 last:border-b-0 ${
        active ? "bg-white/5" : "bg-transparent hover:bg-white/5"
      } rounded-lg`}
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
                {ticker && (
                  <span className="text-sm font-medium text-white">
                    {ticker}
                  </span>
                )}
                {name && (
                  <span className="text-xs text-white/50 truncate">{name}</span>
                )}
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
                    onClick={() => {
                      if (!pairAddress) return;
                      copyToClipboard(pairAddress);
                      toast.success("Copied to clipboard");
                    }}
                  />
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

                {viewSettings?.[stage as keyof ViewSettings]?.transactionCount &&
                  transactionTax && (
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
            {viewSettings?.[stage as keyof ViewSettings]?.quickBuy && (
              <Button
                variant="small-dark"
                className=""
                onClick={handleQuickBuy}
              >
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
            )}

            {/* buyer count and social links */}
            <div className="flex items-center gap-2">
              {/* buyer count */}
              {viewSettings?.[stage as keyof ViewSettings]?.holders && (
                <span className="flex items-center gap-1">
                  <Image
                    src="/icons/user-min.svg"
                    alt="User"
                    width={12}
                    height={12}
                  />
                  <span className="text-xs text-white/60">
                    {holders || "0"}
                  </span>
                </span>
              )}

              {viewSettings?.[stage as keyof ViewSettings]?.social && (
                <>
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
                </>
              )}
            </div>

            {extra}
          </div>
        </>
      )}

      {variant === "detailed-token" && (
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
                {ticker && (
                  <span className="text-sm font-medium text-white">
                    {ticker}
                  </span>
                )}
                {name && (
                  <span className="text-xs text-white/50 truncate">{name}</span>
                )}
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
                    onClick={() => {
                      if (!pairAddress) return;
                      copyToClipboard(pairAddress);
                      toast.success("Copied to clipboard");
                    }}
                  />
                </span>
                {time && <span className="text-xs text-[#89CFF0]">{time}</span>}
              </div>

              {/* token stats */}
              <div className="flex items-center gap-2">
                {viewSettings?.[stage as keyof ViewSettings]?.snipers &&
                  snipers && (
                    <span className="flex items-center gap-1">
                      <Image
                        src="/icons/Snipers.svg"
                        alt="Snipers"
                        width={12}
                        height={12}
                      />
                      <span className="text-xs text-[#0B9981]">
                        {snipers || "0"}%
                      </span>
                    </span>
                  )}
                {devMigrations && (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/icons/rocket-grey.svg"
                      alt="Dev-Migrations"
                      width={12}
                      height={12}
                    />
                    <span className="text-xs text-white">
                      {devMigrations || "0"}%
                    </span>
                  </span>
                )}
                {viewSettings?.[stage as keyof ViewSettings]?.dexes &&
                  insiders && (
                    <span className="flex items-center gap-1">
                      <Image
                        src="/icons/insiders-light.svg"
                        alt="Insiders"
                        width={12}
                        height={12}
                      />
                      <span className="text-xs text-white">
                        {insiders || "0"}%
                      </span>
                    </span>
                  )}
                {bundleHolding && (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/icons/Bundle-holding.svg"
                      alt="Bundle-holding"
                      width={12}
                      height={12}
                    />
                    <span className="text-xs text-white">
                      {bundleHolding || "0"}%
                    </span>
                  </span>
                )}
                {viewSettings?.[stage as keyof ViewSettings]?.devHolding &&
                  devHolding && (
                    <span className="flex items-center gap-1">
                      <Image
                        src="/icons/Dev-Holding.svg"
                        alt="Dev-Holding"
                        width={12}
                        height={12}
                      />
                      <span className="text-xs text-white">
                        {devHolding || "0"}%
                      </span>
                    </span>
                  )}
                {viewSettings?.[stage as keyof ViewSettings]?.dexScreener && (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/icons/dex-screener-green.svg"
                      alt="Dex-Screener"
                      width={14}
                      height={14}
                    />
                  </span>
                )}
                {/* ------------------------------------------------------------ */}
                {/* {buySellRatio && (
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
                )} */}
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

              {/* token holder stats and social links */}
              <div className="flex items-center gap-2">
                {/* holders */}
                {viewSettings?.[stage as keyof ViewSettings]?.holders && (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/icons/user-min.svg"
                      alt="User"
                      width={12}
                      height={12}
                    />
                    <span className="text-xs text-white/60">
                      {holders || "0"}
                    </span>
                  </span>
                )}
                {/* pro traders */}
                {viewSettings?.[stage as keyof ViewSettings]?.proTraders && (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/icons/candle.svg"
                      alt="pro"
                      width={12}
                      height={12}
                    />
                    <span className="text-xs text-white/60">
                      {proTraders || "0"}
                    </span>
                  </span>
                )}

                {/* top 10 holders */}
                {viewSettings?.[stage as keyof ViewSettings]?.top10Holding && (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/icons/whale.svg"
                      alt="top"
                      width={12}
                      height={12}
                    />
                    <span className="text-xs text-white/60">
                      {topTenHolders || "0"}
                    </span>
                  </span>
                )}

                {/* handle the social section visibility and divider */}
                {viewSettings?.[stage as keyof ViewSettings]?.social && (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>

          {/* quick buy button and token value and market cap */}
          <div className="flex flex-col gap-2 items-end text-sm text-white">
            <div className="flex items-center gap-2">
              {/* token value and market cap */}
              <div className="flex items-center gap-3">
                {/* {volume && (
                  <span className="flex items-center gap-1">
                    <span className="text-xs text-white/50">V</span>
                    <span className="text-xs text-white">
                      {getCurrencyValue(volume)}
                    </span>
                  </span>
                )} */}
                {marketCap && (
                  <span className="flex items-center gap-1">
                    <span className="text-xs text-white/50">MC</span>
                    <span className="text-xs text-white">
                      {getCurrencyValue(marketCap)}
                    </span>
                  </span>
                )}
              </div>
              {/* quick buy button */}
              {viewSettings?.[stage as keyof ViewSettings]?.quickBuy && (
                <Button
                  variant="small-dark"
                  className=""
                  onClick={handleQuickBuy}
                >
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
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3">
                {volume && (
                  <span className="flex items-center gap-1">
                    <span className="text-xs text-white/50">V</span>
                    <span className="text-xs text-white">
                      {getCurrencyValue(volume)}
                    </span>
                  </span>
                )}
                {viewSettings?.[stage as keyof ViewSettings]
                  ?.transactionCount &&
                  txsCount && (
                    <span className="flex items-center gap-1">
                      <span className="text-xs text-white/50">TX</span>
                      <span className="text-xs text-white">{txsCount}</span>
                    </span>
                  )}
              </div>

              {viewSettings?.[stage as keyof ViewSettings]?.progressBar && (
                <div className="w-16 h-2 flex items-center justify-center">
                  <BuySellBar ratio={Number(buySellRatio || 0)} />
                </div>
              )}
            </div>

            {extra}
          </div>
        </>
      )}
    </div>
  );
};

interface BuySellBarProps {
  ratio: number; // ratio from 0 to 1 (e.g. 0.7 = 70% buy, 30% sell)
}

const BuySellBar: React.FC<BuySellBarProps> = ({ ratio }) => {
  const buyPercent = Math.min(Math.max(ratio, 0), 1) * 100;
  const sellPercent = 100 - buyPercent;

  return (
    <div className="flex items-center space-x-2 w-full max-w-md">
      {/* Buy bar */}
      <div
        className="h-1 rounded-full bg-[#0B9981] transition-all"
        style={{ width: `${buyPercent}%` }}
      ></div>

      {/* Sell bar */}
      <div
        className="h-1 rounded-full bg-[#FB5252] transition-all"
        style={{ width: `${sellPercent}%` }}
      ></div>
    </div>
  );
};

export default TokenCard;
