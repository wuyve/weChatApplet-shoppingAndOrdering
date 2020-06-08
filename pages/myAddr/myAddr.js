Page({

  /**
   * 页面的初始数据
   */
  data: {
    myAddr: [
      {username: '吴月', userphone: 13216137746, userArea: ['浙江省', '杭州市', '江干区'], userAddr: '杭州电子科技大学'},
      {username: '吴月1', userphone: 13216137746, userArea: ['浙江省', '杭州市', '江干区'], userAddr: '杭州电子科技大学'},
      {username: '吴月2', userphone: 13216137746, userArea: ['浙江省', '杭州市', '江干区'], userAddr: '杭州电子科技大学'},
      {username: '吴月3', userphone: 13216137746, userArea: ['浙江省', '杭州市', '江干区'], userAddr: '杭州电子科技大学'},
      {username: '吴月4', userphone: 13216137746, userArea: ['浙江省', '杭州市', '江干区'], userAddr: '杭州电子科技大学'}
    ],
    chooseAddr: {}
  },
  // 将手机号码隐藏为前三位+****+后四位
  hidePhoneNum: function (phoneNum = this.data.myAddr) {
    for (let i = 0, len = phoneNum.length; i < len; i++) {
      let str = phoneNum[i].userphone.toString();
      let hidePhone = str.substring(0,3) + '****' + str.substring(7, 11);
      phoneNum[i].hidePhone = hidePhone;
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
        username: info.username,
        userphone: info.userphone,
        userArea: info.userArea,
        userAddr: info.userAddr
      }
    })
  },
  // 编辑地址
  editAddr: function (e) {
    console.log(e.currentTarget.dataset.userinfo);
    let info = e.currentTarget.dataset.userinfo;
    let url = `./addAddr/addAddr?username=${info.username}&userphone=${info.userphone}&userArea=${info.userArea}&userAddr=${info.userAddr}`
    wx.navigateTo({
      url: url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.hidePhoneNum();
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