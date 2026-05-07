import { defineConfig } from "vitepress";
import { sidebar } from "./sidebar.mts";

export default defineConfig({
  title: "Cure Dolly",
  description: "in markdown",
  srcDir: "docs",
  base: process.env.VITE_BASE_URL || "/",
  ignoreDeadLinks: true,
  rewrites: {
    "en/:rest*": ":rest*",
  },
  locales: {
    root: {
      label: "English",
      lang: "en",
    },
    ru: {
      label: "Russian",
      lang: "ru",
    },
    vi: {
      label: "Vietnamese",
      lang: "vi",
    },
  },

  markdown: {
    image: {
      lazyLoading: true,
    },
  },

  head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    ["link", { rel: "icon", href: "/cure-script/favicon.ico" }],
    [
      "link",
      {
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet',
        rel: "stylesheet",
      },
    ],
    ["meta", { name: "og:title", content: "Cure Dolly Grammar guide" }],
    [
      "meta",
      {
        property: "og:description",
        content: "Enjoy the entire grammar guide in a easy-to-read web format",
      },
    ],
    ["meta", { property: "og:image", content: "/cure-script/og.png" }],
    ["meta", { property: "og:type", content: "website" }],
    [
      "meta",
      { property: "og:url", content: "https://kellenok.github.io/cure-script" },
    ],
    [
      "meta",
      {
        name: "twitter:url",
        content: "https://kellenok.github.io/cure-script",
      },
    ],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: "Cure Dolly Grammar guide" }],
    [
      "meta",
      {
        name: "twitter:description",
        content: "Enjoy the entire grammar guide in a easy-to-read web format",
      },
    ],
    ["meta", { name: "twitter:image", content: "/cure-script/og.png" }],
  ],

  themeConfig: {
    sidebar: sidebar,
    editLink: {
      pattern:
        "https://github.com/Kellenok/cure-script/edit/main/config/docs/:path",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Kellenok/cure-script" },
    ],
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about/about" },
    ],
    footer: {
      message: 'Created by <a href="https://bento.me/kln">Kellen</a>',
      copyright:
        'Originally transripted by <a href="https://docs.google.com/document/d/1XpuXerkGU8waJ4DPDNJA4bGeqOvM-csXjTe57iHARHc">nunko/dinuz</a>.',
    },
  },
});
