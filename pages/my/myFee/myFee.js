// pages/my/myFee/myFee.js
// 有效券
var canFeeLists = [
  {type: '面膜现金券', date: '2020.6.8 12:00-2020.6.12 17:59', where: '到家可用', money: 5, require: '100', remain: 4, remark: '仅用于购买面膜'},
  {type: '通用现金券', date: '2020.6.1 12:00-2020.6.30 17:59', where: '门店可用', money: 40, require: '300', remain: 22, remark: '特殊商品除外，不可和其他券叠加使用'}
];
// 商家红包
var shopperFee = [
  {type: '满减券', data: '2020.6.10 00:00-20206.16 23:59', money: 2.25, remark: '100元洗面奶满减券'},
  {type: '立减券', data: '2020.6.10 00:00-20206.16 23:59', money: 20, remark: '20元门店优惠券'}
];
// 失效券
var notFee = [
  {type: '面膜现金券', date: '2020.6.8 12:00-2020.6.12 17:59', where: '到家可用', money: 5, require: '100', remain: 4, remark: '仅用于购买面膜'},
  {type: '满减券', data: '2020.6.10 00:00-20206.16 23:59', money: 2.25, remark: '100元洗面奶满减券'},
  {type: '立减券', data: '2020.6.10 00:00-20206.16 23:59', money: 20, remark: '20元门店优惠券'},
  {type: '通用现金券', date: '2020.6.1 12:00-2020.6.30 17:59', where: '门店可用', money: 40, require: '300', remain: 22, remark: '特殊商品除外，不可和其他券叠加使用'}
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCanFee: true,
    isShopperFee: false,
    isNotFee: false,
    canFeeLists,
    shopperFee,
    notFee
  },
  // 显示可用优惠券样式
  showCanFee: function () {
    this.setData({
      isCanFee: true,
      isShopperFee: false,
      isNotFee: false
    })
  },
  // 显示商家红包样式
  showShopperFee: function () {
    this.setData({
      isCanFee: false,
      isShopperFee: true,
      isNotFee: false
    })
  },
  // 显示失效券样式
  showNotFee: function () {
    this.setData({
      isCanFee: false,
      isShopperFee: false,
      isNotFee: true
    })
  },
  // 尝试发起HTTPS请求
  request: function () {
    let params = {
      username: 'wuyve',
      age: 11,
      male: 2
    };
    wx.request({
      url: 'http://localhost:8000/', //仅为示例，并非真实的接口地址
      method: 'GET',
      data: params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})