"use client";
import SimpleDirectorCard from "@/components/common/card/simple-director-card";
import SimpleIdentityCard from "@/components/common/card/simple-identity-card";
import SimpleProjectCard from "@/components/common/card/simple-project-card";
import SimpleTimelineCard from "@/components/common/card/simple-timeline-card";
import Hero from "@/components/common/hero";
import { SiteButton } from "@/components/common/site-button";
import { SplitTitle } from "@/components/common/text/split-title";
import { InputField } from "@/components/ui/form-fields";
import { useCreateItem, useGetItems } from "@/lib/reactQuery/api";
import {
  defaultCertificates,
  defaultContactInfo,
  defaultDirectors,
  defaultIdentity,
  defaultProjectCategories,
  // defaultContact,
  defaultSections,
  defaultSocialLinks,
  defaultStats,
  defaultTimelines,
} from "@/sample-data";
import { Certificate } from "@/types/certificate";
import { Director } from "@/types/director";
import { Identity } from "@/types/identity";
import { Project, ProjectCategory } from "@/types/project";
import { Section, SiteSections } from "@/types/section";
import { Stat } from "@/types/stat";
import { Timeline } from "@/types/timeline";
import { useIsFetching } from "@tanstack/react-query";
import { cn } from "cn";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactInfo, ContactInfoType } from "@/types/contact";
import Link from "next/link";
import { Icon } from "@/components/common/icon";
import { DefaultLinkItem } from "@/types/default";
import { Inquiry } from "@/types/inquiry";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const isFetching = Boolean(useIsFetching());

  const { data: sections = defaultSections } = useGetItems<Section>("/section");

  const { data: stats = defaultStats } = useGetItems<Stat>("/stat");
  const { data: socialLinks = defaultSocialLinks } =
    useGetItems<DefaultLinkItem>("/social");
  const { data: contactInfo = defaultContactInfo } =
    useGetItems<ContactInfo>("/contact");

  const {
    mutateAsync: createInquiry,
    reset,
    isPending,
  } = useCreateItem<Inquiry>("/inquiry");

  const {
    control,
    // register,
    handleSubmit,
    // setValue,
    // watch,
    // getValues,
    // reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const groupedContactInfo = contactInfo.reduce(
    (prev: Record<ContactInfoType, ContactInfo[]>, curr: ContactInfo) => {
      prev[curr.type] = prev[curr.type] || [];
      prev[curr.type].push(curr);
      return prev;
    },
    {} as Record<ContactInfoType, ContactInfo[]>,
  );

  const mainAddress = groupedContactInfo["address"]?.[0]?.title;

  const contactHeadquartersSection =
    sections.find((s) => s.section === SiteSections.CONTACT_HEADQUARTERS) ||
    ({} as Section);

  const contactFormSection =
    sections.find((s) => s.section === SiteSections.CONTACT_FORM) ||
    ({} as Section);

  const contactHeroSection =
    sections.find((s) => s.section === SiteSections.CONTACT_HERO) ||
    ({} as Section);

  const [chqs, cfs, chs] = [
    contactHeadquartersSection,
    contactFormSection,
    contactHeroSection,
  ];

  const onSubmit = (values: FormValues) => {
    console.log({ values, errors });
    createInquiry(values);
  };

  return (
    <div className="">
      <div className="flex flex-col gap-0">
        {/* hero */}
        <div className="w-screen h-[50vh] flex justify-center bg-primary/30 text-white overflow-hidden">
          <div className="w-full flex flex-col gap-12">
            <Hero
              images={chs?.images!}
              title={chs?.title}
              blurb={<span className="text-primary">{chs?.blurb}</span>}
              subTitle={chs?.subTitle}
              ctaLinks={chs?.links}
              cta={<div className="w-1/5 min-w-40 h-1 bg-primary"></div>}
            />
          </div>
        </div>
        {/* hero */}

        {/* contact form */}
        <div
          id="contact-form"
          className="flex justify-center bg-white py-16 text-black/80 overflow-hidden"
        >
          <div className="container grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 bg-primary/0">
            {/* form */}
            <div className="lg:col-span-8 w-full flex flex-col gap-8 bg-white p-4 lg:p-8 border">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-12"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-4xl font-bold">{cfs?.title}</h3>
                  <h6 className="text-black/50 text-xs font-semibold uppercase tracking-widest">
                    {cfs?.content}
                  </h6>
                </div>

                <div className="w-full grid grid-cols-2 gap-4">
                  <InputField
                    control={control}
                    label="Name"
                    className="col-span-2"
                    name="name"
                    placeholder="Name"
                    required
                  />
                  <InputField
                    control={control}
                    label="Email"
                    className="col-span-2 md:col-span-1"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <InputField
                    control={control}
                    label="Phone"
                    className="col-span-2 md:col-span-1"
                    name="phone"
                    placeholder="Phone"
                  />
                  <InputField
                    control={control}
                    label="Subject"
                    className="col-span-2"
                    name="subject"
                    placeholder="Project Inquiry / General Consultation"
                    required
                  />
                  <InputField
                    control={control}
                    label="Message"
                    className="col-span-2"
                    name="message"
                    type="textarea"
                    placeholder="Message"
                    required
                  />
                </div>

                <SiteButton
                  variant="slide"
                  className="w-fit"
                  type="submit"
                  disabled={isPending}
                  loading={isPending}
                >
                  Submit Inquiry
                </SiteButton>
              </form>
            </div>
            {/* form */}

            {/* headquarters */}
            <div className="lg:col-span-4 w-full flex flex-col gap-8">
              <div className="flex flex-col gap-12 bg-dark-tertiary p-4 lg:p-8 text-white/80">
                <div className="flex flex-col gap-4 text-white">
                  <h4 className="text-3xl font-bold">{chqs?.title}</h4>
                  {/* <h6 className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                  {chqs?.content}
                </h6> */}
                </div>

                {/* contact info */}
                <ul className="flex flex-col gap-8">
                  <li>
                    <div className="w-full flex items-center gap-4 text-primary">
                      <div className="flex justify-center items-center p-2">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className="w-full flex flex-col gap-2">
                        <div className="text-xs font-bold uppercase">
                          {"Address"}
                        </div>
                        <div className="flex flex-col gap-2 text-white/80">
                          {groupedContactInfo.address.map((a) => (
                            <Link
                              key={a.title}
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.title)}`}
                              className="text-sm hover:text-white transition-all"
                            >
                              {a.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="w-full flex items-center gap-4 text-primary">
                      <div className="flex justify-center items-center p-2">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div className="w-full flex flex-col gap-2">
                        <div className="text-xs font-bold uppercase">
                          {"Phone"}
                        </div>
                        <div className="flex flex-col gap-2 text-white/80">
                          {groupedContactInfo.phone.map((p) => (
                            <Link
                              key={p.title}
                              href={`tel:${p.title}`}
                              className="text-sm hover:text-white transition-all"
                            >
                              {p.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="w-full flex items-center gap-4 text-primary">
                      <div className="flex justify-center items-center p-2">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div className="w-full flex flex-col gap-2">
                        <div className="text-xs font-bold uppercase">
                          {"Email"}
                        </div>
                        <div className="flex flex-col gap-2 text-white/80">
                          {groupedContactInfo.email.map((e) => (
                            <Link
                              key={e.title}
                              href={`mailto:${e.title}`}
                              className="text-sm hover:text-white transition-all"
                            >
                              {e.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                {/* contact info */}

                <div className="w-full h-px bg-white/50"></div>

                <div className="w-full flex flex-col gap-4">
                  <div className="text-xs text-primary font-bold uppercase">
                    {chqs?.subTitle}
                  </div>

                  <div className="flex items-center gap-4">
                    {socialLinks?.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="w-10 h-10 shrink-0 flex justify-center items-center rounded-full border border-white/20 hover:bg-primary/90 hover:text-white transition-all"
                      >
                        <Icon name={s.title} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-full">
                <img
                  alt={chqs?.images?.[0]?.description}
                  src={chqs?.images?.[0]?.url}
                  className="w-full max-h-16 object-cover bg-black/10"
                />
              </div>
            </div>
            {/* headquarters */}
          </div>
        </div>
        {/* contact form */}

        {/* address maps */}
        <div
          id="address-maps"
          className="flex justify-center bg-primary text-white/80 overflow-hidden"
        >
          <div className="w-full h-125 flex flex-col md:flex-row justify-between items-center gap-8 text-center cursor-default">
            {mainAddress && (
              <iframe
                // width="450"
                // height="250"
                // frameBorder="0"
                className="w-full h-full"
                referrerPolicy="strict-origin-when-cross-origin"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&api=1&q=${encodeURIComponent(mainAddress)}`}
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
        {/* address maps */}
      </div>
    </div>
  );
};

export default Contact;
