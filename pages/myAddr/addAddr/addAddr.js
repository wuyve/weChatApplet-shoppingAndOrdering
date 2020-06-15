// pages/myAddr/addAddr/addAddr.js
var addr = require('../../../utils/addr/addr');
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    userInfo: {
      username: '',
      userphone: null,
      userArea: ['浙江省', '杭州市', '江干区'],
      userAddr: []
    },
    isEdit: false
  },
  // 赋值用户名
  evalName: function (e) {
    let username = 'userInfo.username';
    this.setData({
      [username]: e.detail.value
    });
  },
  // 赋值手机号
  evalPhone: function (e) {
    console.log(e.detail.value)
    let userphone = 'userInfo.userphone'
    this.setData({
      [userphone]: e.detail.value
    })
  },
  // 地区选择器
  areaChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let userAddr = 'userInfo.userArea'
    this.setData({
      [userAddr]: e.detail.value
    })
  },
  // 赋值详细地址
  evalAddr: function (e) {
    let userAddr = 'userInfo.userAddr';
    this.setData({
      [userAddr]: e.detail.value
    });
  },
  // 提交表单: 校验表单
  submitAddr: function () {
    let param = this.data.userInfo;
    let reg = /^1[3456789]\d{9}$/;
    if (!param.username) {
      this.promptBox('姓名错误', '请填写姓名', '确定', false)
    } else if (!reg.test(param.userphone)) {
      this.promptBox('手机号码错误', '请输入正确的手机号码', '确定', false)
    } else if (!param.userAddr) {
      this.promptBox('详细地址错误', '请填写详细地址', '确定', false)
    } else {
      let that = this;
      let params = {
        is_default: 1,
        open_id: 'wu-yve',
        link_name: param.username,
        link_phone: param.userphone,
        link_area: `'${param.userArea}'`,
        link_addr: param.userAddr
      };
      wx.request({
        url: 'http://localhost:8000/receive/address/add',
        data: params,
        method: 'POST',
        success (res) {
          wx.showModal({
            title: '成功',
            content: '添加收货地址成功',
            showCancel: true,
            cancelText: '继续添加',

            confirmText: '返回',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../myAddr'
                })  
              } else if (res.cancel) {
                that.setData({
                  userInfo: {
                    username: '',
                    userphone: null,
                    userArea: ['浙江省', '杭州市', '江干区'],
                    userAddr: []            
                  }
                })  
              }
            }
          })
        }
      })  
    }
    console.log(param)
  },
  // 提示框
  promptBox: function (title, content, confirmText, showCancel) {
    wx.showModal({
      title: title,
      content: content,
      confirmText: confirmText,
      showCancel: showCancel,
      success (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          if (content === '添加收货地址成功') {
            // 返回到上一页
          }
        }
      }
    })
  },
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断options是否为空
    if (Object.keys(options).length) {
      console.log(options);
      options.userArea = options.userArea.split(',');
      this.setData({
        userInfo: options,
        isEdit: true
      })
    }
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



