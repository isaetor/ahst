export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "مستندات",
      href: "/docs",
    },
    {
      label: "تعرفه ها",
      href: "/pricing",
    },
    {
      label: "وبلاگ",
      href: "/blog",
    },
    {
      label: "درباره ما",
      href: "/about",
    },
  ],
  links: {
    login: "/login",
  },
};
