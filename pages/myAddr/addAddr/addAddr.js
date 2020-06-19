// pages/myAddr/addAddr/addAddr.js
var addr = require('../../../utils/addr/addr');
var userAddr;
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    userInfo: {
      link_name: '',
      link_phone: null,
      link_area: ['浙江省', '杭州市', '江干区'],
      link_addr: []
    },
    isEdit: false,
    isDel: false
  },
  // 赋值用户名
  evalName: function (e) {
    let link_name = 'userInfo.link_name';
    this.setData({
      [link_name]: e.detail.value
    });
  },
  // 赋值手机号
  evalPhone: function (e) {
    console.log(e.detail.value)
    let link_phone = 'userInfo.link_phone'
    this.setData({
      [link_phone]: e.detail.value
    })
  },
  // 地区选择器
  areaChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let link_area = 'userInfo.link_area'
    this.setData({
      [link_area]: e.detail.value
    })
  },
  // 赋值详细地址
  evalAddr: function (e) {
    let link_addr = 'userInfo.link_addr';
    this.setData({
      [link_addr]: e.detail.value
    });
  },
  // 提交表单: 校验表单
  submitAddr: function () {
    let param = this.data.userInfo;
    let reg = /^1[3456789]\d{9}$/;
    if (!param.link_name) {
      this.promptBox('姓名错误', '请填写姓名', '确定', false)
    } else if (!reg.test(param.link_phone)) {
      this.promptBox('手机号码错误', '请输入正确的手机号码', '确定', false)
    } else if (!param.link_addr) {
      this.promptBox('详细地址错误', '请填写详细地址', '确定', false)
    } else {
      let that = this;
      let params = {
        is_default: 1,
        open_id: 'wu-yve',
        link_name: param.link_name,
        link_phone: param.link_phone,
        link_area: `'${param.link_area}'`,
        link_addr: param.link_addr
      };
      if (!that.data.isEdit) {
        // 添加地址
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
                      link_name: '',
                      link_phone: null,
                      link_area: ['浙江省', '杭州市', '江干区'],
                      link_addr: []            
                    }
                  })  
                }
              }
            })
          }
        })  
      } else {
        // 修改地址
        params.receive_id = userAddr.receive_id;
        console.log(params);
        wx.request({
          url: 'http://localhost:8000/receive/address/modify',
          method: 'POST',
          data: params,
          success (res) {
            if (res.data.errno.errno == 200) {
              wx.showModal({
                title: '修改成功',
                content: '修改收货地址成功',
                showCancel: false,
                confirmText: '确定',
                confirmColor: '#587C0C',
                success (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../myAddr'
                    })
                  }
                }
              })
            } else {
              wx.showModal({
                title: '修改失败',
                content: '修改收货地址失败',
                showCancel: false,
                confirmText: '确定',
                confirmColor: '#FF0000',
                success (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../myAddr'
                    })
                  }
                }
              })
            }
          }
        })
      }
    }
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
  // 删除地址
  delAddr: function () {
    let that = this;
    wx.showModal({
      title: '删除地址',
      content: '确定要删除这个地址吗？',
      showCancel: true,
      cancelText: '点错了',
      cancelColor: '#E33E33',
      confirmText: '删除',
      confirmColor: '#4169E1',
      success (res) {
        if (res.confirm) {
          console.log(userAddr);
          that.confirmDelAddr(userAddr);
        } else if (res.cancel) {
        }
      }
    })
  },
  // 调用删除收货地址的API
  confirmDelAddr: function (userAddr) {
    let params = {
      open_id: 'wu-yve',
      receive_id: userAddr.receive_id
    };
    wx.request({
      url: 'http://localhost:8000/receive/address/delete',
      method: 'DELETE',
      data: params,
      success (res) {
        if (res.data.errno.errno = 200) {
          wx.navigateTo({
            url: '../myAddr'
          });
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          });
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
      options.link_area = options.link_area.split(',');
      userAddr = options;
      this.setData({
        userInfo: options,
        isEdit: true,
        isDel: true
      });
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



