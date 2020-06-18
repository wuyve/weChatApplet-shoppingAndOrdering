Page({

  /**
   * 页面的初始数据
   */
  data: {
    myAddr: [],
    chooseAddr: {}
  },
  // 将手机号码隐藏为前三位+****+后四位
  hidePhoneNum: function (phoneNum) {
    for (let i = 0, len = phoneNum.length; i < len; i++) {
      console.log(typeof phoneNum[i].link_area)
      let str = phoneNum[i].link_phone.toString();
      let hidePhone = str.substring(0,3) + '****' + str.substring(7, 11);
      phoneNum[i].hidePhone = hidePhone;
      phoneNum[i].link_area = phoneNum[i].link_area.slice(1, phoneNum[i].link_area.length - 1).split(',');
    }
    this.setData({
      myAddr: phoneNum
    })
  },
  // 选择地址
  chooseAddr: function (e) {
    console.log(e.currentTarget.dataset.info);
    let info = e.currentTarget.dataset.info;
    this.setData({
      chooseAddr: {
        link_name: info.link_name,
        link_phone: info.link_phone,
        link_area: info.link_area,
        link_addr: info.link_addr
      }
    })
  },
  // 编辑地址
  editAddr: function (e) {
    console.log(e.currentTarget.dataset.userinfo);
    let info = e.currentTarget.dataset.userinfo;
    let url = `./addAddr/addAddr?link_name=${info.link_name}&link_phone=${info.link_phone}&link_area=${info.link_area}&link_addr=${info.link_addr}&receive_id=${info.receive_id}`
    wx.navigateTo({
      url: url
    })
  },
  // 获取用户的收货地址
  getUserAddr: function () {
    let params = {
      open_id: 'wu-yve'
    }
    let that = this;
    wx.request({
      url: 'http://localhost:8000/receive/address/get',
      method: 'GET',
      data: params,
      success (res) {
        console.log(res);
        that.hidePhoneNum(res.data.results);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserAddr();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  addAddr: function() {
    wx.navigateTo({
      url: 'addAddr/addAddr',
    })
  }
})