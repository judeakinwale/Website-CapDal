"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Url } from "url";
import { useGetItems } from "@/lib/reactQuery/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { NavLink, NavLinkContentDisplay } from "@/types/links";
import { LOGO_URL } from "@/constants/assets";
import { defaultNavLinks } from "@/sample-data";
import React from "react";
import { useLenis } from "@/context/lenis";
import { X, Menu } from "lucide-react";

interface NavLinkContentItemProps extends React.ComponentPropsWithoutRef<"li"> {
  href: string;
}

const NavLinkContentItem: React.FC<NavLinkContentItemProps> = ({
  title,
  children,
  href,
  ...props
}) => {
  return (
    <li {...props}>
      <NavigationMenuLink
      // asChild
      >
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

interface NavLinkItemProps extends NavLink {
  content?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const isActivePath = (pathname: string, href: string): boolean => {
  if (!pathname || !href) return false;
  if (pathname === href) return true;
  if (href !== "/" && pathname.includes(href)) return true;
  return false;
};

const NavLinkItem: React.FC<NavLinkItemProps> = ({
  title,
  href,
  content,
  contentDisplay = NavLinkContentDisplay.list,
  className,
  containerClassName = "w-full",
}) => {
  const pathname = usePathname();
  const isActive = isActivePath(pathname, href as string);

  // popup styling
  // "focus:bg-transparent data-open:focus:bg-transparent data-open:hover:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent data-open:bg-transparent"
  const hoverClassNames =
    "focus:bg-white/5 data-open:focus:bg-white/5 data-open:hover:bg-white/5 data-popup-open:bg-white/5 data-popup-open:hover:bg-white/5 data-open:bg-white/5";

  if (content)
    return (
      <NavigationMenuItem className={cn(containerClassName)}>
        <NavigationMenuTrigger
          className={cn(
            "text-white/80 text-sm font-bold border-b-2 border-transparent uppercase hover:bg-white/5 transition-all",
            isActive && "text-white border-white",
            hoverClassNames,
            className,
          )}
        >
          {title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul
            className={cn(
              contentDisplay === NavLinkContentDisplay.list && "w-96",
              contentDisplay === NavLinkContentDisplay.grid &&
                "grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150",
            )}
          >
            {content as React.ReactNode}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );

  return (
    <NavigationMenuItem className={cn(containerClassName)}>
      <NavigationMenuLink
        // asChild
        className={cn(
          navigationMenuTriggerStyle(),
          "text-white/80 text-sm font-bold border-b-2 border-transparent uppercase hover:bg-white/5 transition-all",
          isActive && "text-white border-white",
          hoverClassNames,
          className,
        )}
        href={href as string}
      >
        {title}
        {/* <Link href={href!}>{title}</Link> */}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const Header = () => {
  const { pending } = useLinkStatus();
  // const lenis = useLenis();

  const navRef = React.useRef<HTMLDivElement | null>(null);

  const { data: links = defaultNavLinks } = useGetItems<NavLink>("/navlink");

  const [hasScrolled, sethasScrolled] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (navRef.current && !navRef.current.contains(target)) {
      setMobileNavOpen(false);
    }
    document.removeEventListener("click", handleOutsideClick);
  };

  const toggleMobileNav = () => {
    mobileNavOpen
      ? document.removeEventListener("click", handleOutsideClick)
      : document.addEventListener("click", handleOutsideClick);
    setMobileNavOpen(!mobileNavOpen);
  };

  const renderedNavMenu = (
    <NavigationMenu className={cn(mobileNavOpen ? "max-w-full" : "")}>
      <NavigationMenuList
        className={cn(
          "flex gap-8",
          mobileNavOpen
            ? "w-full flex-col items-center"
            : "flex-row items-center",
        )}
      >
        {links?.map((l) => (
          <NavLinkItem
            key={l.href + l.title}
            title={l.title}
            href={l.href}
            className={cn(mobileNavOpen ? "w-2/3" : "")}
            containerClassName={cn(
              "flex cursor-pointer",
              mobileNavOpen ? "w-full justify-center" : "",
            )}
            content={l.subLinks?.map((sl) => (
              <NavLinkContentItem
                key={sl.href + sl.title}
                title={sl.title}
                href={sl.href as string}
              >
                {sl.description}
              </NavLinkContentItem>
            ))}
            contentDisplay={NavLinkContentDisplay.grid}
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );

  // TODO: look into replacing this with a use state if it is better
  React.useEffect(() => {
    const updateHeaderColor = () => {
      if (window.scrollY > 80) {
        sethasScrolled(true);
        // (navRef.current as HTMLDivElement).style.backgroundColor = "#b80c26";
      } else {
        sethasScrolled(false);
        // (navRef.current as HTMLDivElement).style.backgroundColor =
        //   "transparent";
      }
    };

    window.addEventListener("scroll", updateHeaderColor);

    () => window.removeEventListener("scroll", updateHeaderColor);
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed z-20 top-0 w-full backdrop-blur-md text-3xl border-b border-white/5 shadow-md",
        hasScrolled && "bg-primary/90",
      )}
      id="top-nav"
    >
      <div className="flex justify-center">
        <div className="w-full container flex justify-between items-center gap-8 p-4">
          <div className="flex items-center gap-2">
            <Link className="" href="/">
              <Image
                alt="Cappa &amp; D'Alberto"
                className="h-10 w-52 object-contain"
                width={203}
                height={40}
                src={LOGO_URL}
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-8">
              {renderedNavMenu}
            </div>
          </div>

          <div className="flex justify-center items-center gap-2">
            <Link href="/contact" className="flex">
              <Button
                className={cn(
                  "bg-white text-primary text-sm font-bold uppercase hover:bg-black hover:text-white transition-all duration-300",
                )}
              >
                Contact Us
              </Button>
            </Link>
          </div>

          <div
            className="flex md:hidden p-2 text-white"
            onClick={toggleMobileNav}
          >
            {mobileNavOpen ? <X /> : <Menu />}
            <div
              className={cn(
                mobileNavOpen
                  ? "absolute top-18 right-0 w-full flex flex-col gap-1 bg-secondary-alt/95 p-8 border-2 border-transparent"
                  : "hidden",
              )}
              onClick={toggleMobileNav}
            >
              <div className="w-full flex flex-col">{renderedNavMenu}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
