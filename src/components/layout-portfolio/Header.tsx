"use client";
import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { FaGithub, FaLinkedin } from "react-icons/fa";
type NavLinkProps = {
  href: string;
  children?: React.ReactNode;
};

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <a href={href} className="">
      {children}
    </a>
  );
};

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const mockConfig = [
  {
    name: "GitHub Link",
    value: "https://github.com/judeakinwale",
  },
  {
    name: "LinkedIn Link",
    value: "https://www.linkedin.com/in/jude-akinwale-0",
  },
];

const mockConfigObject = Object.groupBy(mockConfig, (c) => c.name);

console.log({ value: mockConfigObject["GitHub Link"]?.[0]?.value });

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
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
}

const Header = () => {
  const navLinks = [
    { href: "/about", label: "About" }, // #about
    { href: "/projects", label: "Projects" }, // #projects
    { href: "/blog", label: "Blog" }, // #blog
    { href: "/contact", label: "Contact" }, // #contact
  ];

  return (
    <div className="w-full h-16 flex justify-between items-center px-4 bg-primary/20">
      {/* logo / name */}
      <div className="text-lg font-light">
        <i>akinwale</i>
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              // asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/docs">Documentation</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-96">
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built with Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:flex">
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              // asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/docs">Docs</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-4">
        {navLinks.map((link) => (
          <NavLink key={link?.href} href={link?.href}>
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* github & linkedin links */}
      <div className="flex gap-4">
        <Link
          href={mockConfigObject["GitHub Link"]?.[0]?.value!}
          className="p-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-2xl" />
        </Link>
        <Link
          href={mockConfigObject["LinkedIn Link"]?.[0]?.value!}
          className="p-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
