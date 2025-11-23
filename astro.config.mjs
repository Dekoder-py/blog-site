// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.codingcorner.dev",
  integrations: [mdx(), sitemap(), react()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});