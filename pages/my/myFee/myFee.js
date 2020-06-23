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
];
let resultArr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCanFee: true,
    isShopperFee: false,
    isNotFee: false,
    isUsed: false,
    canFeeLists,
    shopperFee,
    notFee,
    usedFee: [],
    width: ''
  },
  // 显示可用优惠券样式
  showCanFee: function () {
    // 获取可用优惠券
    // user_type: 0; status: 0
    let that = this;
    this.getFee(0, 0).then(function (res) {
      let canFeeLists = res;
      that.setData({
        canFeeLists
      });  
    });
    this.setData({
      isCanFee: true,
      isShopperFee: false,
      isNotFee: false,
      isUsed: false
    });
  },
  // 显示商家红包样式
  showShopperFee: function () {
    let that = this;
    this.getFee(0, 1).then(function (res) {
      let shopperFee = res;
      that.setData({
        shopperFee
      })
    });
    this.setData({
      isCanFee: false,
      isShopperFee: true,
      isNotFee: false,
      isUsed: false
    });
  },
  // 显示失效券样式
  showNotFee: function () {
    let that = this;
    this.getFee(2).then(function (res) {
      let notFee = res;
      that.setData({
        notFee
      }, () => console.log(that.data.notFee))
    });
    this.setData({
      isCanFee: false,
      isShopperFee: false,
      isNotFee: true,
      isUsed: false
    });
  },
  // 显示已使用券的样式
  showUsedFee: function () {
    let that = this;
    this.getFee(1).then(function (res) {
      let usedFee = res;
      that.setData({
        usedFee
      }, () => console.log(that.data.usedFee))
    });
    this.setData({
      isCanFee: false,
      isShopperFee: false,
      isNotFee: false,
      isUsed: true
    });
  },
  // 使用优惠券
  useFee: function(e) {
    let text = {
      open_id: 'wu-yve',
      qr_id: 20
    };
    text = JSON.stringify(text); // 将对象转换为string格式
    wx.navigateTo({
      url: `./qrimage/qrimage?text=${text}`
    });
  },
  // 获取优惠券
  getFee: function (status, use_type) {
    return new Promise(function (resolve, reject) {
      let params = {
        open_id: 'wu-yve',
        status
      };
      if (use_type) {
        params.use_type = use_type;
      }
      wx.request({
        url: 'http://localhost:8000/coupon/get',
        method: 'GET',
        data: params,
        success (res) {
          console.log(res);
          if (res.data.errno.errno == 200) {
            let resultArr = res.data.results;
            resolve(resultArr);
          } else {
            wx.showModal({
              title: '失败',
              content: '获取优惠券失败',
              showCancel: false
            });
          }
        },
        fail () {
          reject('系统异常，请刷新重试');
        }
      });  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取可用优惠券
    // user_type: 0; status: 0
    let that = this;
    this.getFee(0, 0).then(function (res) {
      let canFeeLists = res;
      that.setData({
        canFeeLists
      });  
    });
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