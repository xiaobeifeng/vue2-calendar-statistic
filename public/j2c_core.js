/**
 * @description This is common js for intercept with Native Application using jsbridge
 *
 * @version 2.0.7
 * 修改sendRequest中AutoEndcode为undefined时的默认值为true
 *
 * @version 2.0.6
 * 增加saveNativeStorageWithCallback函数
 *
 * @version 2.0.5
 * 修改registerBroadcast微信端调用方法
 * 修改getNativeStorage微信调用方法
 *
 * @version 2.0.4
 * 增加downloadFile函数
 *
 * @version 2.0.3
 * 增加Multipart方式文件上传方法
 *
 * @version 2.0.2
 * 增加rightName设置相关方法，放开createNewWebPage中rightName设置
 *
 * @version 2.0.1
 * 补充WebViewJavascriptBridge兼容的部分
 *
 * @version 2.0.0
 * core，kit，pwa整体升级2.0.0版本
 *
 */

/**
 * @description 全局变量
 */
var J2C_CONFIG = {
  pc: false // 是否pc端，默认初始false
}

/**
 * @description 注册函数
 * @ignore
 */
;(function() {
  /**
   * @description 判断window对象中是否存在"J2C"，如果不存在，注册命名空间 'J2C' 到window对象上
   * @ignore
   **/
  if (undefined == window['J2C']) {
    window['J2C'] = {}
  }

  // ---------- JS -> Native ---------------------

  /**
   * @description J2C环境Ready的Callback
   * @ignore
   */
  j2cReadyCallback = function(event) {
    alert('J2C环境准备好了，喊你回家吃饭')
  }

  /**
   * @description 注册J2C环境Ready的Callback
   */
  function registerJ2CReadyCallback(callback) {
    if (window.iosdkqgqc) {
      // ios
      setTimeout(function() {
        callback('j2c_ready')
      }, 10)
    } else if (window.WebViewJ2CJavascriptBridge) {
      // android
      setTimeout(function() {
        callback('j2c_ready')
      }, 10)
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      // android
      setTimeout(function() {
        callback('j2c_ready')
      }, 10)
    } else {
      if (J2C_CONFIG.pc) {
        // 浏览器使用
        setTimeout(function() {
          callback('j2c_ready')
        }, 10)
      } else {
        j2cReadyCallback = callback
        // 把环境Ready的事件回调注册到document中
        var j2cdoc = document
        j2cdoc.addEventListener('WebViewJ2CJavascriptBridgeReady', j2cReadyCallback, false) // app Android 端常用
        j2cdoc.addEventListener('WebViewJavascriptBridgeReady', j2cReadyCallback, false) // app Android 端常用
        j2cdoc.addEventListener('WeixinJSBridgeReady', j2cReadyCallback, false) // 微信端
        j2cdoc.addEventListener('AlipayJSBridgeReady', j2cReadyCallback, false) // 支付宝端
      }
    }
  }
  // ---------- call Android Application from js---------------------

  // ----------- others -----------------------------------------------
  /**
   * @description 通过原生弹出一个Toast
   * @param {*}toast： 显示内容
   */
  function showNativeToast(toast) {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.showToast.postMessage({
        body: toast
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.showToast',
        {
          param: toast
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.showToast',
        {
          param: toast
        },
        function(responseData) {}
      )
    } else if (window.WeixinJSBridge) {
      webshowNativeToast(toast)
    } else if (window.AlipayJSBridge) {
      webshowNativeToast(toast)
    } else {
      webshowNativeToast(toast)
    }
  }

  /**
   * @description 通过createNewWebPage打开一个新的page，如果用默认式样，则naviStyle可以不设置。其中naviStyle的naviBackTheme分为“LIGHT”，“GRAY”，“DARK”三种备选值。
   * @param {*} obj： {pageId:界面标识,url:地址,param:当前界面向新界面传的的参数,titleName：导航栏标题, naviStyle:{naviColor: 导航条颜色如#1B77FE, naviTitleColor:导航栏标题颜色如#1B77FE, naviBackTheme:返回键类型,rightBtnColor:右侧文字颜色},rightName:导航栏右侧按钮文字（最多四个字）}
   * 特别说明：当右侧按钮需要显示自定义图标时，rightName的值传入如下格式："image:base64,aabbccddeeffgg" (其中aabbccddeeffgg为图标的base64值，图标尺寸120*88，大小不超过10K)
   *
   */
  function createNewWebPage(obj) {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.createNewWebPage.postMessage({
        body: obj
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.createNewWebPage', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.createNewWebPage', obj, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
      webcreateNewWebPage(obj)
    } else if (window.AlipayJSBridge) {
      webcreateNewWebPage(obj)
    } else {
      webcreateNewWebPage(obj)
    }
  }

  /**
   * @description 通过setCurPageId设置当前页面的pageID
   * @param {*} obj： {pageId:界面标识}
   */
  function setCurPageId(obj) {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.setCurPageId.postMessage({
        body: obj
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.setCurPageId', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.setCurPageId', obj, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
      webSetCurPageId(obj)
    } else if (window.AlipayJSBridge) {
      webSetCurPageId(obj)
    } else {
      webSetCurPageId(obj)
    }
  }

  /**
   * @description 定义replaceBackBtnAction替换nativeBar 返回按钮事件的callback
   * @param {*} pageId: 为当前页的pageId
   * @ignore
   */
  var replaceBackBtnActionCallback = new function(pageId) {}()
  /**
   * @description 通过replaceBackBtnAction替换nativeBar 返回按钮事件
   * @param {*} callback： 为返回键重写的事件 格式为function(pageId) {}，pageId为当前页面的pageId
   */
  function replaceBackBtnAction(callback) {
    replaceBackBtnActionCallback = callback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.replaceBackBtnAction.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.replaceBackBtnAction', {}, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.replaceBackBtnAction', {}, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
      backBtnAction(callback)
    } else if (window.AlipayJSBridge) {
      backBtnAction(callback)
    } else {
      backBtnAction(callback)
    }
  }

  /**
   * @description 触发CustomBackAction的Native回调
   * @ignore
   */
  function onCustomBackAction(pageid) {
    replaceBackBtnActionCallback(pageid)
  }

  /**
   * @description 定义获取从其他页面createNewWebPage到自己时其他页面传入的参数的callback,既createNewPage中的param
   * @ignore
   */
  var fetchParamCallback = new function(obj) {}()
  /**
   * @description 获取从其他页面createNewWebPage到自己时其他页面传入的参数
   * @param {*} callback:  格式为function(obj) {}
   */
  function fetchParam(callback) {
    fetchParamCallback = callback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.fetchParam.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.fetchParam', {}, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.fetchParam', {}, function(responseData) {})
    } else if (window.WeixinJSBridge) {
      webfetchParam()
    } else if (window.AlipayJSBridge) {
      webfetchParam()
    } else {
      webfetchParam()
    }
  }

  /**
   * @description 获取从其他页面createNewWebPage到自己时其他页面传入的参数的Native回调
   * @ignore
   */
  function onFetchParamSuccessed(obj) {
    fetchParamCallback(obj)
  }

  /**
   * @description 向其他页面发送消息
   * @param {*} obj:  {（required）pageId:所在page的id即发送这个请求本身这个page的id,（required）result：需要传递的内容,（required）toPageId：传递到的page的id}
   *
   */
  function sendResultToOtherPage(obj) {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.sendResultToOtherPage.postMessage({
        body: obj
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.sendResultToOtherPage', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.sendResultToOtherPage', obj, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
    } else if (window.AlipayJSBridge) {
    } else {
    }
  }

  /**
   * @description 定义接收其他页面返回的receiver
   * @ignore
   * obj
   * （required）pageId:发送消息所在page的id
   * （required）result：需要传递的内容
   * （opt）toPageId：（可以没有这个字段），这里就是接收这个obj的page的id
   */
  var receiverCallback = new function(obj) {}()

  /**
   *@description 注册其他页面返回的receiver
   *@param {*} receiver:格式function(obj) {}，其中obj格式为{（required）pageId:发送消息所在page的id，(required）result：需要传递的内容，（opt）toPageId：（可以没有这个字段），这里就是接收这个obj的page的id}
   */
  function registerReceiver(receiver) {
    receiverCallback = receiver
  }

  /**
   * @description 触发Receiver的Native回调
   * @ignore
   *（required）pageId:发送消息所在page的id
   * （required）result：需要传递的内容
   * （opt）toPageId：（可以没有这个字段），这里就是接收这个obj的page的id
   */
  function onReceiverResult(obj) {
    receiverCallback(obj)
  }

  /**
   * @description 调用申请使用net request (不要直接使用，请使用封装函数sendRequest)
   * @param {*} serialNum: 序列号（目前可以暂时赋空值）
   * @param {*} requestUrl: 端口之后的地址
   * @param {*} requestMethod： 请求方法
   * @param {*} requestQueries： 请求参数（适用于get请求，问号后的请求参数封成的对象）
   * @param {*} requestBody： 请求体
   * @param {*} callback： 回调函数 callback(statusObject, responseBody, responseHeaders);
   * @param {*} useAutoEncode,用于是否开启自动encode（仅在android上有效）（true：开启，能够解决android返回多一次decode的问题；false：不开启，原来的模式）
   */
  function requestNet(
    serialNum,
    requestUrl,
    requestMethod,
    requestQueries,
    requestBody,
    requestHeaders,
    callback,
    useAutoEncode
  ) {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.requestNet.postMessage({
        serialNum: serialNum,
        requestQueries: requestQueries,
        requestUrl: requestUrl,
        requestMethod: requestMethod,
        requestBody: requestBody,
        requestHeaders: requestHeaders
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.requestNet',
        {
          serialNum: serialNum,
          requestUrl: requestUrl,
          requestMethod: requestMethod,
          requestQueries: requestQueries,
          requestHeaders: requestHeaders,
          requestBody: requestBody,
          useAutoEncode: useAutoEncode
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.requestNet',
        {
          serialNum: serialNum,
          requestUrl: requestUrl,
          requestMethod: requestMethod,
          requestQueries: requestQueries,
          requestHeaders: requestHeaders,
          requestBody: requestBody,
          useAutoEncode: useAutoEncode
        },
        function(responseData) {}
      )
    } else if (window.WeixinJSBridge) {
      webrequestNet(
        requestUrl,
        requestMethod,
        requestQueries,
        requestBody,
        requestHeaders,
        callback,
        '微信成功'
      )
    } else if (window.AlipayJSBridge) {
      webrequestNet(
        requestUrl,
        requestMethod,
        requestQueries,
        requestBody,
        requestHeaders,
        callback,
        '支付宝成功'
      )
    } else {
      webrequestNet(
        requestUrl,
        requestMethod,
        requestQueries,
        requestBody,
        requestHeaders,
        callback,
        'pc成功'
      )
    }
  }

  /**
   * @description 存储js端请求回调的数组，用于后续根据serialNum确定回调函数的触发
   * @ignore
   */
  var callArray = []

  /**
   * @description Native中invoke了netRuest后回调JS的方法
   * @ignore
   * serialNum：请求编号
   * statusObject：格式如下
   * {"code":200,"errormsg":"details"}
   * responseBody:服务端返回body体的内容，不做封装（如果确定服务端返回的json，可以按照json对象解析）
   * responseHeaders：服务端返回的header内容，json对象封装
   */
  function onRequestNetSuccessed(serialNum, statusObject, responseBody, responseHeaders) {
    for (x in callArray) {
      var s = callArray[x].serialNum
      var netback = callArray[x].callback

      if (s == serialNum) {
        netback(statusObject, responseBody, responseHeaders)
        return
      }
    }
  }

  /**
   * @description 网络请求封装函数，对netRequest进行封装，防止乱序
   * @param {*} requestUrl: 端口之后的地址
   * @param {*} requestMethod： 请求方法
   * @param {*} requestQueries： 请求参数（适用于get请求，问号后的请求参数封成的对象）
   * @param {*} requestBody： 请求体
   * @param {*} callback： 回调函数，callback(statusObject, responseBody, responseHeaders);
   * @param {*} useAutoEncode,用于是否开启自动encode（仅在android上有效）（true：开启，能够解决android返回多一次decode的问题；false：不开启，原来的模式）
   */
  function sendRequest(
    requestUrl,
    requestMethod,
    requestQueries,
    requestBody,
    requestHeaders,
    callback,
    useAutoEncode
  ) {
    var serialNum = uuid()

    var call = {}
    call.serialNum = serialNum
    call.callback = callback
    callArray.push(call)

    if (useAutoEncode == undefined) {
      useAutoEncode = true
    }
    requestNet(
      serialNum,
      requestUrl,
      requestMethod,
      requestQueries,
      requestBody,
      requestHeaders,
      callback,
      useAutoEncode
    )
  }

  /**
   * @deprecated 已废弃
   * @ignore
   * 定义接收TitleBar的右侧Function按钮点击事件的callback
   *（required）functionId:TitleBar的右侧Function按钮点击事件的functionId
   * functionId的取值范围：
   * 首页我的图标 -> "ME"
   *
   * 其他的后续根据需要补充
   */
  var titleBarFunctionCallback = new function(obj) {}()

  /**
   * @deprecated 已废弃
   * @ignore
   * 定义注册接收TitleBar的右侧Function按钮点击事件的callback的方法
   */
  function registerTitleBarFunctionCallback(callback) {
    titleBarFunctionCallback = callback
  }

  /**
   * @deprecated 已废弃
   * @ignore
   * 触发TitleBar的右侧Function按钮点击事件的Native回调
   *（required）functionId:TitleBar的右侧Function按钮点击事件的functionId
   */
  function onTitleBarFunctionInvoked(obj) {
    titleBarFunctionCallback(obj)
  }

  // ----------- others -----------------------------------------------

  /**
   * @description 产生uuid
   * @ignore
   */
  function uuid() {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var uuid = s.join('')
    return uuid
  }

  /**
   * @description 本地化存储函数,获取用户信息，通过key 获取需要的val,注意：key与val都是字符串
   */
  function saveNativeStorage(key, val) {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.saveNativeStorage.postMessage({
        key: key,
        val: val
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.saveNativeStorage',
        {
          key: key,
          val: val
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.saveNativeStorage',
        {
          key: key,
          val: val
        },
        function(responseData) {}
      )
    } else if (window.WeixinJSBridge) {
      websaveNativeStorage(key, val)
    } else if (window.AlipayJSBridge) {
      websaveNativeStorage(key, val)
    } else {
      websaveNativeStorage(key, val)
    }
  }

  /**
   * @description 带回调，本地化存储函数,获取用户信息，通过key 获取需要的val,注意：key与val都是字符串
   */
  function saveNativeStorageWithCallback(key, val, callback) {
    var serialNum = uuid()

    var call = {}
    call.serialNum = serialNum
    call.callback = callback
    callArray.push(call)

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.saveNativeStorageWithCallback.postMessage({
        key: key,
        val: val,
        serialNum: serialNum
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.saveNativeStorageWithCallback',
        {
          key: key,
          val: val,
          serialNum: serialNum
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.saveNativeStorageWithCallback',
        {
          key: key,
          val: val,
          serialNum: serialNum
        },
        function(responseData) {}
      )
    } else if (window.WeixinJSBridge) {
      websaveNativeStorage(key, val)
      callback(JSON.stringify({ error: '' }))
    } else if (window.AlipayJSBridge) {
      websaveNativeStorage(key, val)
      callback(JSON.stringify({ error: '' }))
    } else {
      websaveNativeStorage(key, val)
      callback(JSON.stringify({ error: '' }))
    }
  }

  /**
   * 接收Native的saveNativeStorageWithCallback回调
   * par为json对象，serialNum为字符串，val为Json字符串，里面是传递的信息
   *  val里固定会有error字段，如果成功error字段为空，其他情况下error为错误信息
   */
  function onsaveNativeStorageWithCallback(par) {
    console.log(par)
    var serialNum = par.serialNum
    var val = par.val
    for (x in callArray) {
      var s = callArray[x].serialNum
      var callback = callArray[x].callback

      if (s == serialNum) {
        if (callback) {
          callback(val)
        }
        return
      }
    }
  }

  /**
   * @description 获取本地化存储
   * @param {*} skey: 键
   * @param {*} invokeCallback: 回调
   */
  function getNativeStorage(skey, invokeCallback) {
    var serialNum = uuid()
    var call = {}
    call.serialNum = serialNum
    call.callback = invokeCallback
    callArray.push(call)

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.getNativeStorage.postMessage({
        key: skey,
        serialNum: serialNum
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.getNativeStorage',
        {
          key: skey,
          serialNum: serialNum
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.getNativeStorage',
        {
          key: skey,
          serialNum: serialNum
        },
        function(responseData) {}
      )
    }
    // else if (window.WeixinJSBridge) {
    //     webgetNativeStorage(skey, serialNum)
    //   } else if (window.AlipayJSBridge) {
    //     webgetNativeStorage(skey, serialNum)
    //   }
    else {
      throw new Error('J2C env init error')
    }
  }

  /**
   * @description 获取本地化存储的回调
   * @ignore
   */
  function onGetNativeStorageSuccessed(par) {
    var val = par.val
    var serialNum = par.serialNum
    for (x in callArray) {
      var s = callArray[x].serialNum
      var callback = callArray[x].callback

      if (s == serialNum) {
        if (callback) {
          callback(val)
        }
        return
      }
    }
  }

  /**
   * @ignore
   */
  var pickPhotosCallback = new function(obj) {}()

  /**
   * @deprecated 已废弃
   * @ignore
   * 选择图片拍照
   * maxNum:最大张数
   * invokeCallback:回调，参数为一个array，参数格式如下
   * [{"dis":"显示时使用的地址，在img标签的src中可以直接使用","use":"真实的文件地址，上传时传递给原生代码使用"},{},{}]
   */
  function pickPhotos(maxNum, invokeCallback) {
    if (invokeCallback != null) {
      pickPhotosCallback = invokeCallback
    }

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.pickPhotos.postMessage({
        body: maxNum
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.pickPhotos', maxNum, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.pickPhotos', maxNum, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
    } else if (window.AlipayJSBridge) {
    } else {
    }
  }

  /**
   * @deprecated 已废弃
   * @ignore
   * 获取选择图片地址的回调
   */
  function onPickPhotosSuccessed(callbackparam) {
    pickPhotosCallback(callbackparam)
  }

  /**
   * @description 回退到指定page
   * @param {*} obj： {toPageId:回退到的指定page的Id，不能没有，可以等于一个空串，表示回退到上一个，没有查询到pageId，则关闭页面}
   */
  function backToPage(obj) {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.backToPage.postMessage({
        body: obj
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.backToPage', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.backToPage', obj, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
      webBackToPageWechart(obj)
    } else if (window.AlipayJSBridge) {
      webBackToPageAlipay(obj)
    } else {
      webBackToPage(obj)
    }
  }

  /**
   * @description 使用外部浏览器打开连接
   * @param {*} obj： {url：打开的链接}
   */
  function openInBrowser(obj) {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.openInBrowser.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.openInBrowser', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.openInBrowser', obj, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
    } else if (window.AlipayJSBridge) {
    } else {
    }
  }

  /**
   * @ignore
   */
  var buildTitleButtonGroupCallback = new function(obj) {}()

  /**
   * @deprecated 已废弃
   * @ignore
   * 创建原生TitleBar上的按钮组
   * array:按钮数组 [obj,..]
   * obj为一个按钮的配置，至少包含如下：
   * {"type":"text/image","id":"ME/...用于回调时带回判断哪个按钮被点击","content":"如果是text那么content表示文字内容，如果是image那么content表示图片的内容"}
   * image类型（content）对照关系：
   * IMG_ME(我的图标)
   * invokeCallback:回调，参数为一个jsonobj，参数格式如下
   * { "id": "调用时给的id，点击哪个按钮就传相应的id"}
   */
  function buildTitleButtonGroup(array, invokeCallback) {
    if (invokeCallback != null) {
      buildTitleButtonGroupCallback = invokeCallback
    }

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.buildTitleButtonGroup.postMessage({
        body: array
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.buildTitleButtonGroup', array, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.buildTitleButtonGroup', array, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
    } else if (window.AlipayJSBridge) {
    } else {
    }
  }

  /**
   * @deprecated 已废弃
   * @ignore
   * 获取TitleButton按钮点击的回调
   */
  function onBuildTitleButtonGroupSuccessed(callbackparam) {
    buildTitleButtonGroupCallback(callbackparam)
  }

  /**
   * @description 注册接收广播的callback
   * @param {*} feature: 广播识别码
   * @param {*} callback: function(obj){...},obj:广播传递消息对象(json对象)
   *
   */
  function registerBroadcast(feature, callback) {
    var serialNum = uuid()
    var call = {}
    call.serialNum = serialNum
    call.callback = callback
    callArray.push(call)

    var realCall = {}
    realCall.feature = feature
    realCall.serialNum = serialNum

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.registerBroadcast.postMessage({
        body: realCall
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.registerBroadcast', realCall, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.registerBroadcast', realCall, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
      registerBroadcastPWA(feature, serialNum, callback)
    } else if (window.AlipayJSBridge) {
      registerBroadcastPWA(feature, serialNum, callback)
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   * @description 发送广播
   * @param {*} feature： 广播识别码
   * @param {*} obj： 广播传递消息对象(json对象)
   *
   */
  function sendBroadcast(feature, obj) {
    var realCall = {}
    realCall.feature = feature
    realCall.obj = obj

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.sendBroadcast.postMessage({
        body: realCall
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.sendBroadcast', realCall, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.sendBroadcast', realCall, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
    } else if (window.AlipayJSBridge) {
    } else {
    }
  }

  /**
   * @description Native中invoke了onBroadcastInvoked后回调JS方法
   * @ignore
   * serialNum：请求编号
   * obj：广播传递消息对象(json对象)
   *
   */
  function onBroadcastInvoked(serialNum, obj) {
    //        alert("net back serialNum is:"+serialNum);
    for (x in callArray) {
      var s = callArray[x].serialNum
      var back = callArray[x].callback

      if (s == serialNum) {
        back(obj)
        return
      }
    }
  }

  /**
   * @description 请求屏幕是否常亮
   * @param {*} isKeepScreenOn： true(常亮)，false（不长亮）
   */
  function requestKeepScreen(isKeepScreenOn) {
    var obj = {}
    obj.isKeepScreenOn = isKeepScreenOn

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.requestKeepScreen.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.requestKeepScreen', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.requestKeepScreen', obj, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
    } else if (window.AlipayJSBridge) {
    } else {
    }
  }

  /**
   * @description 定义获取当前堆栈的callback
   * res为json字符串[{"id":root,"url":url},{..},..]
   * @ignore
   */
  var getStackCallback = new function(res) {}()
  /**
   * @description 获取当前堆栈
   * @param {*} callback:  格式为function(res) {}
   */
  function getStack(callback) {
    getStackCallback = callback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.getStack.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.getStack', {}, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.getStack', {}, function(responseData) {})
    } else if (window.WeixinJSBridge) {
    } else if (window.AlipayJSBridge) {
    } else {
    }
  }

  /**
   * @description 获取当前堆栈的callback的Native回调
   * @ignore
   */
  function onGetStackSuccessed(res) {
    getStackCallback(res)
  }

  /**
   * @description 定义获取当前程序的applicationId或者BundleId的回调
   * res为json对象:{appid:"ApplicationId(Android)/BundleId(iOS)"}
   * @ignore
   */
  var getAppInfoCallback = new function(res) {}()

  /**
   * @description 获取当前程序的applicationId或者BundleId
   * @param {*} callback:  格式为function(res) {}
   */
  function getAppInfo(callback) {
    getAppInfoCallback = callback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.getAppInfo.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.getAppInfo', {}, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.getAppInfo', {}, function(responseData) {})
    } else if (window.WeixinJSBridge) {
    } else if (window.AlipayJSBridge) {
    } else {
    }
  }

  /**
   * @description 获取当前AppInfo的callback的Native回调
   * res为json对象:{appid:ApplicationId(Android)/BundleId(iOS)}
   * @ignore
   */
  function onGetAppInfoCallbackSuccessed(res) {
    getAppInfoCallback(res)
  }

  // ------------------rightName begin----------------------------------------

  /**
   * 右侧RightName按钮点击事件的callback
   * @ignore
   */
  var rightNameClickCallback = function() {}

  /**
   * 注册接收TitleBar的右侧RightName按钮点击事件的callback的方法
   */
  function registerRightNameClick(callback) {
    rightNameClickCallback = callback
  }

  /**
   * 触发TitleBar的右侧RightName按钮点击事件的Native回调
   */
  function onRightNameClick() {
    rightNameClickCallback()
  }

  // ------------------rightName end------------------------------------------

  // -------------------文件Multipart上传 begin---------------------------------------

  /**
   * @description Native中invoke了上传文件netRuest后回调JS的方法
   * @ignore
   * serialNum：请求编号
   * statusObject：格式如下
   * {"code":200,"errormsg":"details"}
   * responseBody:服务端返回body体的内容，不做封装（如果确定服务端返回的json，可以按照json对象解析）
   * responseHeaders：服务端返回的header内容，json对象封装
   */
  function onUploadFileNetSuccessed(serialNum, statusObject, responseBody, responseHeaders) {
    for (x in callArray) {
      var s = callArray[x].serialNum
      var netback = callArray[x].callback

      if (s == serialNum) {
        netback(statusObject, responseBody, responseHeaders)
        return
      }
    }
  }

  /**
   * @description 将本地资源上传到服务器。客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data
   * @param {Object} obj 参数如下
   * @param {string} requestUrl: 上传地址（必传）
   * @param {string} formID：上传文件的ID （必传）
   * @param {string} name：文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容 （必传）
   * @param {Object} formData： HTTP 请求中其他额外的 form data, 可以不传 (Object对象内参数都为string)
   * @param {Object} requestHeaders 请求头 , 可以不传 (Object对象内参数都为string)
   * @param {string} fileName 上传文件名称 （必传）
   * @param {function} callback： 回调函数，callback(statusObject, responseBody, responseHeaders);
   */
  function uploadFile(obj, callback) {
    var serialNum = uuid()

    var call = {}
    call.serialNum = serialNum
    call.callback = callback
    callArray.push(call)

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.uploadFile.postMessage({
        serialNum: serialNum,
        requestUrl: obj.requestUrl,
        formID: obj.formID,
        name: obj.name,
        formData: obj.formData,
        fileName: obj.fileName,
        requestHeaders: obj.requestHeaders
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.uploadFile',
        {
          serialNum: serialNum,
          requestUrl: obj.requestUrl,
          formID: obj.formID,
          name: obj.name,
          formData: obj.formData,
          fileName: obj.fileName,
          requestHeaders: obj.requestHeaders
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.uploadFile',
        {
          serialNum: serialNum,
          requestUrl: obj.requestUrl,
          formID: obj.formID,
          name: obj.name,
          formData: obj.formData,
          fileName: obj.fileName,
          requestHeaders: obj.requestHeaders
        },
        function(responseData) {}
      )
    } else {
    }
  }

  // -------------------文件Multipart上传 end---------------------------------------

  // -------------------DownloadFile begin-----------------------------------------
  /**
   * @description Native中invoke了downloadFile后回调JS的方法
   * @ignore
   * serialNum：请求编号
   * statusObject：格式如下
   * {"code":200,"errormsg":"details"}
   * vid:本地临时路径id
   */
  function onDownloadFileNetSuccessed(serialNum, statusObject, vid) {
    for (x in callArray) {
      var s = callArray[x].serialNum
      var netback = callArray[x].callback

      if (s == serialNum) {
        netback(statusObject, vid)
        return
      }
    }
  }

  /**
   * @description 下载文件，下载文件资源到本地。客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径id
   * @param {*} obj {url:"", headers:{}}
   * @param {*} url: 请求地址
   * @param {*} headers HTTP 请求的 Header
   * @param {*} callback： 回调函数，callback(statusObject, vid);
   */
  function downloadFile(obj, callback) {
    var requestUrl = obj.url
    var requestHeaders = obj.headers

    var serialNum = uuid()

    var call = {}
    call.serialNum = serialNum
    call.callback = callback
    callArray.push(call)

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.downloadFile.postMessage({
        serialNum: serialNum,
        requestUrl: requestUrl,
        requestHeaders: requestHeaders
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.downloadFile',
        {
          serialNum: serialNum,
          requestUrl: requestUrl,
          requestHeaders: requestHeaders
        },
        function(responseData) {}
      )
    } else {
    }
  }
  // -------------------DownloadFile end-----------------------------------------

  // ---------------------deprecated --------------------------------------

  // 把函数注册到命名空间中
  window['J2C']['registerJ2CReadyCallback'] = registerJ2CReadyCallback

  window['J2C']['replaceBackBtnAction'] = replaceBackBtnAction
  window['J2C']['onCustomBackAction'] = onCustomBackAction

  window['J2C']['createNewWebPage'] = createNewWebPage
  window['J2C']['setCurPageId'] = setCurPageId
  window['J2C']['fetchParam'] = fetchParam
  window['J2C']['onFetchParamSuccessed'] = onFetchParamSuccessed
  window['J2C']['registerReceiver'] = registerReceiver
  window['J2C']['onReceiverResult'] = onReceiverResult
  window['J2C']['sendResultToOtherPage'] = sendResultToOtherPage

  window['J2C']['sendRequest'] = sendRequest
  window['J2C']['onRequestNetSuccessed'] = onRequestNetSuccessed

  window['J2C']['registerTitleBarFunctionCallback'] = registerTitleBarFunctionCallback
  window['J2C']['onTitleBarFunctionInvoked'] = onTitleBarFunctionInvoked

  window['J2C']['showNativeToast'] = showNativeToast
  window['J2C']['saveNativeStorage'] = saveNativeStorage
  window['J2C']['getNativeStorage'] = getNativeStorage
  window['J2C']['onGetNativeStorageSuccessed'] = onGetNativeStorageSuccessed
  window['J2C']['pickPhotos'] = pickPhotos
  window['J2C']['onPickPhotosSuccessed'] = onPickPhotosSuccessed

  window['J2C']['backToPage'] = backToPage
  window['J2C']['openInBrowser'] = openInBrowser

  window['J2C']['buildTitleButtonGroup'] = buildTitleButtonGroup
  window['J2C']['onBuildTitleButtonGroupSuccessed'] = onBuildTitleButtonGroupSuccessed

  window['J2C']['registerBroadcast'] = registerBroadcast
  window['J2C']['onBroadcastInvoked'] = onBroadcastInvoked
  window['J2C']['sendBroadcast'] = sendBroadcast

  window['J2C']['requestKeepScreen'] = requestKeepScreen

  window['J2C']['getStack'] = getStack
  window['J2C']['onGetStackSuccessed'] = onGetStackSuccessed

  window['J2C']['getAppInfo'] = getAppInfo
  window['J2C']['onGetAppInfoCallbackSuccessed'] = onGetAppInfoCallbackSuccessed

  window['J2C']['registerRightNameClick'] = registerRightNameClick
  window['J2C']['onRightNameClick'] = onRightNameClick

  window['J2C']['uploadFile'] = uploadFile
  window['J2C']['onUploadFileNetSuccessed'] = onUploadFileNetSuccessed

  window['J2C']['downloadFile'] = downloadFile
  window['J2C']['onDownloadFileNetSuccessed'] = onDownloadFileNetSuccessed

  window['J2C']['saveNativeStorageWithCallback'] = saveNativeStorageWithCallback
  window['J2C']['onsaveNativeStorageWithCallback'] = onsaveNativeStorageWithCallback
})()
