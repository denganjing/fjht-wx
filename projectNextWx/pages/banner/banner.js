// pages/banner/banner.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'https://www.fjht.store/api/shop/v1.0/',
    list:[],
    pageSize:6,
    currentPage:1,
    total:0,
    noData:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '产品中心' 
    })
    this.getNewPicture(this.data.currentPage);
  },

  upNew() {
   const username =  wx.getStorageSync('usernam');
   const password =  wx.getStorageSync('password');
   if (username == 'admin' || password == 'fjht88888') {
    wx.navigateTo({
      url: '../upData/upData'
    })
  } else {
    wx.navigateTo({
      url: '../login/login'
    })
  }
  },
  toDetail(e){
    const tranceId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?detail='+tranceId
    })
  },
  getNewIndex(){
    if(this.data.total > this.data.pageSize * this.data.currentPage){
      this.setData({
        currentPage:this.data.currentPage + 1
      })
      this.getNewPicture(this.data.currentPage);
    } else {
      const that = this;
      wx.showModal({
        title: '',
        content: '暂无最新数据，是否回到第一页',
        success(res) {
          if (res.confirm) {
            that.setData({
              currentPage:1
            })
            that.getNewPicture(that.data.currentPage);
          }
        }
      })
    }
  },
  getNewPicture(e) {
      var that = this;
       // 获取商品类型
       wx.request({
        url: this.data.url+'getNewShop', 
        method: 'post',
        data:{"currentPage":e,"pageSize":this.data.pageSize},
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            that.setData({
              list: res.data.data.list,
              total:res.data.data.total,
              pageSize:res.data.data.pageSize,
              currentPage:res.data.data.pageNum,
              noData:that.data.list === 0
            })
        }
      })
  }
})