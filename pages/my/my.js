// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    showMyHeader: false,
    showLoginBtn: true,
    canIUse: wx.canIUse('image.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserData()
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
  // 获取用户头像及相关信息
  getUserData: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        showMyHeader: true,
        showLoginBtn: false
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          showMyHeader: true,
          showLoginBtn: false
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            showMyHeader: true,
            showLoginBtn: false
          })
        }
      })
    }
  },
  // 登陆
  login: function() {
    console.log(app.globalData.userInfo);
    if (JSON.stringify(app.globalData.userInfo) == "{}" || app.globalData.userInfo == null) {
      let that = this
      wx.login({
        success(res) {
          if (res.code) {
            console.log(res.code)
            //发起网络请求
            wx.request({
              url: 'https://test.com/onLogin',
              data: {
                code: res.code
              }
            })
            that.setData({
              hasUserInfo: true,
              showMyHeader: true,
              showLoginBtn: false
            }, () => that.getUserData())
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },
  // 跳转到商家页面
  toShopper: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../shopper/shopper',
    })
  },
  // 收货地址
  myAddr: function(e) {
    wx.navigateTo({
      url: '../myAddr/myAddr',
    })
  }
})