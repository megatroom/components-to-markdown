// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Components to Markdown',
  tagline:
    'Highly customizable open source tool for generating component documentation.',
  url: 'https://components-to-markdown.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'megatroom',
  projectName: 'components-to-markdown',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebarsDocs.js'),
          editUrl:
            'https://github.com/megatroom/components-to-markdown/edit/main/packages/website/',
        },
        // blog: {
        //   showReadingTime: true,
        //   editUrl:
        //     'https://github.com/megatroom/components-to-markdown/edit/main/packages/website/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'demo',
        path: 'demo',
        routeBasePath: 'demo',
        sidebarPath: require.resolve('./sidebarsDemo.js'),
        // ... other options
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'C2M',
        logo: {
          alt: 'Components to Markdown Logo',
          src: 'img/c2m-logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started/introduction',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'doc',
            docsPluginId: 'demo',
            docId: 'introduction',
            position: 'left',
            label: 'Demo',
          },
          // { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/megatroom/components-to-markdown',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Introduction',
                to: '/docs/getting-started/introduction',
              },
              {
                label: 'CLI Usage',
                to: '/docs/api/cli',
              },
              {
                label: 'Library Usage',
                to: '/docs/api/library',
              },
            ],
          },
          {
            title: 'Demonstration',
            items: [
              {
                label: 'Overview',
                to: '/demo/introduction',
              },
              {
                label: 'Default Template',
                to: '/demo/brachiosaurus/overview',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/megatroom/components-to-markdown',
              },
              {
                label: 'NPM',
                href: 'https://www.npmjs.com/package/components-to-markdown',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Component to Markdown, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
