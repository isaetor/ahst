import localFont from 'next/font/local'

export const ahst = localFont({
  src: [
    {
      path: "../fonts/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

