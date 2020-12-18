/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "7fc9a994216c76c4ded4c2af4dba5b7d"
  },
  {
    "url": "assets/css/0.styles.fec8a880.css",
    "revision": "042852179554be26758aa63b528eb6cb"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.3c279720.js",
    "revision": "c436515fe81dfec3a95446e2ba3f07d3"
  },
  {
    "url": "assets/js/11.0320b633.js",
    "revision": "109dd2de900b1fee6cb3ae18f0c8be39"
  },
  {
    "url": "assets/js/12.ba312fd3.js",
    "revision": "50b656182513e1086e9703f94cdf8426"
  },
  {
    "url": "assets/js/13.bae310e7.js",
    "revision": "1c72ac8b338a6e87ade9163973945214"
  },
  {
    "url": "assets/js/14.8b0ff03b.js",
    "revision": "f9fabcb8559d1bb9a4f18e5c15013552"
  },
  {
    "url": "assets/js/15.e26fd78a.js",
    "revision": "63f5e4d3233d627476d8818c95549b0d"
  },
  {
    "url": "assets/js/16.21609ca5.js",
    "revision": "644266a6a70b36386e5299f08bde8dcd"
  },
  {
    "url": "assets/js/17.cd909f53.js",
    "revision": "f6b3c7cc8a2fc629ae2a553ab69e7a9f"
  },
  {
    "url": "assets/js/18.3cafeb03.js",
    "revision": "3f6f5f1b2a0349986c963a802ac07065"
  },
  {
    "url": "assets/js/19.dfd6a0e0.js",
    "revision": "140b73dd60ce1a5a050399c94dedea9a"
  },
  {
    "url": "assets/js/2.e28a458f.js",
    "revision": "f7848b08f8e0500557adf501c57eabe3"
  },
  {
    "url": "assets/js/20.69dbcc2a.js",
    "revision": "a30d13014322f2eaa0f45a0ca4c3b53a"
  },
  {
    "url": "assets/js/21.cc742de6.js",
    "revision": "d2bc1da9cedea506a259c40d90c0f0ee"
  },
  {
    "url": "assets/js/22.31d880d2.js",
    "revision": "f08d68ecfc6e3055bbc1de00e02c6f97"
  },
  {
    "url": "assets/js/23.c7f38aba.js",
    "revision": "4b041d699ce02c147bfb179c0cf44e63"
  },
  {
    "url": "assets/js/24.ef9439f2.js",
    "revision": "aa0fe19803d712bd0d4feabc284b4781"
  },
  {
    "url": "assets/js/25.ce4866c2.js",
    "revision": "93c5a379b14e4bc4585ff553176d9c63"
  },
  {
    "url": "assets/js/3.1f33fffe.js",
    "revision": "b07f580f1fc7f69a8a58ed480570faf6"
  },
  {
    "url": "assets/js/4.197bc1c7.js",
    "revision": "d56febb51a9c4e031c9f62e6416d9ceb"
  },
  {
    "url": "assets/js/5.e2ac7791.js",
    "revision": "618a39ea54f91100c9454e0eec76713b"
  },
  {
    "url": "assets/js/6.3b618b4a.js",
    "revision": "3cae484c28e3a4d94b06531925709d80"
  },
  {
    "url": "assets/js/7.11d40bb1.js",
    "revision": "c2f853d28b84a4195dc03ecef3a72c00"
  },
  {
    "url": "assets/js/8.01864534.js",
    "revision": "ac6bfb3252d6e4b634a3dc2bbbad709e"
  },
  {
    "url": "assets/js/9.6c51ddc2.js",
    "revision": "d8897812ad9cb8ce401e6d74cd2a685a"
  },
  {
    "url": "assets/js/app.b9adcafc.js",
    "revision": "55a1ee6d8e7d5b99de91295a53efc047"
  },
  {
    "url": "graylog/index.html",
    "revision": "b74c79338a3cda40c648262708339ddb"
  },
  {
    "url": "img/books.png",
    "revision": "9cd234e3b3f0ec39854959d384e9cd5c"
  },
  {
    "url": "img/centos.png",
    "revision": "eceb88fbdcfbb06c8ddcdcdbc0d9feb4"
  },
  {
    "url": "img/icons/1200x627.png",
    "revision": "4ed965ba2daf1f2907b5696f47949426"
  },
  {
    "url": "img/icons/1280x640.png",
    "revision": "2f2b95eb6ef52574bd86b1e426be9df9"
  },
  {
    "url": "img/icons/144x144.png",
    "revision": "c5abed2721558a98cd5adb1b28d5f032"
  },
  {
    "url": "img/icons/1500x500.png",
    "revision": "cb77b3aa40b6fbdd9a25ecb8fed580d3"
  },
  {
    "url": "img/icons/192x192.png",
    "revision": "b8853a3b71b3a7e79c116d8d2dc8fe99"
  },
  {
    "url": "img/icons/256x256.png",
    "revision": "64014871dd4b25592423d91c4a007f3a"
  },
  {
    "url": "img/icons/384x384.png",
    "revision": "f5837cc63fdd26d96461a55d61fb1944"
  },
  {
    "url": "img/icons/4096x4096.png",
    "revision": "9e79bb6db785b2243380efb2546cf841"
  },
  {
    "url": "img/icons/48x48.png",
    "revision": "c1077dc498ae97b7f5209da9277579e3"
  },
  {
    "url": "img/icons/512x512.png",
    "revision": "0a91e0a9adeee05b4a0feeadd06574dd"
  },
  {
    "url": "img/icons/72x72.png",
    "revision": "b36cd3c87f00f07092b6442b7e00b0a6"
  },
  {
    "url": "img/icons/96x96.png",
    "revision": "2907ea3e33e14a352ba8d282e0f32cd5"
  },
  {
    "url": "img/mmonit/mmonit_login.png",
    "revision": "641393a187791235fbee600f71e48b7a"
  },
  {
    "url": "img/mmonit/mmonit1.png",
    "revision": "1665c0ebb4ce463c59df456bda2e5ee5"
  },
  {
    "url": "img/mmonit/slack_alert.png",
    "revision": "239fd5c0b726b06c6cc555a908d08359"
  },
  {
    "url": "img/mmonit/slack_incoming_webhook.png",
    "revision": "74af9ccf2af674a14e7d454817a89ded"
  },
  {
    "url": "img/network.png",
    "revision": "b7599cc93fd5862f7d7b95c1014e2d32"
  },
  {
    "url": "img/openvas/gce_success.png",
    "revision": "68690af56e0a7e30759701936d306f0b"
  },
  {
    "url": "img/openvas/gsa_auth_target.png",
    "revision": "24526d2baf1cc29af4aa4d72d3b646c2"
  },
  {
    "url": "img/openvas/gsa_auth_task.png",
    "revision": "fd7ed294fba694fdc494a9b496118af3"
  },
  {
    "url": "img/openvas/gsa_credentials.png",
    "revision": "2b167ef41f7c628b88016c5410bae93e"
  },
  {
    "url": "img/openvas/gsa_dashboard.png",
    "revision": "62a7cddd490798fa7338f0709aa6deef"
  },
  {
    "url": "img/openvas/gsa_login.png",
    "revision": "c41707e31268ccf0b9450eb95acd3494"
  },
  {
    "url": "img/openvas/gsa_newcredentials.png",
    "revision": "9d5bb41889cddfca6c246eb5dff70b3e"
  },
  {
    "url": "img/openvas/gsa_noauth_scan.png",
    "revision": "6ca50842204bbaae21d1722a8ad22cf7"
  },
  {
    "url": "img/openvas/gsa_noauth_task.png",
    "revision": "fd779e1ba6466b852863936c0bbc4527"
  },
  {
    "url": "img/openvas/gsa_target_auth.png",
    "revision": "9a602b0a9cf7ce2ecd67ebd2f5fa59fd"
  },
  {
    "url": "img/openvas/gsa_target.png",
    "revision": "2a69f5dd7c68a9f5f1fab0d59bfcc60b"
  },
  {
    "url": "img/openvas/gsa_targets.png",
    "revision": "7a3ebf39135e960ee4cc8eae1554eb1d"
  },
  {
    "url": "img/openvas/gsa_task.png",
    "revision": "5843f298967649c9d3eaf8302099b621"
  },
  {
    "url": "img/openvas/gsa_tasks.png",
    "revision": "578e858b776d0a23609524bf76cf86f6"
  },
  {
    "url": "img/openvas/vm_settings.png",
    "revision": "b9ac5625eb085a07362fc0c0a596c483"
  },
  {
    "url": "img/ossec/512x512.png",
    "revision": "bee855a078b5cf7941dcc4c2838ddf1d"
  },
  {
    "url": "img/ossec/cloudflare_token.png",
    "revision": "c36576440c64fceb89e53cf4f8dd1921"
  },
  {
    "url": "img/ossec/remote_syslog_settings.png",
    "revision": "29e56b2348c0689d577022cc7c799d6e"
  },
  {
    "url": "img/ossec/remote_syslog_value.png",
    "revision": "213cebc9172c9a1f8f8a3a011dfd9a95"
  },
  {
    "url": "img/ossec/windows_agent_complete.png",
    "revision": "8a5f36cb5a5469e42530fcb44543b045"
  },
  {
    "url": "img/ossec/windows_agent_components.png",
    "revision": "15d8bf841dbdce26c04ca09b48538dcf"
  },
  {
    "url": "img/ossec/windows_agent_manager.png",
    "revision": "095dfcef88dff43ea831b872ccd87898"
  },
  {
    "url": "img/ossec/windows_agent_setup.png",
    "revision": "3781048e9d3c81ec993f3cb08cacaa22"
  },
  {
    "url": "img/privacyidea/privacyidea_login.png",
    "revision": "807fcb9651a316aa89188daee7c120cc"
  },
  {
    "url": "img/ubuntu.png",
    "revision": "f53554b67ad3f94dfb78b2dbcd6630d3"
  },
  {
    "url": "img/win98/canopus.jpg",
    "revision": "713f202c27170220c11ed8dd8d8c1258"
  },
  {
    "url": "img/win98/harddrive.jpg",
    "revision": "a315cb29db3876a2105cc4cd2a3e25e9"
  },
  {
    "url": "img/win98/livedrive.jpg",
    "revision": "0fe14c326242e1d82bed8efb7f0725e3"
  },
  {
    "url": "img/win98/memory.jpg",
    "revision": "01314af32ed413b62944e236664cef20"
  },
  {
    "url": "img/win98/motherboard.jpg",
    "revision": "b0d4ebf37a37d9013ddb6ae1503b22dc"
  },
  {
    "url": "img/win98/newq.jpg",
    "revision": "081147848fc2d1e5202e545d544e07fd"
  },
  {
    "url": "img/win98/pcdvd.jpg",
    "revision": "c4e05a218ebaab64750da9fd4ef9ee73"
  },
  {
    "url": "img/win98/processor.jpg",
    "revision": "bb1250126cc6b2a90f944bde2ebb7d7e"
  },
  {
    "url": "img/win98/psu.jpg",
    "revision": "d5907d3d9e55849f9186daaaaa0964b2"
  },
  {
    "url": "img/win98/soundblaster.jpg",
    "revision": "dab0ec6f7aadd338ef4628e67dae025e"
  },
  {
    "url": "img/win98/voodoo2.jpg",
    "revision": "6d957763e3279acf4608a680f21068a8"
  },
  {
    "url": "img/win98/voodoo2fan.jpg",
    "revision": "2b9e1dc0054358c95026b7b7816a70b1"
  },
  {
    "url": "index.html",
    "revision": "0c603b41ee4a10ab09a29dca30a442e1"
  },
  {
    "url": "intrusion/index.html",
    "revision": "bd1bce91fdff21113f7044440649da1c"
  },
  {
    "url": "jira/index.html",
    "revision": "a9f9b894f3c8530e97193b7c786c04bb"
  },
  {
    "url": "ldap/index.html",
    "revision": "38871adc1ae2ebdc802dde1fe204fbe6"
  },
  {
    "url": "mmonit/index.html",
    "revision": "0f1150e6b463ac2fd88b3ba41e3cdf49"
  },
  {
    "url": "openvas/index.html",
    "revision": "a27141c8678e71a2a064f89ac5044418"
  },
  {
    "url": "ossec/index.html",
    "revision": "c5f43e283b5278957961db52d40244bb"
  },
  {
    "url": "pcp/index.html",
    "revision": "e253d79d8713322a876ac44b54e31cc4"
  },
  {
    "url": "privacyidea/index.html",
    "revision": "35ed3945f01cfd816ac8527a633203b0"
  },
  {
    "url": "psad/index.html",
    "revision": "a7314df76bed5d025f14d9a722fba6e9"
  },
  {
    "url": "rsyslog/index.html",
    "revision": "598042346ac191be1a56b72f5a51a8ef"
  },
  {
    "url": "tags.html",
    "revision": "e97f9c29f000c37e5f1b8f775b8e92f2"
  },
  {
    "url": "u2f/index.html",
    "revision": "6e9944370259a32f41d560ac21800233"
  },
  {
    "url": "wireguard/index.html",
    "revision": "684dd90fcee12d6c6e2727a0a114ce1e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
