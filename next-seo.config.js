/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Summershare",
  titleTemplate: "%s | Summershare",
  defaultTitle: "Summershare",
  description: "Share and collab on your summer idea",
  canonical: "https://summershare.xyz",
  openGraph: {
    url: "https://summershare.xyz",
    title: "Summershare",
    description: "Sahre and collab on your summer idea",
    images: [
      {
        url: "/og.png",
        alt: "summershare og-image",
      },
    ],
    site_name: "Summershare",
  },
  twitter: {
    handle: "@reynadi17",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
