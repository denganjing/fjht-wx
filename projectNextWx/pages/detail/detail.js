Page({
  data: {
    url:'https://www.fjht.store/api/shop/v1.0/',
    images: [],//临时图片地址
    title:''
  },

  onLoad(options) {
    console.log(options);
    console.log(options.detail);
    // 携带详细
     this.getNewPicture(options.detail)
  },
  //预览图片，放大预览
  preview(event) {
    let currentUrl = event.currentTarget.dataset.src;
    const urls = this.data.images.map(item=>{
      return 'https://www.fjht.store/'+item.imgUrl;
    })
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  getNewPicture(index) {
    var that = this;
     // 获取商品类型
     wx.request({
      url: this.data.url+'getShopInfo', 
      method: 'post',
      data:{"tranceId":index},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
       const picData = res.data.data;
         that.setData({
           title:picData.shopName,
           images:picData.list
         })
      }
    })
 }, 

})
