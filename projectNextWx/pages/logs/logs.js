Page({
  data: {
    logs: []
  },
  onLoad() {
   
  },
  callPhone() {
    wx.makePhoneCall({
     phoneNumber: '15068539358'
    })
  },
  nav() {  
    wx.openLocation({
      latitude:30.070928,	//维度
      longitude: 120.496952, //经度
      name: "浙江绍兴市柯桥区北联市场3-3-3536",	//目的地定位名称
      scale: 18,	//缩放比例
      address: "浙江绍兴市柯桥区北联市场3-3-3536"	//导航详细地址
    })
  }
})
