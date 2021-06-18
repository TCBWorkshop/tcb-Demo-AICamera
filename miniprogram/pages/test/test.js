Page({
  data: {

  },

  onLoad: function (options) {

  },
  async createCanvas(filePath) {
    const imgurl = "https://tcb-1251009918.cos.ap-guangzhou.myqcloud.com/demo/canvas.jpg"
    const qrcode = "https://tcb-1251009918.cos.ap-guangzhou.myqcloud.com/demo/qrcode.jpg"
    const query = wx.createSelectorQuery()
    query.select('#canvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        console.log("节点的相关信息", res)
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio

        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        const img1 = canvas.createImage()
        const img2 = canvas.createImage()

        const base64Image = wx.getFileSystemManager().readFileSync(filePath, "base64")

        img1.onload = function () {
          img2.src = 'data:image/png;base64,' + base64Image;
        };
        img2.onload = function () {
          ctx.drawImage(img1, 0, 0, res[0].width, res[0].height);
          ctx.drawImage(img2, 35, 100, 150, 195);
        };
        img1.src = imgurl
      })
  },
  async uploadImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log("临时文件地址", tempFilePaths)
        that.createCanvas(tempFilePaths[0])
        // that.uploadStorage(tempFilePaths[0])
      }
    })
  },
  // async uploadStorage(filePath){
  //   const that = this
  //   wx.cloud.uploadFile({
  //     cloudPath: 'test.png',
  //     filePath: filePath, // 文件路径
  //   }).then(async res => {
  //     const result = await wx.cloud.getTempFileURL({
  //       fileList: [{
  //         fileID: res.fileID
  //       }]
  //     })
  //     console.log("获取到的云存储临时文件",result)
  //     that.createCanvas(result.fileList[0].tempFileURL)
  //   }).catch(error => {

  //   })

  // }
})