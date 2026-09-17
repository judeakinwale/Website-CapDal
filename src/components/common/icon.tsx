// "use client";
import { IconBaseProps, IconType } from "react-icons/lib";

import * as FAIcon from "react-icons/fa";
import * as FA6Icon from "react-icons/fa6";
import * as BSIcon from "react-icons/bs";
import * as MDIcon from "react-icons/md";
import * as LUIcon from "react-icons/lu";

const libMap = {
  fa: FAIcon,
  fa6: FA6Icon,
  bs: BSIcon,
  md: MDIcon,
  lu: LUIcon,
};

interface IconProps extends IconBaseProps {
  name: string;
  lib?: keyof typeof libMap; // configure default to be fa
}

export const Icon: React.FC<IconProps> = ({ name, lib, ...props }) => {
  let defaultLib: keyof typeof libMap = "fa";
  let inferredLib = lib || (name?.toLowerCase()?.slice(0, 2) as keyof typeof libMap);
  console.log({ inferredLib });

  let libIcons = libMap[inferredLib];

  if (!libIcons) libIcons = libMap[defaultLib];

  let IconComponent: IconType = libIcons[name as keyof typeof libIcons];
  if (!IconComponent) {
    libIcons = libMap[defaultLib];
    IconComponent = libIcons.FaGlobeAfrica;
  }

  return <IconComponent {...props} />;
};
