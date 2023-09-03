export type HomeLink = {
  href: string;
  linkName: string;
};

export const homeLink: Readonly<HomeLink[]> = [
  {
    href: "foryou",
    linkName: "For you",
  },
  {
    href: "following",
    linkName: "Following",
  },
];
