import React from "react";
import { splitTitle } from "@/utils/text";
import { cn } from "@/lib/utils";

export interface SplitTitleProps {
  title: string | string[];
  separator?: string;
  hideBreak?: boolean;
}

export const SplitTitle: React.FC<SplitTitleProps> = ({
  title,
  separator = ",",
  hideBreak = true,
}) => {
  const splitTitleArr = Array.isArray(title) ? title : splitTitle(title);
  return (
    <>
      {splitTitleArr?.map((t, index) => {
        const isLast = index === splitTitleArr.length - 1;
        return (
          <React.Fragment key={t}>
            <span>
              {t}
              {isLast ? "" : separator}
            </span>
            <br className={cn(hideBreak && "hidden md:block last:hidden")} />
          </React.Fragment>
        );
      })}
    </>
  );
};
