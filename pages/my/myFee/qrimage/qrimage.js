// pages/my/myFee/qrimage/qrimage.js
const QR = require('../../../../lib/weapp.qrcode.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrSrc: '',
    qrcode: ''
  },
  getQRCodeSize: function() {
    let size = 0;
    try {
      let res = wx.getSystemInfoSync();
      let scale = res.windowWidth / 750;
      let width = 300 * scale;
      size = width;
    } catch (e) {
      console.log('获取设备信息失败' + e);
      size = 150;
    }
    return size;
  },
  createQRCode: function(text, size) {
    // 调用插件中的draw方法，绘制二维码图片
    let that = this;
    try {
      let _img = QR.createQrCodeImg(text, {
        size: parseInt(size)
      });
      that.setData({
        'qrcode': _img
      })
    } catch (e) {
      console.log(e)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let qrcodeSize = that.getQRCodeSize();
    let text = options.text;
    that.createQRCode(text, qrcodeSize);
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
})