module.exports = {
  title: 'Libellux',
  head: [
    // Robots
    ['meta', { name: 'robots', content: 'index, follow' }],

    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:creator', content: '@libellux1' }],

    ['meta', { name: 'twitter:title', content: 'Libellux' }],
    ['meta', { name: 'twitter:description', content: 'Libellux Up and Running is a collection of personal notes and documentation regarding open-source software configuration. The focus is to build a so called Zero Trust Network using a central authentication server to enhance the security for our existing applications. We will manage our network using an open-source software tool for provisioning and configuration management to automate and speed up productivity.' }],

    ['meta', { name: 'twitter:image', content: 'https://www.libellux.com/img/icons/4096x4096.png' }],
    ['meta', { name: 'twitter:width', content: '4096' }],
    ['meta', { name: 'twitter:height', content: '4096' }],

    // Open Graph
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:type', content: 'website' }],

    ['meta', { property: 'og:title', content: 'Libellux' }],
    ['meta', { property: 'og:description', content: 'Libellux Up and Running is a collection of personal notes and documentation regarding open-source software configuration. The focus is to build a so called Zero Trust Network using a central authentication server to enhance the security for our existing applications. We will manage our network using an open-source software tool for provisioning and configuration management to automate and speed up productivity.' }],

    ['meta', { property: 'og:url', content: 'https://www.libellux.com' }],
    ['meta', { property: 'og:site_name', content: 'Libellux' }],

    ['meta', { property: 'og:publisher', content: 'https://www.facebook.com/libellux1' }],
    ['meta', { property: 'og:author', content: 'https://www.facebook.com/fredrik.hilmersson.1' }],

    ['meta', { property: 'og:image', content: 'https://www.libellux.com/img/icons/1200x627.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '627' }],

    // Icons
    ['link', { rel: 'icon', href: 'https://www.libellux.com/img/icons/72x72.png' }],
    ['meta', { name: 'msapplication-TileImage', content: 'https://www.libellux.com/img/icons/144x144.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '48x48', href: 'https://www.libellux.com/img/icons/48x48.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '72x72', href: 'https://www.libellux.com/img/icons/72x72.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '144x144', href: 'https://www.libellux.com/img/icons/144x144.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '192x192', href: 'https://www.libellux.com/img/icons/192x192.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '256x256', href: 'https://www.libellux.com/img/icons/256x256.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '384x384', href: 'https://www.libellux.com/img/icons/384x384.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '512x512', href: 'https://www.libellux.com/img/icons/512x512.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '1200x627', href: 'https://www.libellux.com/img/icons/1200x627.png' }],
  ],
  themeConfig: {
    docsDir: 'docs',
    docsBranch: 'master',
    // public file path
    logo: '/img/icons/72x72.png',
    // If you set it in the form of `organization/repository`
    // we will take it as a GitHub repo
    repo: 'libellux/Libellux-Up-and-Running-dev',
    plugins: [
      [
        '@vuepress/pwa',
        {
          skipWaiting: false,
        },
      ],
      ['@vuepress/plugin-pwa-popup']
    ],
    navbar: [
      // NavbarItem
      {
        text: 'Libellux: Up & Running',
        link: '/',
        children: [
          {
            text: 'Zero Trust Network',
            children: [
              {
                text: 'WireGuard Secure VPN Tunnel',
                link: '/wireguard/'
              },
              {
                text: 'Two-factor authentication w/ privacyIDEA and YubiKey',
                link: '/privacyidea/'
              },
            ],
          },
          {
            text: 'Intrusion Detection and Prevention',
            children: [
              {
                text: 'OSSEC Host Intrusion Detection',
                link: '/ossec/'
              },
              {
                text: 'Greenbone Vulnerability Manager',
                link: '/openvas/'
              },
              {
                text: 'ClamAV Antivirus Server',
                link: '/clamav/'
              },
              {
                text: 'PSAD Intrusion Detection',
                link: '/psad/'
              },
            ],
          },
          {
            text: 'Monitoring and Management',
            children: [
              {
                text: 'M/Monit System Monitoring',
                link: '/mmonit/'
              },
              {
                text: 'Graylog Centralized Log Management',
                link: '/graylog/'
              },
              {
                text: ' Rsyslog Syslog Processing',
                link: '/rsyslog/'
              },
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
        collapsable: false,
        sidebarDepth: 1,
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
        text: 'Zero Trust Network',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          // WireGuard
          {
            text: 'WireGuard Secure VPN Tunnel',
            link: '/wireguard/',
            sidebarDepth: 2,
          },
          // PrivacyIDEA
          {
            text: 'Two-factor authentication w/ privacyIDEA and YubiKey',
            link: '/privacyidea/',
            sidebarDepth: 2,
          },
        ]
      },
      {
        text: 'Intrusion Detection and Prevention',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          // OSSEC
          {
            text: 'OSSEC Host Intrusion Detection',
            link: '/ossec/',
            sidebarDepth: 2,
          },
          {
            text: 'Greenbone Vulnerability Manager',
            link: '/openvas/',
            sidebarDepth: 2,
          },
          {
            text: 'ClamAV Antivirus Server',
            link: '/clamav/',
            sidebarDepth: 2,
          },
          {
            text: 'PSAD Intrusion Detection',
            link: '/psad/',
            sidebarDepth: 2,
          }
        ],
      },
      {
        text: 'Monitoring and Management',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          // M/Monit
          {
            text: 'M/Monit System Monitoring',
            link: '/mmonit/',
            sidebarDepth: 2,
          },
          // Graylog
          {
            text: 'Graylog Centralized Log Management',
            link: '/graylog/',
            sidebarDepth: 2,
          },
          // Rsyslog
          {
            text: 'Rsyslog Syslog Processing',
            link: '/rsyslog/',
            sidebarDepth: 2,
          },
        ]
      }
    ]
  }
}
