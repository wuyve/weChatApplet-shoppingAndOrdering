// pages/my/myFee/myFee.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCanFee: true,
    isShopperFee: false,
    isNotFee: false,
    isUsed: false,
    canFeeLists: [],
    shopperFee: [],
    notFee: [],
    usedFee: []
  },
  // 显示可用优惠券样式
  showCanFee: function () {
    // 获取可用优惠券
    // user_type: 0; status: 0
    let that = this;
    this.getFee(0, 0).then(function (res) {
      let canFeeLists = res;
      for(let i = 0, len = canFeeLists.length; i < len; i++) {
        canFeeLists[i].begin = that.formatDate(canFeeLists[i].range_begin);
        canFeeLists[i].end = that.formatDate(canFeeLists[i].range_end);
        canFeeLists[i].remain = that.remainTime(canFeeLists[i].range_end);
      }
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
      for(let i = 0, len = shopperFee.length; i < len; i++) {
        shopperFee[i].begin = that.formatDate(shopperFee[i].range_begin);
        shopperFee[i].end = that.formatDate(shopperFee[i].range_end);
        shopperFee[i].remain = that.remainTime(shopperFee[i].range_end);
      }
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
  // 转换时间格式
  formatDate: function (date) {
    return app.myTimeToLocal(date);
  },
  // 判断可用券（可用优惠券和商家红包还剩多少天可以使用）
  remainTime: function (date) {
    let endTime = new Date(date).getTime();
    let nowTime = new Date().getTime();
    return Math.floor((endTime - nowTime) / (24 * 3600 * 1000));
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
      for(let i = 0, len = canFeeLists.length; i < len; i++) {
        canFeeLists[i].begin = that.formatDate(canFeeLists[i].range_begin);
        canFeeLists[i].end = that.formatDate(canFeeLists[i].range_end);
        canFeeLists[i].remain = that.remainTime(canFeeLists[i].range_end);
      }
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