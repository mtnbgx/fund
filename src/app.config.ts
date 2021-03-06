export default {
  pages: [
    'pages/home/index',
    'pages/index/index',
    'pages/login/index',
    'pages/home/search',
    'pages/home/searchResult',
    'pages/push/index',
    'pages/login/signup',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#bfbfbf',
    selectedColor: '#d81e06',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '自选',
        iconPath: 'assets/tabbar/home.png',
        selectedIconPath: 'assets/tabbar/home-a.png'
      },
      {
        pagePath: 'pages/push/index',
        text: '推送',
        iconPath: 'assets/tabbar/push.png',
        selectedIconPath: 'assets/tabbar/push-a.png'
      }
    ]
  }
}
