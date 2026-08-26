/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    "intro",
    {
      type: "category",
      label: "SDK Documentation",
      items: [
        {
          type: "link",
          label: "Introduction",
          href: "/sdk/",
        },
        {
          type: "link",
          label: "Platforms",
          href: "/sdk/category/platforms",
        },
        {
          type: "link",
          label: "Android Version Policy",
          href: "/sdk/android_version_details",
        },
        {
          type: "link",
          label: "FAQ",
          href: "/sdk/faq",
        },
        {
          type: "link",
          label: "Contact Us",
          href: "/sdk/contact-us",
        },
      ],
    },
  ],
};

export default sidebars;
