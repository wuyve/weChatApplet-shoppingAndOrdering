// pages/my/my.js
const app = getApp();
const bmap = require('../../lib/bmap-wx.js');
var BMap;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    showMyHeader: false,
    showLoginBtn: true,
    canIUse: wx.canIUse('image.open-type.getUserInfo'),
    username: '',
    myOrderLists: [
      {
        src: '../../imgs/my01.png',
        text: '待付款',
        url: ''
      }, {
        src: '../../imgs/my02.png',
        text: '待发货',
        url: ''
      }, {
        src: '../../imgs/my03.png',
        text: '待收货',
        url: ''
      }, {
        src: '../../imgs/my04.png',
        text: '已完成',
        url: ''
      }
    ],
    myBlockLists: [
      {
        src: '../../imgs/myOrder.png',
        text: '我的预约',
        url: './myappoint/myappoint'
      }, {
        src: '../../imgs/myFee.png',
        text: '我的优惠券',
        url: './myFee/myFee'
      }, {
        src: '../../imgs/myAddr.png',
        text: '收货地址',
        url: '../myAddr/myAddr'
      }, {
        src: '../../imgs/tele.png',
        text: '联系商家',
        url: '../shopper/shopper'
      }
    ],
    latitude: 0,
    longitude: 0,
    city: ''  
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
      let that = this;
      wx.login({
        success(res) {
          let code = res.code;
          console.log(code)
          if (code === '' || code === undefined) {
            // 提示用户进行登录
            wx.showToast({
              title: '获取用户登录态失败！请检查网络',
              icon: 'none'
            })
            return;  
          } else {
            that.setData({
              hasUserInfo: true,
              showMyHeader: true,
              showLoginBtn: false
            }, () => that.getUserData())
            // 获取用户信息
            wx.getUserInfo({
              success: function (res) {
                console.log(res)
                let data = {
                  js_code: code,
                  createDate: new Date(),
                  username: res.userInfo.nickName
                };
                wx.request({
                  url: `http://localhost:8000/regist?js_code=${data.js_code}&createDate=${data.createDate}&username=${data.username}`,
                  method: 'GET',
                  success: function (data) {
                    that.getUserLocation()
                  },
                  fail: function(res) {
                    console.log(res)
                  }
                })
              },
              fail: function(res) {
                wx.reLaunch({
                  url: '',
                })
              },
            })
          }
        }
      })
    }
  },
  // 获取用户位置
  getUserLocation: function () {
    let that = this;
    BMap = new bmap.BMapWX({
      ak: 'Na4coTxBBBC8kYiv2rXVVTelD0ny2nVh'
    });
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.userLocation']) {
          // 用户未授权的情况下，弹出授权框
          wx.authorize({
            scope: 'scope.userLocation',
            success: function() {
              // 用户同意小程序使用位置授权
              wx.getLocation({
                type: 'gcj02',
                success: function(res) {
                  that.latitude = res.latitude;
                  that.longitude = res.longitude;
                  // 根据坐标获取当前位置名称，显示在顶部：百度地图逆地址解析
                  Bmap.regeocoding({
                    success: function(res) {
                      let city =  res.originalData.result.addressComponent.city;
                      that.city = city
                    },
                    fail: function (res) {
                      console.log(res)
                    }
                  })
                }
              })
            },
            fail: function (Res) {
              // 授权失败 用户拒绝授权
              console.log(res)
            }
          })
        } else {
          // 用户已经授权 获取当前位置
          wx.getLocation({
            type: 'gcj02',
            success: function(res) {
              that.latitude = res.latitude;
              that.longitude = res.longitude;
              //2、根据坐标获取当前位置名称，显示在顶部:百度地图逆地址解析
              BMap.regeocoding({
                success: function(res) {
                  var city = res.originalData.result.addressComponent.city;
                  that.city = city
                },
                fail: function(res) {
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })
  },
  // 跳转到商家页面
  toShopper: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../shopper/shopper',
    })
  },
  // 收货地址
  toOtherPage: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  // 点击我的订单相关项目，跳转到相关页面
  toPage: function(e) {
    console.log(e);
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  }
})