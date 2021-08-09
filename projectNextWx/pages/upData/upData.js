Component({
  data: {
      showTopTips: false,
      images: [],//临时图片地址
      baseImages:[],
      countries: [],
      list: [],
      countryIndex: '0',
      isAgree: false,
      inputValue:String,
      url:'https://www.fjht.store/api/shop/v1.0/',
      switch1Checked: true,
      disabled:false
  },
  methods: { 
    onLoad() {
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
            list: res.data.data.map(item=>item.typeName)
          })
           that.setData({
            countries: res.data.data
          })
        }
      })
    },
    chooseImage: function () {
        const that = this;
        wx.chooseImage({
          count: 9, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var tempFilePaths = res.tempFilePaths
            that.setData({
              images: that.data.images.concat(tempFilePaths)
            })
              that.data.images.map(item=>{
                wx.uploadFile({
                  url:'https://www.fjht.store/api/shop/v1.1/'+'uploadsSave',
                  filePath: item, 
                  name:'file',
                  header:{
                    "Content-type":"multipart/form-data"
                  },
                  success: function(res) { //成功的回调
                    const obj = JSON.parse(res.data);
                    that.setData({
                      baseImages: that.data.baseImages.concat(obj.data)
                    })
                  }
                }) 
              })
          }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    })
  },
  // 删除图片
  deleteImg: function (e) {
    const that = this;
    var imgs = this.data.images;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      images: imgs,
      baseImages: that.data.baseImages.splice(index, 1)
    });
  },
  bindCountryChange: function(e) {
    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
   
  switch1Change: function (e) {
    this.setData({
      switch1Checked: e.detail.value
    })
  },
    


  submitForm() {
    var that = this;
    if(this.data.baseImages.length > 9) {
      wx.showToast({
        title:'上传不能超过9张',
        icon:'error',
        duration: 2000
       })
       return false;
    }
    that.setData({
      switch1Checked:this.data.switch1Checked ? 1 : 0,
      disabled:true
    })
    // 构建参数
    let param =  {
      typeId: JSON.parse(this.data.countryIndex),
      isNew: this.data.switch1Checked,
      shopName: this.data.inputValue,
      urls:this.data.baseImages
    }
    wx.request({
      url: that.data.url+'saveShop', 
      method: 'POST',
      data:param,
      header: {
        'content-type': 'application/json' 
      },
      success: function(res) {
        const obj = res.data;
        if(obj.status === 1) {
          wx.switchTab({
            url: '../banner/banner'
          })
        } else {
          wx.showToast({
            title:obj.msg,
            icon:'error',
            duration: 2000
           })
          that.setData({
            disabled:false
          })
        }
      },
      fail:function(res){
        wx.showToast({
          title:'提交失败',
          icon:'error',
          duration: 2000
         })
        that.setData({
          disabled:false
        })
      }
    })
    }
  }
});