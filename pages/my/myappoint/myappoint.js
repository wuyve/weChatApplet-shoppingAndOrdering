// pages/my/myappoint/myappoint.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isbegin: true,
    isfinish: false,
    iscancel: false,
    isinvalid: false,
    beginApArr: [],
    finishApArr: [],
    cancelApArr: [],
    invalidApArr: []
  },
  // 显示未开始预约的项目
  showBeginAp: function () {
    this.setData ({
      isbegin: true,
      isfinish: false,
      iscancel: false,
      isinvalid: false  
    });
    this.getAppointMsg(0);
  },
  // 显示已完成的项目
  showFinishAp: function () {
    this.setData ({
      isbegin: false,
      isfinish: true,
      iscancel: false,
      isinvalid: false  
    });
    this.getAppointMsg(1);
  },
  // 显示已取消的项目
  showCancelAp: function () {
    this.setData ({
      isbegin: false,
      isfinish: false,
      iscancel: true,
      isinvalid: false  
    });
    this.getAppointMsg(2);
  },
  // 显示已失效的项目
  showInvalidAp: function () {
    this.setData ({
      isbegin: false,
      isfinish: false,
      iscancel: false,
      isinvalid: true  
    });
    this.getAppointMsg(3);
  },
  // 获取预约信息
  getAppointMsg: function (opera) {
    let that = this;
    let params = {
      open_id: 'wu-yve',
      opera: opera
    };
    wx.request({
      url: 'http://localhost:8000/appoint/get',
      method: 'GET',
      data: params,
      success (res) {
        console.log(res);
        if (res.data.errno.errno == 200) {
          let arr = res.data.results;
          for(let i = 0, len = arr.length; i < len; i++) {
            arr[i].LocalDate = that.myTimeToLocal(arr[i].date);
            switch(arr[i].item) {
              case 0:
                arr[i].item_msg = '全项';
                break;
              case 1:
                arr[i].item_msg = '按摩';
                break;
              case 2:
                arr[i].item_msg = '做脸';
                break;
              case 3:
                arr[i].item_msg = '拔罐';
                break;
              case 4:
                arr[i].item_msg = '祛痘';
                break;
              default:
                arr[i].item_msg = '未知项目';
            }
          }
          if (opera == 0) {
            that.setData({
              beginApArr: arr
            });
          } else if (opera == 1) {
            that.setData({
              finishApArr: arr
            });
          } else if (opera == 2) {
            that.setData({
              cancelApArr: arr
            });
          } else if (opera == 3) {
            that.setData({
              invalidApArr: arr
            });
          }
        }
      }
    });
  },
  // 时间转换
  myTimeToLocal: function (inputTime) {
    let localTime = '';
    inputTime = new Date(inputTime).getTime();
    const offset = (new Date()).getTimezoneOffset();
    localTime = (new Date(inputTime - offset * 60000)).toISOString();
    localTime = localTime.substr(0, localTime.lastIndexOf('.'));
    localTime = localTime.replace('T', ' ');
    return localTime;
  },
  // 修改预约信息
  modifyAp: function (e) {
    console.log(e.currentTarget.dataset.appointinfo);
    let info = e.currentTarget.dataset.appointinfo;
    let url = `../../test/test?date=${info.date}&LocalDate=${info.LocalDate}&appoint_id=${info.appoint_id}&item=${info.item}&item_msg=${info.item_msg}`
    wx.reLaunch({
      url: url
    });
  },
  // 删除预约信息
  deleAp: function (e) {
    console.log(e.currentTarget.dataset.appointinfo);
    let info = e.currentTarget.dataset.appointinfo;
    let that = this;
    wx.showModal({
      title: '删除',
      content: '确定要删除吗？',
      showCancel: true,
      cancelText: '点错了',
      cancelColor: '#000',
      confirmText: '删除',
      confirmColor: '#8BC34A',
      success (res) {
        if (res.confirm) {
          // 确定要删除
          let params = {
            open_id: 'wu-yve',
            appoint_id: info.appoint_id
          };
          wx.request({
            url: 'http://localhost:8000/appoint/delete',
            method: 'DELETE',
            data: params,
            success (res) {
              console.log(res);
              if (res.data.errno.errno == 200) {
                that.onLoad();
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                });
              } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none',
                  duration: 2000
                });
              }
            }
          })
        } else if (res.cancel) {
          // 不删除
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAppointMsg(0)
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