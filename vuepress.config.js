module.exports = {
  themeConfig: {
    // public file path
    logo: '/72x72.png',
    // If you set it in the form of `organization/repository`
    // we will take it as a GitHub repo
    repo: 'libellux/Libellux-Up-and-Running-dev',
    navbar: [
      // NavbarItem
      {
        text: 'Portal',
        link: 'https://portal.libellux.com',
      }
    ],
    sidebar: [
      // SidebarItem
      {
        text: 'Foo',
        link: '/docs/',
        children: [
          // SidebarItem
          {
            text: 'github',
            link: 'https://github.com',
            children: [],
          },
          // string - page file path
          '/docs/readme.md',
        ],
      },
    ],
  },
}
