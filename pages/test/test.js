// pages/test/test.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '预定',
    time: "12:01",
    beginTime: '09:00',
    endTime: '19:00',
    date: '2019-12-05',
    beginDate: '2019-12-01',
    endDate: '2019-12-8'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTime()
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
  // 获取今日时间
  getTime: function () {
    let now = new Date()
    let year = now.getFullYear(), day = now.getDate(), month = now.getMonth() + 1
    let min = now.getMinutes(), hour = now.getHours()
    if (month < 10) month = `0${month}`
    if (day < 10) day = `0${day}`
    if (min < 10) min = `0${min}`
    if (hour < 10) hour = `0${hour}`
    let future = new Date(now)
    future.setDate(now.getDate() + 7)
    let year7 = future.getFullYear(), day7 = future.getDate(), month7 = future.getMonth() + 1
    if (month7 < 10) month = `0${month7}`
    if (day7 < 10) day = `0${day7}`
    this.setData({
      date: `${year}-${month}-${day}`,
      beginDate: `${year}-${month}-${day}`,
      endDate: `${year7}-${month7}-${day7}`,
      time: `${hour}:${min}`,
      beginTime: "09:00",
      endTime: "19:00"
    })
    // if (this.data.date == `${year}-${month}-${day}` && (hour >= 9 && hour < 19)) {
    //   // 在当天工作时间内
    //   this.setData({
    //     time: `${hour}:${min}`,
    //     beginTime: `${hour}:${min}`,
    //     endTime: `19:00`
    //   })
    // } else if (this.data.date == `${year}-${month}-${day}` && (hour < 9 || hour >= 19)) {
    //   this.setData({
    //     time: '09:00',
    //     beginTime: '9:00',
    //     endTime: '19:00'
    //   })
    // } else if (this.data.date != `${year}-${month}-${day}`) {
    //   console.log(`${year}-${month}-${day}`)
    //   this.setData({
    //     time: '09:00',
    //     beginTime: '9:00',
    //     endTime: '19:00'
    //   })
    // }
    console.log('beginDate', this.data.beginDate)
  },
  // 绑定时间
  bindTimeChange: function (e) {
    console.log('选择的时间为：', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  // 绑定日期
  bindDateChange: function (e) {
    console.log('选择的日期为：', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 检测用户是否登陆
  getUserInfo: function () {
    console.log(app.globalData.userInfo);
    if (JSON.stringify(app.globalData.userInfo) != "{}" || app.globalData.userInfo != null) {
      let currentTime = new Date()
      let thisTime = `${this.data.date} ${this.data.time}`
      thisTime = thisTime.replace("-", "/")
      thisTime = new Date(Date.parse(thisTime))
      if (thisTime < currentTime) {
        console.log("预约失败")
        this.popErrorIcon()
      } else {
        this.popConfirm()
      }
    } else {

    }
  },
  // 确定选择日期的弹窗
  popConfirm: function () {
    let that = this
    wx.showModal({
      title: '选择日期',
      content: `您预约的时间为 ${this.data.date} ${this.data.time}`,
      success: function (res) {
        if (res.confirm) {
          that.popSuccessTest()
        } else {
        }
      }
    })
  },
  // 预约成功
  popSuccessTest: function () {
    wx.showToast({
      title: '成功',
      duration: 2000,      //停留时间
    })
  },
  // 预约失败
  popErrorIcon: function () {
    wx.showToast({
      title: '预约时间错误',
      image: '../../imgs/error.png',  //image的优先级会高于icon
      duration: 2000
    })
  },
})