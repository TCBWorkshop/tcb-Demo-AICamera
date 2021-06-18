App({
  onLaunch: function() {
    wx.cloud.init({
      traceUser: true,
      envId: "xly-xrlur"
    });
  },
  globalData: {
    userInfo: null,
    temUrl:'',
    fileID:'',
    rect: null,
    filterTemUrl:''
  }
});
