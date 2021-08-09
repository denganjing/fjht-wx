Page({
  data: {
    vtabs: [],
    url:'https://www.fjht.store/api/shop/v1.0/',
    activeTab: 0,
    focus: false,
    shopName: '',
    list: [
      {
          shopName: '暂无数据',
          image: "",
          id:'123'
      }
    ]
  },

  onLoad() {
    // 获取数据类型
     this.getShopType();
  },

  getShopType() {
    var that = this;
    // 获取商品类型
    wx.request({
      url: this.data.url+'getShopType', 
      method: 'post',
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
         that.setData({
          vtabs: res.data.data.map(item=>{
            return {title:item.typeName,id:item.id}
          })
        })
      }
    })
    that.getNewPicture(0)
  },

  onTabCLick(e) {
    const index = e.detail.index;
    console.log(index);
    this.setData({
      activeTab: index,
      shopName:''
    })
    this.getNewPicture(index);
  },

  getNewPicture(index) {
    var that = this;
    that.setData({
      list: [  {
        shopName: '暂无数据',
        image: "",
        id:'123'
    }]
    })
     // 获取商品类型
     wx.request({
      url: this.data.url+'getTypeShop', 
      method: 'post',
      data:{"currentPage":1,"pageSize":1000,"type":index,"shopName":this.data.shopName},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        const obj = res.data;
        if (obj.code === '200' && obj.data.list.length) {
          that.setData({
            list: res.data.data.list
          })
        }
         
      }
    })
 }, 
 handleInputChange(e) {
  this.setData({
    shopName:e.detail.value
  })
 },
 // 查询搜索的接口方法
 findContent() {
   console.log(this.data.shopName);
   this.getNewPicture(0)
 },
  onChange(e) {
    const index = e.detail.index;
  }

})
