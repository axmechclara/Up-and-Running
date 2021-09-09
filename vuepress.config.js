module.exports = {
  themeConfig: {
    docsDir: 'docs',
    docsBranch: 'master',
    // public file path
    logo: '/test.png',
    // If you set it in the form of `organization/repository`
    // we will take it as a GitHub repo
    repo: 'libellux/Libellux-Up-and-Running-dev',
    navbar: [
      // NavbarItem
      {
        text: 'Libellux: Up & Running',
        link: '/',
        children: [
          {
            text: 'Zero Trust Network',
            children: [
              '/docs/'
            ],
          },
          {
            text: 'Intrusion Detection and Prevention',
            children: [
              '/docs/'
            ],
          },
          {
            text: 'Monitoring and Management',
            children: [
              '/docs/'
            ],
          },
        ],
      },
      // NavbarItem
      {
        text: 'Portal',
        link: 'https://portal.libellux.com',
      }
    ],
    sidebar: [
      // SidebarItem
      {
        text: 'Libellux: Up and Running',
        children: [
          // SidebarItem
          {
            text: 'Introduction',
            link: '/',
            sidebarDepth: 2,
          },
        ],
      },
      {
        text: 'Intrusion Detection and Prevention',
        children: [
          // OSSEC
          {
            text: 'OSSEC Host Intrusion Detection',
            path: 'ossec/',
            sidebarDepth: 2,
          },
          // PSAD
          {
            text: 'PSAD Intrusion Detection',
            link: '/docs/',
            children: ['/docs/readme.md', '/docs/readme.md'],
          },
          // GVM
          {
            text: 'Greenbone Vulnerability Manager',
            link: '/docs/',
            children: ['/docs/readme.md', '/docs/readme.md'],
          },
          // ClamAV
          {
            text: 'ClamAV Antivirus Server',
            link: '/docs/',
            children: ['/docs/readme.md', '/docs/readme.md'],
          },
          // string - page file path
          '/docs/readme.md',
        ],
      }
    ]
  }
}
