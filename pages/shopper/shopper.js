Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechat: "wu_yve",
    phone: "13216137746"
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
    
  },
  // 复制微信号
  pasteWechat: function(e) {
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data: this.data.wechat,
      success: function (res) {
        wx.getClipboardData({
          success: function(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  // 拨打电话
  getCall: function() {
    let that = this
    // 提示呼叫号码还是将号码添加到手机通讯录
    wx.showActionSheet({
      itemList: ["呼叫", "添加联系人"],
      success: function(res) {
        if(res.tapIndex === 0) {
          // 呼叫号码
          wx.makePhoneCall({
            phoneNumber: that.data.phone,
          })
        } else if(res.tapIndex === 1) {
          // 添加手机联系人
          wx.addPhoneContact({
            firstName: '一沐·SPA',  // 联系人姓名
            mobilePhoneNumber: that.data.phone  // 手机号码
          })
        }
      }
    })
  },
  // 返回上一页
  goBack: function() {
    wx.navigateBack({
      delta: 1
    })
  }
})