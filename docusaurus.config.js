// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Sharpsell docs",
  tagline: "Sharpsell featutes documentation",
  favicon: "img/favicon.ico",
  staticDirectories: ["static", "public"],

  // Set the production url of your site here
  url: "https://www.sharpsell.ai",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "sharpsell", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    preprocessor: ({ filePath, fileContent }) => {
      if (
        filePath.includes("sdk_docs") ||
        filePath.includes("sdk_versioned_docs")
      ) {
        return fileContent
          .replaceAll("{base-domain}", "\\{base-domain\\}")
          .replaceAll(
            "<ArrowRight className='arrow' />",
            "{<ArrowRight className='arrow' />}",
          )
          .replace(
            /<VersionedLink([^>]*)>\s*([\s\S]*?)\s*<\/VersionedLink>/g,
            (_, attributes, children) =>
              `<VersionedLink${attributes}>\n\n${children.trim()}\n\n</VersionedLink>`,
          );
      }

      return fileContent;
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "sdk",
        path: "sdk_docs",
        routeBasePath: "sdk",
        sidebarPath: "./sidebarsSdk.js",
        breadcrumbs: true,
        includeCurrentVersion: false,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: "Sharpsell docs",
        logo: {
          alt: "sharpsell logo",
          src: "img/favicon.ico",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "scorm",
            position: "left",
            label: "DOCS",
          },
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            docsPluginId: "sdk",
            position: "left",
            label: "SDK Documentation",
          },
          {
            type: "docsVersionDropdown",
            docsPluginId: "sdk",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Sharpsell.ai`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
