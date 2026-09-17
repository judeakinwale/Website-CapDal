"use client";

// File "Icon.tsx"
import loadable from "@loadable/component";
import { IconBaseProps, IconType } from "react-icons/lib";
import { JSX } from "react/jsx-runtime";

interface typesPropsIcon {
  nameIcon: string;
  propsIcon?: IconBaseProps;
}

// ! currently does not work, use Icon.tsx instead
export function IconAlt({ nameIcon, propsIcon }: typesPropsIcon): JSX.Element {
  const lib = nameIcon
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(" ")[0]
    .toLocaleLowerCase();
  const ElementIcon: IconType = loadable(
    // almost works but the dynamic import here breaks with turbopack and possibly webpack
    () => import(`react-icons/${lib}/index.js`),
    {
      resolveComponent: (el: JSX.Element) => el[nameIcon as keyof JSX.Element],
    },
  );

  return <ElementIcon {...propsIcon} />;
}

