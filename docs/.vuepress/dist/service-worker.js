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
    "revision": "959ab91072b0cab53a60197557958bdf"
  },
  {
    "url": "ansible/index.html",
    "revision": "eab9da220d4cbdb133b0345b9beaa7d5"
  },
  {
    "url": "assets/css/0.styles.f2632a43.css",
    "revision": "d2db7ab2091b9d5e53ec58b1fdc2b5f4"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.d9c32632.js",
    "revision": "f20ed15831408c11d8ab6a9a87bba30b"
  },
  {
    "url": "assets/js/11.914d0419.js",
    "revision": "4fb8fcd32d082bd6e7b11c6ea6bfebf7"
  },
  {
    "url": "assets/js/12.a420a700.js",
    "revision": "675c7743261907c27be8af3413742726"
  },
  {
    "url": "assets/js/13.c49aebec.js",
    "revision": "aa40cb28e434de99558388dc37168b86"
  },
  {
    "url": "assets/js/14.ecf50b93.js",
    "revision": "27f4b461fd2f234d91e3eacb0b58dcab"
  },
  {
    "url": "assets/js/15.9a2077b1.js",
    "revision": "f3b1cab4edc1942a3ff07e4d7896c21f"
  },
  {
    "url": "assets/js/16.d24f53c6.js",
    "revision": "ff5b9f901a7435006fde9f080a77a54e"
  },
  {
    "url": "assets/js/17.4e9092fa.js",
    "revision": "3838980ec893e8816465e05be2fa6479"
  },
  {
    "url": "assets/js/18.1fc9106d.js",
    "revision": "02200446f5ebc45a7dfd0a99e56655c9"
  },
  {
    "url": "assets/js/19.0e09e11a.js",
    "revision": "f0f7a0b481ad59e452cd047994eb0d41"
  },
  {
    "url": "assets/js/2.1fa7b86f.js",
    "revision": "b0fc977da72e653d4ecbbe52a4ca516e"
  },
  {
    "url": "assets/js/20.03f8f3ab.js",
    "revision": "cbf0c59ab1e456885989df7a25add9c8"
  },
  {
    "url": "assets/js/21.8c36567b.js",
    "revision": "696f0f05d88b766eec286ae125bdca5b"
  },
  {
    "url": "assets/js/22.6070ace0.js",
    "revision": "260ceb502dc405ed30e419f73246934c"
  },
  {
    "url": "assets/js/23.a1e3fb3c.js",
    "revision": "5945fcc13480a30cf43a4fb6c45fca72"
  },
  {
    "url": "assets/js/24.13b8bfbc.js",
    "revision": "eb971070196a15cbed4ca6fd3f3f9e9d"
  },
  {
    "url": "assets/js/25.76e8700d.js",
    "revision": "9454d697916b5897058ee64a6f228c35"
  },
  {
    "url": "assets/js/26.7df6700e.js",
    "revision": "388c7c3120d6657755572f7c778e12dd"
  },
  {
    "url": "assets/js/27.4051b4fc.js",
    "revision": "f3b9e72ef3b73e22118f3c9b08a5f4f8"
  },
  {
    "url": "assets/js/28.697fc05e.js",
    "revision": "ceb879e540c2dc40fe73f37e7d985bf9"
  },
  {
    "url": "assets/js/3.684a3d09.js",
    "revision": "7c8e3edaae4f63b5acf5e954a166b053"
  },
  {
    "url": "assets/js/4.5dc45874.js",
    "revision": "cbec70d4cf9bdbc5ba93919c8c7e8a93"
  },
  {
    "url": "assets/js/5.e9ca35a7.js",
    "revision": "3ead3ab70ddb4a49e79fd232cfe7a1e2"
  },
  {
    "url": "assets/js/6.df9a7d2a.js",
    "revision": "d254903e964b20e6394dfcbef371831d"
  },
  {
    "url": "assets/js/7.b9189f98.js",
    "revision": "6dc759c1d4b9c754e83afbb686d4ea07"
  },
  {
    "url": "assets/js/8.7940142b.js",
    "revision": "54f130796ace9410118aa176e73dbfca"
  },
  {
    "url": "assets/js/9.7cc5b7f5.js",
    "revision": "9b85f383fae278921de8bd9f4faa1b42"
  },
  {
    "url": "assets/js/app.1809c8fc.js",
    "revision": "d6f4f40d8c2b5e87e1de1e59c429277a"
  },
  {
    "url": "clamav/index.html",
    "revision": "81659861e08e68dec7e6465af0068eef"
  },
  {
    "url": "graylog/index.html",
    "revision": "1421a834717a5e380f8cba2c93907bf6"
  },
  {
    "url": "img/books.png",
    "revision": "b81b1b341f147ea86ca39c01a82eef58"
  },
  {
    "url": "img/centos.png",
    "revision": "eceb88fbdcfbb06c8ddcdcdbc0d9feb4"
  },
  {
    "url": "img/clamav/clamdtop.png",
    "revision": "70e640af3e69f4f974905a9381e7bb37"
  },
  {
    "url": "img/clamav/win10client1.png",
    "revision": "f34cd1352dd6ed4a0ba01e39c66e0ce2"
  },
  {
    "url": "img/clamav/win10client2.png",
    "revision": "73f9904f6b426f5e487673d5a8e72b0e"
  },
  {
    "url": "img/clamav/win10client3.png",
    "revision": "1f99bca85b1744912a236d4f77b430ef"
  },
  {
    "url": "img/clamav/win10client4.png",
    "revision": "7ce922e5c56669526fc1ff8c1161ffdd"
  },
  {
    "url": "img/clamav/win10client5.png",
    "revision": "2b920569ffbc48ab27b34519f886022a"
  },
  {
    "url": "img/clamav/win10client6.png",
    "revision": "2939567bf03afc738ab77248a4ca3dab"
  },
  {
    "url": "img/clamav/win10client7.png",
    "revision": "4434a4c43d1293366fd3fa1f4c2e54d4"
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
    "url": "img/icons/video.png",
    "revision": "458a3a6e4546bb82373acf69b6f582e8"
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
    "url": "img/openvas/gsa_about.png",
    "revision": "ad0c3660e39fb5402f90f6ae03018118"
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
    "url": "img/openvas/gsa_login-2.png",
    "revision": "1186c5dd0e841a7bd357adefdfc4a711"
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
    "url": "img/privacyidea/greenbone-login.png",
    "revision": "1d27f5459b92462230ac854745d64414"
  },
  {
    "url": "img/privacyidea/greenbone-radius.png",
    "revision": "26183b828a38242a7dd451d97b7f77bc"
  },
  {
    "url": "img/privacyidea/greenbone-user.png",
    "revision": "11499778c547a6e77c1614ac9c4a102a"
  },
  {
    "url": "img/privacyidea/privacyidea_login.png",
    "revision": "807fcb9651a316aa89188daee7c120cc"
  },
  {
    "url": "img/privacyidea/privacyidea-assign-token.png",
    "revision": "d5b0f902581c403f6eb90ac1193bd732"
  },
  {
    "url": "img/privacyidea/privacyidea-override-authentication.png",
    "revision": "ca3ff0fb3e6b2710cf91c8e0145193d1"
  },
  {
    "url": "img/privacyidea/privacyidea-realm.png",
    "revision": "2f1c45d4f34ac90e1e477fe23cc15201"
  },
  {
    "url": "img/privacyidea/privacyidea-resolver.png",
    "revision": "e7aaf0b72e0c6ecbfe5840c6bec904ef"
  },
  {
    "url": "img/privacyidea/privacyidea-test-token.png",
    "revision": "440738ab254ab40b78e53ecefd444710"
  },
  {
    "url": "img/privacyidea/privacyidea-token-2.png",
    "revision": "ccc530096d1f5aad578da2c6cbfef34c"
  },
  {
    "url": "img/privacyidea/privacyidea-token.png",
    "revision": "3769791c3b98947d111b50ea65d58eaa"
  },
  {
    "url": "img/privacyidea/privacyidea-users.png",
    "revision": "7f7e6b3c2c85ef2e340f70744279968f"
  },
  {
    "url": "img/privacyidea/yubikey-hotp.png",
    "revision": "6a65bbb986cbe81aa41c41ff535c86f4"
  },
  {
    "url": "img/privacyidea/yubikey-settings.png",
    "revision": "0be678950730b640181dc45197befea7"
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
    "url": "img/wireguard/mullvad.png",
    "revision": "c65696e0b1b1b1f2fe809aef5c80f932"
  },
  {
    "url": "index.html",
    "revision": "a44dc0feb62adfa7690dea2ae24ea7dd"
  },
  {
    "url": "intrusion/index.html",
    "revision": "81038525f7e44d339563610b466afef8"
  },
  {
    "url": "jira/index.html",
    "revision": "55635f637bb8362b7c5487126d2e3e3f"
  },
  {
    "url": "ldap/index.html",
    "revision": "87f6f4c163502e19ec8913324e52d016"
  },
  {
    "url": "mmonit/index.html",
    "revision": "80c20d2a3e7e4566452d26da250dfc21"
  },
  {
    "url": "openvas/index.html",
    "revision": "c49ae9aede11c6fa2153c6e2a29a40f1"
  },
  {
    "url": "ossec/index.html",
    "revision": "4161285b1f3bd8ca8a30a3b8c21d78f3"
  },
  {
    "url": "pcp/index.html",
    "revision": "439570c7fc2677e0b52b0cd8d69e7fed"
  },
  {
    "url": "privacyidea/index.html",
    "revision": "6f3c299d61bde4706b9d445a1a765080"
  },
  {
    "url": "psad/index.html",
    "revision": "53bcdd5449830f8b037d0284db60ac4a"
  },
  {
    "url": "radius/index.html",
    "revision": "7f4a33b175ef000fe544f6c2d9b531af"
  },
  {
    "url": "rsyslog/index.html",
    "revision": "9570b0f7e64eaa07417239ef589c7b11"
  },
  {
    "url": "tags.html",
    "revision": "2575948ecefd70b4c9443b7b576d9e59"
  },
  {
    "url": "u2f/index.html",
    "revision": "cd8d51cfd03b02efd9ad25b7224b0b7c"
  },
  {
    "url": "wireguard/index.html",
    "revision": "82a073947ded43891d8b959377e59e88"
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
