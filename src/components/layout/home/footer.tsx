"use client";
import { LOGO_URL } from "@/constants/assets";
import { useGetItems } from "@/lib/reactQuery/api";
import {
  defaultContactInfo,
  defaultFooterNavLinks,
  defaultNavLinks,
  defaultProjectCategories,
  defaultSections,
  defaultSocialLinks,
} from "@/sample-data";
import { ContactInfo, ContactInfoType } from "@/types/contact";
import { DefaultItem, DefaultLinkItem } from "@/types/default";
import { NavLink } from "@/types/links";
import { useIsFetching } from "@tanstack/react-query";
import { ArrowRight, Briefcase, Earth, WholeWord } from "lucide-react";
import * as FaIcons from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/icon";
import NewsletterForm from "@/modules/(home)/newsletter-form";
import { Section, SiteSections } from "@/types/section";
// import { useParams, useSearchParams } from 'next/navigation'

interface FooterLinkItemProps {
  title: string;
  href: string;
  onClick?: () => void;
}

const FooterLinkItem: React.FC<FooterLinkItemProps> = ({
  title,
  href,
  onClick,
}) => {
  return (
    <li key={title}>
      <Link
        className="text-sm font-body-md text-white/70 hover:text-white transition-all"
        href={href}
        onClick={onClick}
      >
        {title}
      </Link>
    </li>
  );
};

interface FooterSectionHeader {
  title: string;
}

const FooterSectionHeader: React.FC<FooterSectionHeader> = ({ title }) => {
  return <h4 className="text-white uppercase tracking-widest">{title}</h4>;
};

const Footer = () => {
  const isFetching = Boolean(useIsFetching());

  const { data: sections = defaultSections } = useGetItems<Section>("/section");
  const { data: categories = defaultProjectCategories } =
    useGetItems<DefaultItem>("/project-category");

  const { data: footerNavLinks = defaultFooterNavLinks } =
    useGetItems<NavLink>("/navlink/footer");
  const { data: socialLinks = defaultSocialLinks } =
    useGetItems<DefaultLinkItem>("/social");
  const { data: contactInfo = defaultContactInfo } =
    useGetItems<ContactInfo>("/contact");

  const groupedContactInfo = contactInfo.reduce(
    (prev: Record<ContactInfoType, ContactInfo[]>, curr: ContactInfo) => {
      prev[curr.type] = prev[curr.type] || [];
      prev[curr.type].push(curr);
      return prev;
    },
    {} as Record<ContactInfoType, ContactInfo[]>,
  );

  const footerSection =
    sections.find((s) => s.section === SiteSections.FOOTER) || ({} as Section);

  const footerNewsletterSection =
    sections.find((s) => s.section === SiteSections.FOOTER_NEWSLETTER) ||
    ({} as Section);

  const [fs, fnls] = [footerSection, footerNewsletterSection];

  return (
    <div className=" ">
      <footer className="w-full flex flex-col items-center gap-12 bg-black py-16 text-white/70 border-t border-white/20 ">
        {/* <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-gutter bg-blue-500"> */}
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 px-4">
          {/*  */}
          <div className="w-full sm:col-span-2 flex flex-col gap-6">
            <Link className="" href="/">
              <Image
                alt={fs?.images?.[0]?.description || "Cappa & D'Alberto"}
                className="h-10 w-52 object-contain"
                width={203}
                height={40}
                src={fs?.images?.[0]?.url || LOGO_URL}
              />
            </Link>
            <p className="font-body-md text-white/80 max-w-xs text-sm">
              {fs.content}
            </p>
            <div className="flex gap-4">
              {socialLinks?.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="w-10 h-10 shrink-0 flex justify-center items-center rounded-full border border-white/20 hover:bg-white/10 hover:text-white transition-all"
                >
                  <Icon name={s.title} />
                </Link>
              ))}
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col gap-4">
            <FooterSectionHeader title="Solutions" />
            <ul className="flex flex-col gap-2">
              {categories?.map((c) => (
                <FooterLinkItem
                  key={c.title}
                  title={c.title}
                  href={`/projects?category=${c.title}`}
                />
              ))}
            </ul>
          </div>
          {/*  */}
          <div className="flex flex-col gap-4">
            <FooterSectionHeader title="Company" />
            <ul className="flex flex-col gap-2">
              {footerNavLinks?.map((nl) => (
                <FooterLinkItem
                  key={nl.title + nl.href}
                  title={nl.title}
                  href={nl.href as string}
                />
              ))}
            </ul>
          </div>
          {/*  */}
          <div className="flex flex-col gap-4">
            <FooterSectionHeader title="Contact" />
            <ul className="flex flex-col gap-2">
              <li>
                {groupedContactInfo.address.map((a) => (
                  <Link
                    key={a.title}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.title)}`}
                    className="text-sm hover:text-white transition-all"
                  >
                    {a.title}
                  </Link>
                ))}
              </li>
              <li>
                {groupedContactInfo.phone.map((p) => (
                  <Link
                    key={p.title}
                    href={`tel:${p.title}`}
                    className="text-sm hover:text-white transition-all"
                  >
                    {p.title}
                  </Link>
                ))}
              </li>
              <li>
                {groupedContactInfo.email.map((e) => (
                  <Link
                    key={e.title}
                    href={`mailto:${e.title}`}
                    className="text-sm hover:text-white transition-all"
                  >
                    {e.title}
                  </Link>
                ))}
              </li>
            </ul>
          </div>
          {/*  */}
          <div className="flex flex-col gap-4">
            <FooterSectionHeader title="Newsletter" />
            <p className="text-sm">{fnls.content}</p>

            <NewsletterForm variant="footer" />
          </div>
        </div>
        {/*  */}
        <div className="w-full flex justify-center p-4 border-t border-white/10 text-center">
          <p className="container text-xs text-white/50">
            &copy; {new Date().getFullYear()} Cappa &amp; D'Alberto Ltd. All
            Rights Reserved. Built for Nigeria's Future
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
