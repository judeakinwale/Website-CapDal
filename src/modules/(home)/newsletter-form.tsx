"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCreateItem, useGetItems } from "@/hooks";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/form-fields";
import { useAuth } from "@/context/auth-context";
import { successAlert } from "@/utils";
import { SiteButton } from "@/components/common/site-button";
import { Input } from "@/components/ui/input";
import { cn } from "cn";
import { ArrowRight } from "lucide-react";
import { Section, SiteSections } from "@/types/section";
import { defaultSections } from "@/sample-data";

const newsletterSchema = z.object({
  email: z.string().min(3, "Email is Required"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

type NewsletterFormProps = {
  onSuccess?: () => void;
  variant?: "news" | "footer";
};

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  onSuccess,
  variant = "news",
}) => {
  // const { refetchUser } = useAuth();

  const { data: sections = defaultSections } = useGetItems<Section>("/section");

  const newsNewsletterSection =
    sections.find((s) => s.section === SiteSections.NEWS_NEWSLETTER) ||
    ({} as Section);

  const footerNewsletterSection =
    sections.find((s) => s.section === SiteSections.FOOTER_NEWSLETTER) ||
    ({} as Section);

  const [fns, nns] = [footerNewsletterSection, newsNewsletterSection];

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const { mutateAsync: newsletterAsync, isPending } = useCreateItem(
    `/newsletter`,
    false,
  );

  function handleSubmit(values: NewsletterFormValues) {
    newsletterAsync(values, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
        // refetchUser?.();
        successAlert("You have subscribed successfully!");
      },
    });
  }

  const footerForm = (
    <div className="relative flex">
      <input
        type="email"
        {...form.register("email")}
        name="email"
        className="w-full bg-white/10 p-3 text-white border-b border-white/30 focus:outline-none focus:bg-white/15 focus:border-white transition-colors text-sm placeholder:text-white/40"
        placeholder={fns.blurb || "Your Email"}
        required
      />
      <Button
        type="submit"
        className={
          "absolute right-0 h-full flex bg-transparent hover:bg-white/10 cursor-pointer"
        }
      >
        <ArrowRight />
      </Button>
    </div>
  );

  const newsForm = (
    <div className={cn("w-full grid grid-cols-1 gap-4")}>
      {/* <Input
          // control={form.control}
          {...form.register("email")}
          // label="Email"
          className="col-span-2 min-h-12 border-0 border-b outline-0 focus:border-0 focus:border-b-primary focus:outline-0 focus:ring-0 active:border-0 active:border-b-primary active:outline-0 active:ring-0 focus-within:border-b-primary"
          name="email"
          placeholder="Email"
          required
        /> */}
      <input
        type="email"
        {...form.register("email")}
        name="email"
        className="p-3 text-sm border-b  border-white/30 ring-0 focus:ring-0 focus:outline-none focus:bg-white/5 focus:border-white transition-all"
        placeholder={nns.blurb || "Your Email"}
        required
      />
      <SiteButton
        variant="dark"
        type="submit"
        className="bg-primary"
        disabled={isPending}
        loading={isPending}
      >
        {nns.links?.[0].title || "Subscribe"}
      </SiteButton>
    </div>
  );

  return (
    // <Form {...form}>
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-4"
    >
      {variant === "news" ? newsForm : footerForm}
    </form>
    // </Form>
  );
};

export default NewsletterForm;
