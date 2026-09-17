import { Certificate } from "@/types/certification";
import { ContactInfo, ContactInfoType } from "@/types/contact";
import { DefaultItem, DefaultLinkItem } from "@/types/default";
import { Director } from "@/types/director";
import { NavLink, SocialLink } from "@/types/links";
import { Identity, IdentityType } from "@/types/identity";
import { News } from "@/types/news";
import { Project, ProjectCategory } from "@/types/project";
import { Section, SiteSections } from "@/types/section";
import { Service } from "@/types/service";
import { Stat } from "@/types/stat";
import { Timeline } from "@/types/timeline";
import { Role, RoleType } from "@/types/role";

export const defaultNavLinks: NavLink[] = [
  { title: "Home", href: "/", order: 1 },
  { title: "About Us", href: "/about", order: 1 },
  { title: "Services", href: "/services", order: 1 },
  {
    title: "Projects",
    href: "/projects",
    order: 1,
    // subLinks: [
    //   {
    //     title: "Project 1",
    //     href: "/projects/project-1",
    //     description: "Project 1 Description for display",
    //   },
    //   {
    //     title: "Project 2",
    //     href: "/projects/project-2",
    //     description: "Project 2 Description for display",
    //   },
    //   {
    //     title: "Project 3",
    //     href: "/projects/project-3",
    //     description: "Project 3 Description for display",
    //   },
    //   {
    //     title: "Project 4",
    //     href: "/projects/project-4",
    //     description: "Project 4 Description for display",
    //   },
    // ],
  },
];

export const defaultFooterNavLinks: NavLink[] = [
  { title: "About Us", href: "/about", order: 1 },
  { title: "Services", href: "/services", order: 1 },
  { title: "Projects", href: "/projects", order: 1 },
  { title: "Careers", href: "/careers", order: 1 },
  { title: "News/Media", href: "/news", order: 1 },
  { title: "Contact Us", href: "/contact", order: 1 },
];

export const defaultProjectCategories: ProjectCategory[] = [
  { title: "Infrastructure" },
  { title: "Residential" },
  { title: "Commercial" },
  { title: "Industrial" },
];

export const defaultSocialLinks: SocialLink[] = [
  { title: "FaGlobeAfrica", href: "https://www.capdal.com" },
  {
    title: "FaLinkedin",
    href: "https://www.linkedin.com/company/cappa-and-d'alberto-plc/about/",
  },
  { title: "FaInstagram", href: "https://www.instagram.com/cappaanddalberto/" },
];

export const defaultContactInfo: ContactInfo[] = [
  { type: ContactInfoType.ADDRESS, title: "72 Campbell Street, Lagos Island" },
  { type: ContactInfoType.PHONE, title: "+234 (0)902 322 0000" },
  { type: ContactInfoType.EMAIL, title: "capdal@capdal.com" }, // info@capdal.com
];

export const defaultNews: News[] = [
  {
    title:
      "Innovating the Skyline: Cappa & D'Alberto's Approach to Sustainable Skyscraper Design",
    tag: "Corporate",
    publishedAt: "April 12, 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2ZC8m8aZYLhHdIu3UfKY9bRQRSO1aY7pn_QgRXiDYMvm_9wGRSGtmczwLp8DzIEx99zA9WLrPxPFkG55UqATWRFKGLdI8M4tSrSI3xasTEdOumZKy5mmDwEa17mK6H53EIM955JLtCzDG0EFjDF1qlCm9KD_3UBkKyGW_dEZ8YPO7mhh86nj7KcukTRuINSdKeZIZGXW65MUph8I6Og4HJvAQkD_Y0Jbx2eb1ctPIuSX4V3ghBH_zZFoY97f8ztPeRd8X0h0IU-nX",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi consequuntur ducimus voluptatem tempore blanditiis excepturi fuga quisquam accusamus corporis reprehenderit!",
  },
  {
    title:
      "The Future of Infrastructure: Integrating MEP Systems in Mega-Scale Projects",
    tag: "Engineering",
    publishedAt: "March 28, 2024",
    image: "/images/bld-afrexim.png",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi consequuntur ducimus voluptatem tempore blanditiis excepturi fuga quisquam accusamus corporis reprehenderit!",
  },
  {
    title:
      "Restoring a Legend: Inside the Multi-Phase Revitalization of the National Theatre",
    tag: "Awards",
    publishedAt: "March 05, 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9QGdopFOgSQEvlbztKXZufNTmia_5MGQTmKgzkjGN5UTKeEPuKZqYaKOltlkSjRKftbuqe0tsaKzawX6Lg5_RkIZGEc8rIO4o66eLZsQqSEe4ttUC1i0adNAanCRYb8dM30ytBlolSvLUduRlo2Xo_aSK6vJcq9DJ7ry_Bv_81wW6D1Iz-6KRNBuhNrg8m57N9n7RVLOc_nNIPuqtowpSS5If3nPDvl8sodOda8pzA3pERZ_gaK2uk4k_ov5yBldjl14FHM3HBgFT",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi consequuntur ducimus voluptatem tempore blanditiis excepturi fuga quisquam accusamus corporis reprehenderit!",
  },
];

export const defaultProjects: Project[] = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWaUJ-T4AyB-25Kg5zxy0vJUSGwDoQ8sAUAnhj8NHHwyEA9evzeqasc8Z4A3x0qW1CMLXoMESRaddjLU3lkKWYCponjnBTCA0Ms_YV-UYVgYbLcQgWW_ndLc8xD8avvBvk50DoM7WEmyxQDZ0Gq_MGc933y08LrROEY-tu-O2nCChoEtV47AsJP6w9Ouj9IvjD0TwqyxzmsjdVHrhvnTFcDDiH-YasSAQYpU2Tvp8CjNTtGze-pvuNwE6KFmr2lQeix09mh2_ncUJG",
    category: "Commercial",
    blurb: "Hospitality",
    title: "Dover Hotel Annex",
    description:
      "An architectural gem blending luxury hospitality with structural precision in the heart of Lagos.",
    isFeatured: true,
    completedAt: "2024",
    location: "Lagos, Abuja",
  },
  {
    image: "/images/bld-afrexim.png",
    category: "Commercial",
    blurb: "Financial Hub",
    title: "Afrexim Tower",
    isFeatured: true,
    completedAt: "2024",
    location: "Lagos, Abuja",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbxKf2-hS66G9TwTCi3x7hd69HDW_1_-pZg0-7NOlrrZQ0PwRmaXjWavLYBaz3DX6Brw9vZsdLfTbryaFjK3OzyHVOPZCp7BQlTwkLBHDt8qyY0MpgESKjiN4H5qzSlFXNVOlmB_RQwLXhc3loEz95TCmXzCHq0y76SzKUyIdzsTmm8P0jSDge1sKoDuwOvtTsRwumKnG8JA9iqiNubzy6y0Ix07OPdI1uyqbmiea2cKVo-Ce8QY0af0EACIG5s_j1-2NUQVS5Mwpw",
    category: "Commercial",
    blurb: "Healthcare",
    title: "AMCE Medical Complex",
    isFeatured: true,
    completedAt: "2024",
    location: "Lagos, Abuja",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQB9vXayarrCDzE8-T_RBGRMBywMbVv10iIv7Fhui3I_ZXJNkXWExijfmmo-A8fVRWJXYpbaYrB5enlgTynb2pRwPtT5S_IpE_1f4CK5srvkEYT_xvzms8eOCZgsxh1RgXTS7aCKWnr7zu1nw7a2TGwuj06HWb3XmWTrl7av0TjaYBa_oKNu9jnsIOOGX_TeuzOmycObMM8ydwYuMz0D7w7tcO10HEV9198etKpO_Ughae5Eo2-Rf7jIeyux87O_o5CHMvnMM3L_65",
    category: "Infrastructure",
    blurb: "National Monument",
    title: "National Theatre",
    description:
      "Restoring an icon: A comprehensive technical restoration of one of Africa's most significant cultural landmarks.",
    isFeatured: true,
    completedAt: "2024",
    location: "Lagos, Abuja",
  },
  // --------------------------------------------------------------------------------------------
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_HEEHy6iR05p2zucH04L3V412-IzYhbvorZ2MVqeFdCl73MNTXF0FbGutYswpRp2z15fMemso55-UPjoZFWWZbTfkIDSWiCVCjvkAiuSu_kPB7CKsIMdJP9lF7pUsmysqQ8VEZHrOpHdaf0oqm3aHvNtvZmoEE3y0ia_v6WLvFQ_xq9A9ZOtZ-3EWO9tmvrA0aePgkyOyKDnkwguw54R28Km6mgzabcx3pkGpUA9UyMWk3uuso20J_hj-cnS9lW2LN7ELuO4KLSHJ",
    category: "Commercial",
    blurb: "National Monument",
    title: "The Wings Towers",
    completedAt: "2017",
    location: "Victoria Island, Lagos",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA89Pt8MoDMPO6lPntW2y-LZrqym6uv-0EnGBc-qw5wJUVcLc4I_1TmpZrGPdixZXsqHAHogEJbmZplRBGaly-lqTKpdMFi6h95X4SGvc4rvQDqJy9dnqEYyQTJxbtLNNDI42x2Y07e-43VNp9CxUE84NI_iVJYvcTA-vaBRwRiQ8YIZFOx1_jrnA--K92CbghdJHTf9cSV1dLx46x3E6Hhcj1mn7W7xW4ShG0IcNjEPpSTFYSmX4fZbjsu7tiiNIGF2uzWFGnnLoHP",
    category: "Commercial",
    blurb: "National Monument",
    title: "Dover Towers",
    completedAt: "2021",
    location: "Ikoyi, Lagos",
  },
  {
    image: "images/imgi_17_pr-seac.jpg",
    category: "Residential",
    blurb: "National Monument",
    title: "Seac Building",
    completedAt: "2019",
    location: "Marina, Lagos",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXLrBW3wnT3vXxFNH9OZhDJVRtW0EA0FGAcopqA7RCW3eld9kDauC3NPKjDETjBoAQpWnP2wXvjmSIDzlGJkI1NKfU0zXp6qsUre_elRXA_cOwpE9I54g9jp2BF72aY6UtyqFEkB_Ip-MePUlrGqYvSdrBO_7s6i3HTgmgBRdXMEHWfnFI7bQKaeBQgxRW-Arnv541b07iGxyYpvTuAsejXK1s1rd_oJzuXw1xm0tHnWWI6ElE4W3R8KJUCIyOM5cFJISPqSHnp5sr",
    category: "Infrastructure",
    blurb: "National Monument",
    title: "Coastal Link Expressway",
    completedAt: "2023",
    location: "Lagos State",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPjHIhAxgQHRpPckYE0mL6PRH55EuhbFYTDcLGGYDYK8SAL5N7uNbg9daU6Cd_GtMeieWZQQDYsdKTgOWfBStl7ps40eQVfUVtpBxepqS32UceFtt7XnqTFQLdRCzYOflXuDjhI3o27LkUW1q_MP6Z_g9X_OgVgUHgK6za_M7aCJ8fpDXBiTtakKP-2dl-8MPFt2qM8C7iDx0Smnou0O0kYcpn8aRLZA9WSdW-3D6QpOTLB5R5cyl8NhKuYGAf9Q8YEWo1N6-aa-e3",
    category: "Industrial",
    blurb: "National Monument",
    title: "Epe Manufacturing Hub",
    completedAt: "2022",
    location: "Epe, Lagos",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZv1ma9olQ1JWc3oxVQE-HtTSc-xnNW6KzrdZfI3xGfXTQI81CrpTSrU6LiipzcUoTNdvT-hmYodmmJKiNY2GHzmvIQCny4Fi0aq2EJ-FGrgrAVUhPBDAoNL1PIVzuDePnP_xuCPSm7FrOBhHl-WeTzp5PbpBhdvXlAjZH6Pmn3Eui3S9KDHijkGc9EXF5Xn1KWCLXwkQJd4MT3PR-m2SS8HyOM6L6y2v-bJj_xkMH8l_XA--vo2f0wBO3GYsLx5FpFNlvOLbTbmcz",
    category: "Commercial",
    blurb: "National Monument",
    title: "Innovation Center",
    completedAt: "2020",
    location: "Abuja, FCT",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAIeX8kDykxfygmH0x_vHw16giNtX4svXc2a2ATkxqKbfWcnPC8o6gDhLKH5LE8AI7gZQ4izkwQRMdb56EjqritZohvleBQRaH98Bqs-8-fR73AvCnnRSU2BqZ0ISzQv-NWGLZZ7zpI2JVELr9g3HlxanFhdRuWvfYW7FkQ1LfQjHsQrRLtPC78J-3ejKKdC_RSGGzQPPFzKR6zVTHrvoFG9rFruAhkhJSxhxXVwhhmbFQub_vWgf0R2lBJM7G6sYPxFqFAeeKiObE",
    category: "Commercial",
    blurb: "National Monument",
    title: "Metropolitan Plaza",
    completedAt: "2018",
    location: "Lagos Island",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDDvYoR-rLstHeDtt4BAtuXtQ9hokeTL7KMRbFka5X07NBtFp1HPvKkZCDTxN42SMNSspi_hEDt8vaaNmkjz6EGwyYh4LdyafPFjlKBoszB7is4JgquFs8DvDv2OG9OqScvCDy1qJPsvjQT9zr_4RfUW4BUWQX_okoMW9pvY_oPe6lseO4t8xu3v3nr99RRY_ntwMGXluEn9ZHx7ilpBqR9uF0wPcPE43FnFBNZiMeUGlc2nTTm9FjjamaFhRSkHYIGHeSOwo-cilkt",
    category: "Residential",
    blurb: "National Monument",
    title: "Crystal Villas",
    completedAt: "2022",
    location: "Banana Island, Lagos",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFcWtJjHEA1nwoa1m8lhmxMN0cE8eU1AYsrh16OYaOEOQFGkAwJKOb9JmXrPfUCkWBXOkdoblKZmEeExxb_rKgAD2IMbbcY8bFGLntkBpk-ZHic8szs-DmEtXGUmvMZg1yGWihWyaGCd0l_ybPvbwC32aSHvjNyarbOnrUegX5U97sIaFtqPYBZJgAJNw34uEQ-r113pAVJ-6RiGgj7HnH7qQsx0FEJQTJE7G7_teJFKUaUSAmH-KieYHIfLiZCA5Psq8Ffzs-H0NJ",
    category: "Infrastructure",
    blurb: "National Monument",
    title: "Mainland Overpass",
    completedAt: "2024",
    location: "Surulere, Lagos",
  },
];

export const defaultCoreServices: Service[] = [
  {
    title: "Civil Engineering",
    image: "/images/bld-national-theatre.jpg",
    description: "Complex structural systems and infrastructure development.",
    blurb:
      "Leveraging decades of expertise to deliver robust foundations and heavy civil structures that define modern Nigeria.",
    isCore: true,
  },
  {
    title: "General Construction",
    image: "/images/hero-services.jpg",
    description:
      "Turnkey solutions for residential, commercial, and industrial hubs.",
    blurb:
      "Seamless delivery from ground-breaking to handover, ensuring the highest standards of architectural integrity.",
    isCore: true,
  },
  {
    title: "Project Management",
    image: "/images/bld-wings.jpg",
    description:
      "Rigorous oversight and technical precision for large-scale assets.",
    blurb:
      "Global best practices in project lifecycle management to ensure timeline adherence and cost efficiency.",
    isCore: true,
  },
  {
    title: "Interior Fit-out",
    image: "/images/bld-the-citadel.jpg",
    description: "High-end finishing and interior spatial engineering.",
    blurb:
      "Bespoke interiors that mirror the external grandeur, utilizing premium materials and meticulous craftsmanship.",
    isCore: true,
  },
  {
    title: "MEP Systems",
    image: "/images/bld-amce.png",
    description: "Integrated mechanical, electrical, and plumbing solutions.",
    blurb:
      "Smart building systems integrated seamlessly for optimal operational efficiency and sustainability.",
    isCore: true,
  },
  {
    title: "Heritage Restoration",
    image: "/images/bld-tcc.jpg",
    description:
      "Preserving Nigeria's architectural legacy through expert restoration.",
    blurb:
      "Combining historical research with modern engineering techniques to restore and preserve iconic structures for future generations.",
    isCore: true,
  },
];

export const defaultServices: Service[] = [...defaultCoreServices];

export const defaultStats: Stat[] = [
  { title: "Years of Excellence", value: "90+" },
  { title: "Projects Delivered", value: "500+" },
  { title: "Professionals", value: "1,000+" },
  { title: "States in Nigeria ", value: "36" },
];

// TODO: replace image and alt image with an array of SectionImage each with url and description (specifically for hero images)
// TODO: do the same for links
export const defaultSections: Section[] = [
  {
    title: "Who We Are",
    section: SiteSections.WHO_WE_ARE,
    subTitle:
      "Cappa & D'Alberto PLC is Nigeria's foremost building and civil engineering firm. For over 90 years, we have shaped the skyline of major Nigerian cities, delivering landmark infrastructure that stands the test of time. ",
    content:
      "Our commitment to quality, precision, and institutional reliability has made us the trusted partner for the nation's most ambitious architectural visions. From the historic National Theatre to the contemporary Wings Office Complex, our legacy is etched in the very fabric of Nigeria. ",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEO6bBI0WBF5zeRpvX2nJqEhcCYOcyJwUadyDEKmA97nBsMZS_pQp0VB1KHMirgyXYW-i3JBXTPonc5EHbe1G80gj0EAH2HXnIbObUqgbW1DXa2Yltpzz-J5t86HOZYl72Lt_DTTO4q2UZwyu1SprcH7s0CNrL8dSuBRhV3P-UFxGjtn0N6eYYfPdtU_FIht7R51pNeyTXTefr43EfFixX8qVRFN0SRpo71zfBz-xlnA-QpdfAejpf2MHghJqBjOuVTEWNoQCww1av",
        description: "Wings Office Complex",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQchkQH7MxNj5bF0bV-mSIBMbZ-WRSqXDsPhCAFSvZOfCy0AmtGf8E26b32X062TZKmj3RgL5a0oKccuYw7pSHqGgsrgFdTKESEgtaclYcMQ3xs5L9c2llDvAQMK4ZjMmOimlcBoYTCiFvuMzyD_Ca4rrl6NEF8DM8i31QzxvbbrcWwaiDN69gp1lzf-5Ak2xoLyNjOrPuB6mxt3q_8Ag4drmAmv2-ggNx5PQX0QNcvTxlNE6z0AIYdgwNNDupw9hF6SqRsbL970sy",
        description: "Architectural details",
      },
    ],
    links: [
      {
        title: "Learn More About Our History",
        url: "/about",
      },
    ],
  },
  {
    title: "Core Services",
    section: SiteSections.HOME_SERVICES,
    subTitle: "Excellence in Action ",
    content: "",
  },
  {
    title: "Iconic Landmarks",
    section: SiteSections.HOME_LANDMARKS,
    subTitle: "Our Legacy",
    content: "",
    links: [{ title: "View Portfolio", url: "/projects" }],
  },
  {
    title: "Latest From the Field",
    section: SiteSections.HOME_INSIGHTS,
    subTitle: "Insights",
  },
  {
    title: "Start Your Project With Nigeria's Most Trusted Builder",
    section: SiteSections.HOME_CTA,
    content:
      "From pioneering blueprints to landmark infrastructure, we bring nearly a century of reliability to your vision. ",
    links: [{ title: "Get in Touch", url: "/contact" }],
  },
  {
    title: "Builders to the Nation, Since 1932",
    section: SiteSections.HOME_HERO,
    subTitle: "Excellence in Engineering and Construction for nearly a Century",
    images: [
      { url: "/images/hero-home-1.jpg" },
      { url: "/images/hero-home-2.jpg" },
      { url: "/images/hero-home-3.jpg" },
    ],
    links: [
      { title: "Explore Our Work", url: "#our-legacy" },
      { title: "Our Heritage", url: "#who-we-are" },
    ],
  },
  // ------------------------------------------------------------------------
  {
    section: SiteSections.ABOUT_FOUNDERS,
    subTitle: "",
    title: "Pietro Cappa & Virginio D'Alberto",
    content:
      "In 1932, two visionary Italian engineers arrived on the shores of Lagos with a singular mission: to redefine the skyline of West Africa. Pietro Cappa and Virginio D'Alberto brought with them an uncompromising standard of European craftsmanship and a deep respect for local collaboration. ",
    blurb:
      "'Our buildings are not just structures; they are monuments to the enduring spirit of partnership and technical perfection.' — Virginio D'Alberto",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd7SUy5Gzf6rxiXz8qR76Qt9xbnIrfqJdrMwO_F5W6EXDzf1EU_Ryg22IpgRbX-5EbQQVQ92Snsws_2EvzoudzaUAApphD3kRdB-Tmw3za8q0BTp0tA5cQXoiZENDPNJaKWEO2v1oetJH-3WF1CQs0ha2XAGf0qnernKPPwcfqOElukyHbuV2XJhvP3msBtWwaoSYLeh8PyLWAFMSCEbzErPfBSn2__1jFWyDdvcxrQT9_UcnA5pCiQ2w_gw_OkisOPndcNpjGUD6A",
        description:
          "A vintage, sepia-toned archival photograph depicting two sophisticated European men in 1930s formal attire standing before a drafting table.",
      },
    ],
    bulletPoints: [
      {
        title: "1932",
        description: "The Foundation Year",
      },
      {
        title: "100+",
        description: "Landmark Projects",
      },
      {
        title: "4th",
        description: "Gen Leadership",
      },
    ],
  },
  {
    title: "Our Timeline",
    section: SiteSections.ABOUT_TIMELINE,
    content: "",
  },
  {
    title: "Board of Directors",
    subTitle:
      "Guided by a diverse board of industry veterans and strategic thinkers.",
    section: SiteSections.ABOUT_DIRECTORS,
    content: "",
  },
  {
    title: "Certified & Affiliated With",
    section: SiteSections.ABOUT_CERTIFICATES,
    content: "",
  },
  {
    blurb: "Since 1932",
    title: "90+ Years of Engineering Heritage ",
    section: SiteSections.ABOUT_HERO,
    subTitle:
      "Building the foundations of modern Nigeria through technical excellence, integrity, and a century of collective wisdom. ",
    images: [{ url: "/images/hero-about.jpg" }],
    links: [{ title: "Explore Our Journey", url: "#timeline" }],
  },
  // ------------------------------------------------------------------------
  {
    title: "End-to-End Construction Excellence",
    section: SiteSections.SERVICES_HERO,
    subTitle:
      "A century of unparalleled craftsmanship, delivering Nigeria's most iconic infrastructure and architectural landmarks through precision engineering.",
    blurb: "Building the Nation's Future",
    images: [{ url: "/images/hero-services.jpg" }],
    links: [
      { title: "Explore Our Services", url: "#services" },
      { title: "Our History", url: "/about" },
    ],
  },
  {
    title: "Ready to Build Your Vision?",
    section: SiteSections.SERVICES_CTA,
    content:
      "Contact our expert team today to discuss your next landmark project and experience the Cappa & D'Alberto standard.",
    links: [{ title: "Start a Consultation", url: "/contact" }],
  },
  // ------------------------------------------------------------------------
  {
    title: "Engineering Nigeria's Future",
    section: SiteSections.PROJECTS_HERO,
    subTitle: "",
    blurb: "Our Portfolio",
    images: [{ url: "/images/bld-heirs-towers.jpg" }],
  },
  {
    title: "Iconic, Landmarks",
    section: SiteSections.PROJECTS_PROJECTS,
    links: [{ title: "Discover More Projects", url: "" }],
  },
  // ------------------------------------------------------------------------
  {
    title: " Get in Touch ",
    section: SiteSections.CONTACT_HERO,
    blurb: "Established 1932",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKkVoko18enW3fGKOg49fIZRZ0Sn66jsTdbu13h_eWvDZ2zYViCo25QoBz_KZUTaSB14PoWP3yBmrNyoJtRKswpt2X9NYkZc-ZtoBj3p06aXU8bXLYbkadFnST8LnCzmYyb1rvpD2OhpZGnZKQAIVUshEzdDU_qjyYFsa3p_NCTpM3bKPCd30fYovvrak3-jxGwn-poJ6rDZU5o8noslxa2ebyrYO9SSZZk_1KgqyUMt-6JOVorKbS7ezltIWaRWyrWKhTr2wGGGNb",
      },
    ],
  },
  {
    title: "Inquiry Form",
    section: SiteSections.CONTACT_FORM,
    content:
      "Whether you have a project in mind or wish to learn more about our engineering capabilities, our team is ready to assist.",
    links: [{ title: "Submit Inquiry", url: "" }],
  },
  {
    title: "Our Headquarters",
    section: SiteSections.CONTACT_HEADQUARTERS,
    images: [
      {
        description: "Headquarters Image",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA79S6A59ewjGlxTheHgybF6KDWzDoUYA8ysFRr4WwC2CJZCaYZqydf8tFfeDJsUI0KgX1tPguSB2cNPZuuJOPB4OX9QwxhANV_OuO_tqvxct-EQILXxfbzpGXV_h2NqqnY3iwWlKR-1yaMoVuWfEAabiOnKkuMgWFgY9NyxlFMEgw7ZRaSH4DiBPxjWpVI0V0CrfAd4ItnS5qY7rrcsBhIzGQ1itC0TT1_Io9lg8TJDgLDchokzzQSbHBZhasQ0BhF30E7NVNHF-mN",
      },
    ],
    subTitle: "Follow Our Progress",
  },
  // ------------------------------------------------------------------------
  {
    title: "Build Your Legacy With Nigeria's Engineering Leader",
    section: SiteSections.CAREER_CULTURE,
    subTitle:
      "Join a 90-year tradition of excellence and shape the skyline of tomorrow. We are seeking visionaries to redefine the standards of modern construction.",
    content: "",
    images: [
      {
        description: "Culture Image",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1iO5qVArisQcqnob6yPB9IwKqPecv4dp_mDfG5fAyyxt-uNMv809aiqBt_yrncFunXqMUgcDhZGusROsJoIZerr_i1Qfd1ZKOkvBVlQcc1DfEf1wFV7QKaeZ9oji7EExaR_4TV0ZnV96SKF409we2AyWHV1RneWrzI7hL3iHbFI0R6IXb36Ge-29AS-yWcT4qeAB6iLbJN5UWP1GRaccEzpy4lm1-mG9r4H-CzTw7ZG9nEoOE_BDbYw89RqK6Lhc2Gc1ZSdgLIyhu",
      },
    ],
    links: [
      { title: "View Open Roles", url: "#carrer-roles" },
      { title: "Our Culture", url: "#carrer-culture" },
    ],
  },
  {
    title: "Professionalism, Mentorship, and Unrivaled Impact.",
    section: SiteSections.CAREER_CULTURE_QUOTE,
    subTitle: "Life At Capdal",
    content: "",
    bulletPoints: [
      {
        title: "Olumide A., Project Lead",
        description:
          "We don't just build structures; we build careers that last generations.",
      },
      {
        title: "Engineering Precision",
        icon: "MdOutlineArchitecture",
        description:
          "We uphold the highest standards of technical excellence, ensuring every project is a masterpiece of safety and innovation.",
      },
      {
        title: "Culture of Mentorship",
        icon: "MdGroups",
        description:
          "Learn from the masters of the industry. Our leadership is committed to nurturing the next generation of Nigerian engineers.",
      },
      {
        title: "Shaping Landmarks",
        icon: "MdOutlineLandscape",
        description:
          "Be part of the team that designs and builds the icons of our cities—from luxury residences to critical infrastructure.",
      },
    ],
  },
  {
    title: "Start Your Journey.",
    section: SiteSections.CAREER_ROLES,
    subTitle: "Opportunities",
    content: "Don't see a role that fits? Send us your portfolio.",
    links: [{ title: "General Application", url: "/careers/apply" }],
  },
  {
    title: "Ready to shape the future?",
    section: SiteSections.CAREER_CTA,
    content:
      "Join Cappa & D'Alberto and become part of a legacy that spans nearly a century of engineering brilliance in West Africa.",
    links: [{ title: "Explore Our Projects", url: "/projects" }],
  },
  {
    title: "Build Your Legacy With Nigeria's Engineering Leader",
    section: SiteSections.CAREER_HERO,
    subTitle:
      "Join a 90-year tradition of excellence and shape the skyline of tomorrow. We are seeking visionaries to redefine the standards of modern construction.",
    content: "",
    images: [
      {
        description: "Careers Hero Image",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDI9G6PmY2dnEVvSVMMNF_pADVyWUORFwlwpVeHEP05TsmFBsojJwbRBxSnzLpRGtRjtOSQKZpVZr2NXX6Ox_RDo6mKWZyMG7TAb4bHd5U-DcEID9TLfdk79P0yluMJ9KH2Lrkaxiwt3NtmA2kAJ5frdRXG6j397c4GCBN2aFKTqzXJF0juHKntH5sKs9BhECACng9iGFhpreIGNGm99mbjG_Z7gUML8CC1l-HqB9uSEC-izAk5nEqKk9SBRVqoBxOo1IZ0j7DlHBxc",
      },
    ],
    links: [
      { title: "View Open Roles", url: "#carrer-roles" },
      { title: "Our Culture", url: "#carrer-culture" },
    ],
  },
  // ------------------------------------------------------------------------
  {
    title: "News",
    section: SiteSections.NEWS_NEWS,
    content: "",
    links: [{ title: "Load Older Updates", url: "" }],
  },
  {
    title: "Media Inquiries",
    section: SiteSections.NEWS_MEDIA,
    content:
      "For press kits, high-resolution project imagery, or expert commentary on engineering trends, please reach out to our communications office.",
  },
  {
    title: "The Blueprint Monthly",
    section: SiteSections.NEWS_NEWSLETTER,
    content:
      "Stay informed with our monthly dispatch on infrastructure milestones and technical breakthroughs.",
    links: [{ title: "Subscribe", url: "" }],
  },
  {
    title: "News & Media",
    section: SiteSections.NEWS_HERO,
    subTitle:
      "Insights from the forefront of engineering excellence and architectural innovation since 1932.",
    content: "",
    images: [
      {
        description: "News & Media Hero Image",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuASxoIlclcp4Zu1KzE-nZi-SxMbEjMFMpRGcZc0ZRmzSosnXlXyizDTaBR4f55fzDx_QX2NZwIZZNo1j-_5lpMch-6cGc1QZFHPtbkpn69k2zveI4DH4_hgDjQXCsI0vyjh3NHt0tQ_tXiO9leLNVcv5TkmmpvUc2It40hkGKCqMY-F_NKwtO-AiAa7M46t4Rpd2Jx_aT9SRWdrjLfCDHC4Vt4AiG1-5WJ3OBMXy48c4gIYOTjktuaUw_4mpE55bg6lMGlKC1x_jYOQ",
      },
    ],
    links: [
      { title: "View Open Roles", url: "#carrer-roles" },
      { title: "Our Culture", url: "#carrer-culture" },
    ],
  },
];

export const defaultCertificates: Certificate[] = [
  {
    title: "ISO 9001 Certified",
    value:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMq5R8CziU0WKXl-SRdtVB6wmbU3q4ZijCfMnKLzofW9GR6QduzvYN9Iquk3Ht4I17_RwDfP7149mykZBRHIQqmQEPlXctMxj7tvuB0Rz9lZuaFMSOLJmE3G6DJ5KviBXpM4fr6FxUJ606ZGrel_w8OGGzeHWai2CMIng6_myWcN9ByyNWdDYVoCkt4SMktug-984KCD1smGcEXy8TPc_HXJLqxeokDEQbh6waPAFfEJmn7s-zNN5oJoLF_qwBj3451Yd2BbVxnwIv",
  },
  {
    title: "ISO 14001 Certified",
    value:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmWfZAPKTxKfsRnCoEYk1Puajkfd6Wzl_80HTma9V9UERdWZ8u8CT6xNzOAnqBTFleFKbXOaIpdz8j4lEam82Brq2f-Bem2_KY8uOoA1J8OesjFdGEPsDDJl6xwBTBQ7IBwFe0UddbWkXhP64HKVnKUiTsvATz_vH2_WEvZfaH8oBsv5kgP7vJ_65qTDbS2vaNzE5edG2WHUDCaQxl72NGq6TmUteoHLxT0sUOkXqbYpptCtaBviwgugKZY-N05aVJ2OroKnYGY-1h",
  },
  {
    title: "ISO 45001 Certified",
    value:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxnUlKsWNzjGZuI00qe5vS2ZXt2NUmrrdYL0XHYgfpak1FyjjfpqHvQhBNAf6msA26fRpVpG4wCeVlyAcgEmgWDKuLI2t1vMycH1iQcVB_frKYdqQ-9T-XeSwHDtSzvqwlyChtfkfuKmqhlQLm4S5q6mirip-Mhu4x6Fj7tY_jivbeAoX2O2tSnKwnK8khUdxCx-x1gF5AVTjD7LDtkPauXEbIHwlTj2cyqzH6mtju_zC1xlvvLZUzSRcQ1dkDGzchXYgU-0_B8IB_",
  },
];

export const defaultDirectors: Director[] = [
  {
    name: "Franco Gianotti",
    title: "Chairman",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwENkQ0HpRTgvTSSEvL90kiJqkr1DN_UPZBrRreWTCXYW3IMDqvM1QBg7SqLWajQi3nfI1mVN2MmrzIrCm0YriaUekFEs-rbRXVQdBMZOT_sLrSRWDVKyiqHoP8kJ8F4qKnesCjz-bWMc6aZM95J7CUTLGnpnBJTMRJnUrne3a2h0qcpH8c_zoHzu9LlA9hdQJiixknS5OPhcIlDdq4Gc6WP99OkJjx38kSrAjCuPZxP0qDHm1eQwWT5keECIgcH58YHGWvTIujkGh",
    summary:
      "With over 40 years of experience in structural engineering and strategic leadership.",
    // link: "",
  },
  {
    name: "Bruno Cappa",
    title: "Vice Chairman",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlGQjQK1VCazxhx_BH2MASJb02VJ1Vyk508EVCcXqxeqqUcbxf_8ERn5Io7VnfOQgd68L-gCMvaMTLzpQX4pZnGlmZxFenDWv9iXDqZSWvacJIOOh3JmEWdMRK77y0wX9yHHYyIkA9V_cbHwtJJvzcS58avVzeciccAseBCX5Y9YCal-gY7uolr1_wxcQLhIGllTLgW8IHzdxyD7H-ZD5PpVAWnqoB2_9otKUUore_iNWULTtHejW8mcuIejwUPlXCpP5URfVDPXHT",
    summary:
      "Pioneering sustainable development initiatives and large-scale project management.",
    // link: "",
  },
  {
    name: "Giovanni Mello Grand",
    title: "Managing Director",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7dyw1IkPGldaRo2oTzgKYGOn1L7tPGs3gQut2pfb-gfot4mHHBqHUA43k9wcE46yzaQaFUgnckidt1nsM1LHo7ZjlmaekZDcv_9VJxEMB02jqqjOZGl8MqyL8vHsXKGqJKwrxFZxjt1WEv_OK8izjn-c6CNkfu9_8JwQkIWwZdFqhYVTnu7cQyyoNjFOI3QJvxVwuIaD0w2I-MjeihYpDX5w3Hem7GRu6rQJ28VoYTrFKFEoWMRmKrHfkL2re9shF19tzEuAezsng",
    summary:
      "Overseeing complex logistics and field operations across our nationwide projects.",
    // link: "",
  },
  {
    name: "Engr. Adetokunbo Coker",
    title: "Non-Executive Director",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXFAJb7WfIFbDhfnJBD272Ruz_PkkgSXlWIISGhge0yCrD4LmXoNBYKl5XjjOMqojfi8FUjyfAOOQseDkmiSKGEYmjjd-g8KYjOb7Ip18AHaxnHhsOh7maFZQRAGbkm8JEhEyJ1ynM556iBKC9an8SRaXkCj6pzONwC-jml9x-24t-reW3p5jmMv98Mi9C1qFd-_gWu1rARGFIqONObXunlLNsoNnQ2XERfZth4IveiCm2Qfv4aH5eKM7nq6qudytB2MdgyK9So1oa",
    summary:
      "Specializing in project financing and fiscal strategy for infrastructure development.",
    // link: "",
  },
  {
    name: "Antonino Falduto",
    title: "Executive Director Finance",
    image: "/images/stf-antonino.jpg",
    summary:
      "Specializing in project financing and fiscal strategy for infrastructure development.",
    // link: "",
  },
  {
    name: "Mattia Perazzo",
    title: "Executive Director Commercial",
    image: "/images/stf-perazzo.jpg",
    summary:
      "Specializing in project financing and fiscal strategy for infrastructure development.",
    // link: "",
  },
  {
    name: "Andreas Koumpatis",
    title: "Executive Director Technical",
    image: "/images/stf-koumpatis.jpg",
    summary:
      "Specializing in project financing and fiscal strategy for infrastructure development.",
    // link: "",
  },
  {
    name: "Abdul Rafiu B. Adewale",
    title: "Non-Executive Director",
    image: "/images/stf-adewale.jpg",
    summary:
      "Specializing in project financing and fiscal strategy for infrastructure development.",
    // link: "",
  },
  {
    name: "Dr. Shamsideen A. Dosunmu",
    title: "Non-Executive Director",
    image: "/images/stf-dosunmu.png",
    summary:
      "Specializing in project financing and fiscal strategy for infrastructure development.",
    // link: "",
  },
  {
    name: "Sunday O. Osobu",
    title: "Non-Executive Director",
    image: "/images/stf-osobu.png",
    summary:
      "Specializing in project financing and fiscal strategy for infrastructure development.",
    // link: "",
  },
];

export const defaultIdentity: Identity[] = [
  {
    title: "Mission",
    type: IdentityType.MISSION,
    icon: "MdOutlineRocketLaunch",
    content:
      "To deliver superior engineering solutions that empower communities and set the global standard for infrastructure durability.",
  },
  {
    title: "Vision",
    type: IdentityType.VISION,
    icon: "MdRemoveRedEye",
    content:
      "To remain Nigeria's most trusted engineering partner, building a sustainable legacy through innovation and century-old expertise.",
  },
  {
    title: "Values",
    type: IdentityType.VALUES,
    icon: "MdOutlineVerified",
    content:
      "Integrity, Precision, Heritage, and Safety. These pillars guide every brick we lay and every bridge we span.",
  },
];

export const defaultTimelines: Timeline[] = [
  {
    title: "The Inception",
    year: "1932",
    icon: "MdFoundation",
    content:
      "Cappa & D'Alberto was formally established in Lagos, focusing on residential villas.",
  },
  {
    title: "Post-War Expansion",
    year: "1950",
    icon: "MdOutlineFactory",
    content:
      "Expansion into industrial infrastructure, supporting Nigeria's rapid modernization phase.",
  },
  {
    title: "PLC Conversion",
    year: "1970",
    icon: "MdCorporateFare",
    content:
      "The firm transitions to a Public Limited Company, opening doors to massive projects.",
  },
  {
    title: "The Skyscraper Era",
    year: "1995",
    icon: "MdApartment",
    content:
      "Leading the construction of Lagos Island's most iconic financial headquarters.",
  },
  {
    title: "Future Horizons",
    year: "2024",
    icon: "MdPrecisionManufacturing",
    content:
      "Pioneering sustainable construction methods and AI-driven project management.",
  },
];

export const defaultRoles: Role[] = [
  {
    title: "Senior Structural Engineer",
    description:
      "Lead the structural design and analysis for high-rise residential complexes in Lagos and Abuja.",
    division: "Engineering",
    type: RoleType.FULL_TIME,
    location: "Lagos, HQ",
    expiresAt: "2026-12-31",
  },
  {
    title: "Site Project Manager",
    description:
      "Oversee daily operations and safety protocols on major industrial infrastructure sites.",
    division: "Project Management",
    type: RoleType.FULL_TIME,
    location: "Port Harcourt",
    expiresAt: "2026-12-31",
  },
  {
    title: "Lead Finishing Foreman",
    description:
      "Coordinate specialized trade teams to deliver world-class interior finishing for luxury hotel projects.",
    division: "Skilled Trades",
    type: RoleType.CONTRACT,
    location: "Lagos, Island",
    expiresAt: "2026-12-31",
  },
  {
    title: "Strategic Procurement Lead",
    description:
      "Manage global supply chain relationships and optimize material sourcing for large-scale developments.",
    division: "Corporate",
    type: RoleType.FULL_TIME,
    location: "Lagos, HQ",
    expiresAt: "2026-12-31",
  },
  {
    title: "Job Title",
    description: "Job Description",
    division: "Division",
    type: RoleType.FULL_TIME,
    location: "Location",
    expiresAt: "2026-12-31",
  },
];
