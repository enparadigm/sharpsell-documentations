// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Sharpsell',
  tagline: 'Sharpsell SDK integration documentation',
  url: 'https://www.sharpsell.ai',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  staticDirectories: ['static', 'public'],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sharpsell', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: true,
          // showLastUpdateAuthor: true,
          // showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],
  
  plugins: ['docusaurus-plugin-sass'],
  // themes: ['@docusaurus/theme-search-algolia'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true
        }
      },
      navbar: {
        title: 'Sharpsell',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'SDK Integration',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
        
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: 'Tutorial',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Sharpsell.ai`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // If Algolia did not provide you any appId, use 'BH4D9OD16A'
        appId: '8JNPSLXL9K',//'BH4D9OD16A',//'NS6GBGYACO', // Sharpsell - 8JNPSLXL9K
        // Public API key: it is safe to commit it
        apiKey: '1fac302cefcfddf32e6a9903d2be584d',//'8f0f11e3241b59574c5dd32af09acdc8',
        indexName: 'hasura-graphql',
        // Optional: see doc section below
        // contextualSearch: true,
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',
        // Optional: Algolia search parameters
        // searchParameters: {},
      },
      // announcementBar: {
      //   id: 'announcementBar-3', // Increment on change
      //   content: `⭐️ If you like Sharpsell-docs, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/enparadigm/sharpsell-documentations">GitHub</a>`,
      // },
    }),
};

module.exports = config;
