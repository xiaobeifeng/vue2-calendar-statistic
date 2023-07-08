/**
 * @description This is common js for intercept with Native Application using jsbridge
 *
 * @version 2.0.10
 * 增加saveAccountInfoWithCallback方法
 * 增加saveUserInfoWithCallback方法
 *
 * @version 2.0.9
 * 增加isAppInstalled相关方法
 *
 * @version 2.0.8
 * 增加智慧眼活体检测相关方法
 *
 * @version 2.0.7
 * 增加showPdfWithVid方法
 *
 * @version 2.0.6
 * 增加短视频拍摄方法
 *
 * @version 2.0.5
 * 增加微信分享相关方法
 *
 * @version 2.0.4
 * 补充WebViewJavascriptBridge兼容的部分
 *
 * @version 2.0.3
 * 修改保利威视防拖拽视频播放器调用接口
 *
 * @version 2.0.2
 * 增加电子社保卡关闭功能
 *
 * @version 2.0.1
 * 增加保利威视防拖拽视频播放器调用相关接口
 *
 * @version 2.0.0
 * core，kit，pwa整体升级2.0.0版本
 *
 */
;(function() {
  /**
   * @description 判断window对象中是否存在"J2C"，如果不存在，注册命名空间 'J2C' 到window对象上
   * @ignore
   *  */
  if (undefined == window['J2C']) {
    window['J2C'] = {}
  }

  /**
   * @description 产生uuid_kit
   * @ignore
   */
  function uuid_kit() {
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
   * @ignore
   */
  var callArray_kit = []

  // ---------- JS -> Native ---------------------

  // ---------- call Android Application from js---------------------

  /**
   * @description net request 返回后的回调
   * @ignore
   * @deprecated 已废弃
   */
  getToken4NanNingBack = function(tokenObject) {
    //	 	locals.set("token", tokenObject);
    window.localStorage.setItem('token', tokenObject)
  }

  /**
   * @description 调用申请使用getToken4Naning
   * @ignore
   * @deprecated 已废弃
   */
  function requestGetToken4Nanning(callback) {
    getToken4NanNingBack = callback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.requestGetToken4Nanning.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      // 		var token = locals.get("token", "");
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.requestGetToken4Nanning',
        {
          param: '测试'
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      // 		var token = locals.get("token", "");
      window.WebViewJavascriptBridge.callHandler(
        'Native.requestGetToken4Nanning',
        {
          param: '测试'
        },
        function(responseData) {}
      )
    } else if (window.WeixinJSBridge) {
      getUserInfowechat()
    } else if (window.AlipayJSBridge) {
      getUserInfowechat()
    } else {
      getUserInfowechat()
    }
  }

  //---------- call js from Android Application ---------------------

  /**
   * @description Native中invoke了GetToken4NanNing后回调JS的方法
   * @ignore
   * @deprecated 已废弃
   */
  function onGetTokenSuccessed4NanNing(tokenObject) {
    getToken4NanNingBack(tokenObject)
  }

  /**
   * @description requestISLogin request 返回后的回调
   * @ignore
   */
  isLoginback = function(statusObject) {}

  /**
   * @description requestISLogin request 判断用户是否登陆
   * @ignore
   * @deprecated 已废弃
   */
  function requestISLogin(callback) {
    isLoginback = callback

    if (window.iosdkqgqc) {
      window.webkit.requestISLogin()
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.requestISLogin',
        {},

        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.requestISLogin',
        {},

        function(responseData) {}
      )
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   * @description Native中invoke了requestISLogin后回调JS的方法
   * @ignore
   * @deprecated 已废弃
   */
  function requestISLoginSuccessed(statusObject) {
    isLoginback(statusObject)
  }

  /**
   * @description requestCertification request 返回后的回调
   * @ignore
   * @deprecated 已废弃
   */
  isPensionCertificationback = function(statusObject) {}

  /**
   * @description requestPensionCertification request 养老资格认证--直接返回成功失败结果
   * @ignore
   * @deprecated 已废弃
   */
  function requestPensionCertification(idNumber, name, callback) {
    isPensionCertificationback = callback

    if (window.iosdkqgqc) {
      // alert("1111")
      window.webkit.messageHandlers.requestPensionCertification.postMessage({
        idNumber: idNumber,
        name: name
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      // alert("222")
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.requestPensionCertification',
        {
          idNumber: idNumber,
          name: name
        },

        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      // alert("222")
      window.WebViewJavascriptBridge.callHandler(
        'Native.requestPensionCertification',
        {
          idNumber: idNumber,
          name: name
        },

        function(responseData) {}
      )
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   * @description Native中invoke了requestCertification后回调JS的方法
   * @ignore
   * @deprecated 已废弃
   */
  function requestPensionCertificationSuccessed(statusObject) {
    isPensionCertificationback(statusObject)
  }

  /**
   * @description requestCertification request 返回后的回调
   * @ignore
   * @deprecated 已废弃
   */
  isInjuryCertificationback = function(statusObject) {}

  /**
   * @description requestCertification request 工伤资格认认证--直接返回成功失败结果
   * @ignore
   * @deprecated 已废弃
   */
  function requestInjuryCertification(idNumber, name, callback) {
    isInjuryCertificationback = callback

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.requestInjuryCertification.postMessage({
        idNumber: idNumber,
        name: name
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.requestInjuryCertification',
        {
          idNumber: idNumber,
          name: name
        },

        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.requestInjuryCertification',
        {
          idNumber: idNumber,
          name: name
        },

        function(responseData) {}
      )
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   * @description Native中invoke了requestCertification后回调JS的方法
   * @ignore
   * @deprecated 已废弃
   */
  function requestInjuryCertificationSuccessed(statusObject) {
    isInjuryCertificationback(statusObject)
  }

  /**
   * @description survivalback request 返回后的回调
   * @ignore
   * @deprecated 已废弃
   */
  var survivalback = function(statusObject) {}

  /**
   * @description requestSurvival request 生存认证  --返回code值，返回给后台，后台自己判断code值是否成功还是失败或者错误信息
   * @ignore
   * @deprecated 已废弃
   */
  function requestSurvival(idNumber, name, callback) {
    survivalback = callback

    if (window.iosdkqgqc) {
      // alert("1111")
      window.webkit.messageHandlers.requestSurvival.postMessage({
        idNumber: idNumber,
        name: name
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      // alert("222")
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.requestSurvival',
        {
          idNumber: idNumber,
          name: name
        },

        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      // alert("222")
      window.WebViewJavascriptBridge.callHandler(
        'Native.requestSurvival',
        {
          idNumber: idNumber,
          name: name
        },

        function(responseData) {}
      )
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   * @description Native中invoke了requestSurvival后回调JS的方法
   * @ignore
   * @deprecated 已废弃
   */
  function onrequestSurvivalSuccessed(statusObject) {
    survivalback(statusObject)
  }

  //----------- others -----------------------------------------------

  /**
   * @description pdf下载及展示(仅支持get方式),其中如果没有样式修改naviStyle可以不写，rightName（头右侧按钮名称）不写此字段则没有右侧按钮
   * @param {*} paramJsonObj :  {url：pdf下载地址,titleName：展示pdf页面标题,requestHeaders: 请求头,requestQueries：请求参数,"naviStyle":{"naviColor": "#FFFFFF", "naviTitleColor":"#3e3e3e", "naviBackTheme":"GRAY", "rightBtnColor":"#3e3e3e"},"rightName":"分享"}
   * 特别说明：当右侧按钮需要显示自定义图标时，rightName的值传入如下格式："image:base64,aabbccddeeffgg" (其中aabbccddeeffgg为图标的base64值，图标尺寸32*32，大小不超过10K)
   */
  function viewPdf(paramJsonObj) {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.viewPdf.postMessage({
        body: paramJsonObj
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.viewPdf', paramJsonObj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.viewPdf', paramJsonObj, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
      getViewPdf(paramJsonObj, 'WECHAT')
    } else if (window.AlipayJSBridge) {
      getViewPdf(paramJsonObj, 'ALIPAY')
    } else {
      getViewPdf(paramJsonObj, 'PC')
    }
  }

  /**
   * @deprecated 已废弃
   * @ignore
   */
  var scanFaceCallback = new (function(obj) {})()

  /**
   * @deprecated 已废弃
   * @ignore
   * @description 活体识别
   * obj:调用参数
   * obj至少包含如下：
   * {"type": 使用的第三方（yiwei）},其他如有其他字段需要传递，在obj中进行字段扩展
   * invokeCallback:回调，参数为一个jsonobj，参数格式如下
   * { "result": "success"/"fail"其中success表示活体识别成功，fail表示失败, "type":"使用的第三方（yiwei）,"face":人脸base64String}, 其他如有其他字段需要传递，在对象中进行字段扩展
   */
  function scanFace(obj, invokeCallback) {
    if (invokeCallback != null) scanFaceCallback = invokeCallback

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.scanFace.postMessage({
        body: obj
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.scanFace', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.scanFace', obj, function(responseData) {})
    } else if (window.WeixinJSBridge) {
    } else if (window.AlipayJSBridge) {
    } else {
    }
  }

  /**
   * @deprecated 已废弃
   * @description 获取活体的回调
   * @ignore
   */
  function onScanFaceSuccessed(callbackparam) {
    scanFaceCallback(callbackparam)
  }

  /**
   * @description 定义调用二维码扫描获取数据的callback
   * @param {*} obj: 是个json对象，key为qrResult的值代表二维码信息（值类型为字符串）
   * @ignore
   */
  var startQRCodeCallback = new (function(obj) {})()
  /**
   * @description 调用二维码扫描获取数据，naviStyle参数可以不传
   * @param {*} obj :  {titleName："页面标题","naviStyle":{"naviColor": "#FFFFFF", "naviTitleColor":"#3e3e3e", "naviBackTheme":"GRAY", "rightBtnColor":"#3e3e3e"}}
   * callback 为回调函数
   */
  function startQRCode(obj, callback) {
    startQRCodeCallback = callback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.startQRCode.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.startQRCode', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.startQRCode', obj, function(
        responseData
      ) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   * @description 调用二维码扫描获取数据的Native回调
   * @param {*} obj:  {qrResult:二维码扫描结果}
   * @ignore
   */
  function onstartQRCodeSuccessed(obj) {
    startQRCodeCallback(obj)
  }

  /**
   * @ignore
   * @param {*} obj
   */
  var startXunfeiYuYinCallback = function(obj) {}

  /**
   * @description 开始语音识别时
   * 需要回调 : 1、开始倒计时flag2、过程回调（error和音量）
   * obj：需要入参,包含如下：
   * 录音时长（speechTimeOut）（ms单位）（默认60000ms）
   * 语言种类（ language）（zh_cn（中文）、zh_tw（中文台湾）、en_us（英文）） 默认 zh_cn（中文）
   * 语言区域（accent）（mandarin (普通话) henanese（河南话）sichuanese（四川话）cantonese（粤语） 默认mandarin (普通话))
   *
   */
  function startXunfeiYuYin(obj, callback) {
    if (callback != null) startXunfeiYuYinCallback = callback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.startXunfeiYuYin.postMessage({ body: obj })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.startXunfeiYuYin',
        obj,

        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.startXunfeiYuYin',
        obj,

        function(responseData) {}
      )
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   * @description Native中invoke了startXunfeiYuYin后回调JS的方法
   * @ignore
   */
  function onstartXunfeiYuYined(obj) {
    startXunfeiYuYinCallback(obj)
  }

  /**
   * @ignore
   * @param {*} obj
   */
  var endXunfeiYuYinCallback = function(obj) {}

  /**
   * @description 结束语音识别时
   * 需要回调（1、结束录音flag2、识别结果）
   */
  function endXunfeiYuYin(callback) {
    endXunfeiYuYinCallback = callback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.endXunfeiYuYin.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.endXunfeiYuYin',
        {},

        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.endXunfeiYuYin',
        {},

        function(responseData) {}
      )
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   * @description Native中invoke了endXunfeiYuYin后回调JS的方法
   * @ignore
   */
  function onendXunfeiYuYined(obj) {
    endXunfeiYuYinCallback(obj)
  }

  /**
   * @ignore
   * @param {*} obj
   */
  var cancelXunfeiYuYinCallback = function(obj) {}

  /**
   * @description 取消语音识别时,需要回调（1、取消成功flag）
   */
  function cancelXunfeiYuYin(callback) {
    cancelXunfeiYuYinCallback = callback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.cancelXunfeiYuYin.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.cancelXunfeiYuYin',
        {},

        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.cancelXunfeiYuYin',
        {},

        function(responseData) {}
      )
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   * @description Native中invoke了cancelXunfeiYuYin后回调JS的方法
   * @ignore
   */
  function oncancelXunfeiYuYined(obj) {
    cancelXunfeiYuYinCallback(obj)
  }

  /*   --------------------- 百度语音识别 --------------------------------------
   * 以下函数为baidu语音函数
   */

  /**
   * @ignore
   * @param {*} obj
   */
  var startBaiduYuYinCallback = function(obj) {}

  /**
   * @description 开始语音识别时
   * 需要回调 :  flag有三种状态，startCountDown开始录音、state返回录音状态的变量、endCountDown结束
   * 其中当flag为state时，map里可能有vol、与temresult分别代表音量和临时返回识别结果
   * 其中当flag为startCountDown，map里可能有result、error分别代码f全部识别结果与错误信息
   * obj：{} 暂时不需要参数，传{}就可以
   *
   */
  function startBaiduYuYin(obj, callback) {
    if (callback != null) startBaiduYuYinCallback = callback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.startBaiduYuYin.postMessage({ body: obj })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.startBaiduYuYin',
        obj,

        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.startBaiduYuYin',
        obj,

        function(responseData) {}
      )
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   * @description Native中invoke了startBaiduYuYin后回调JS的方法
   * @ignore
   */
  function onstartBaiduYuYined(obj) {
    startBaiduYuYinCallback(obj)
  }

  /**
   * @description 结束语音识别时
   */
  function endBaiduYuYin() {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.endBaiduYuYin.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.endBaiduYuYin',
        {},

        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.endBaiduYuYin',
        {},

        function(responseData) {}
      )
    } else {
      throw new Error('J2C env init error')
    }
  }

  /*   --------------------- 账户系统 --------------------------------------
   * 以下函数为账户系统函数
   * 注意说明 accountId为账户的唯一标识，userName为用户名，accountId与userName可以相同
   */

  /**
   * @description 获取账户系统登录过的历史记录
   * 获取格式为：callback(obj), obj对象格式 [{"userName":"accountId"}]
   */
  function getLogInHistory(callback) {
    var serialNum = uuid_kit()
    var call = {}
    call.serialNum = serialNum
    call.callback = callback
    callArray_kit.push(call)

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.getLogInHistory.postMessage({
        serialNum: serialNum
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.getLogInHistory',
        {
          serialNum: serialNum
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.getLogInHistory',
        {
          serialNum: serialNum
        },
        function(responseData) {}
      )
    } else if (window.WeixinJSBridge) {
      getLogInHistoryPWA(serialNum)
    } else if (window.AlipayJSBridge) {
      getLogInHistoryPWA(serialNum)
    } else {
      getLogInHistoryPWA(serialNum)
    }
  }

  /**
   * @description 获取历史登陆
   * @param {*} par
   * @ignore
   */
  function onGetLogInHistory(par) {
    var serialNum = par.serialNum
    var obj = par.obj
    for (x in callArray_kit) {
      var s = callArray_kit[x].serialNum
      var callback = callArray_kit[x].callback

      if (s == serialNum) {
        if (callback) {
          callback(obj)
        }
        return
      }
    }
  }

  /**
   * @description 获取账户系统当前accountId，当accountId为“PublicAccount”时，表示没有登录状态
   * 获取格式为：callback(accountId)
   */
  function getLogInAccountId(callback) {
    var serialNum = uuid_kit()

    var call = {}
    call.serialNum = serialNum
    call.callback = callback
    callArray_kit.push(call)

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.getLogInAccountId.postMessage({
        serialNum: serialNum
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.getLogInAccountId',
        {
          serialNum: serialNum
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.getLogInAccountId',
        {
          serialNum: serialNum
        },
        function(responseData) {}
      )
    } else if (window.WeixinJSBridge) {
      getLogInAccountIdPWA(serialNum)
    } else if (window.AlipayJSBridge) {
      getLogInAccountIdPWA(serialNum)
    } else {
      getLogInAccountIdPWA(serialNum)
    }
  }

  /**
   * @description 获取AccountId的Natvie回调
   * @param {*} par
   * @ignore
   */
  function ongetLogInAccountId(par) {
    var accountId = par.accountId
    var serialNum = par.serialNum
    for (x in callArray_kit) {
      var s = callArray_kit[x].serialNum
      var callback = callArray_kit[x].callback

      if (s == serialNum) {
        if (callback) {
          callback(accountId)
        }
        return
      }
    }
  }

  /**
   * @description 将accouId账号设置成登录状态,调用次方法后会发送账户变更广播通知,可绑定UserAccountChangedMessage广播接听
   * 参数 accountId 账号的唯一标识
   * 注意：如果getLogInHistory 获取的列表中没有要改变的accountId，必须先调用saveAccountInfo或者saveUserInfo
   */
  function chooseAccount(accountId) {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.chooseAccount.postMessage({
        accountId: accountId
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.chooseAccount',
        {
          accountId: accountId
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.chooseAccount',
        {
          accountId: accountId
        },
        function(responseData) {}
      )
    } else if (window.WeixinJSBridge) {
      chooseAccountPWA(accountId)
    } else if (window.AlipayJSBridge) {
      chooseAccountPWA(accountId)
    } else {
      chooseAccountPWA(accountId)
    }
  }

  /**
   * @description 退出登录状态，accountId变为“PublicAccount”
   */
  function logInOut() {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.logInOut.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.logInOut', {}, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.logInOut', {}, function(responseData) {})
    } else if (window.WeixinJSBridge) {
      logInOutPWA()
    } else if (window.AlipayJSBridge) {
      logInOutPWA()
    } else {
      logInOutPWA()
    }
  }

  /**
   * @description 存储token，refreshToken，userName，accountId
   * 注意：这四个都是必传字段
   */
  function saveAccountInfo(accountId, token, refreshToken, userName) {
    if (!accountId || !token || !refreshToken || !userName) {
      throw new Error('saveAccountInfo 参数字段不全')
    }

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.saveAccountInfo.postMessage({
        accountId: accountId,
        token: token,
        refreshToken: refreshToken,
        userName: userName
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.saveAccountInfo',
        {
          accountId: accountId,
          token: token,
          refreshToken: refreshToken,
          userName: userName
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.saveAccountInfo',
        {
          accountId: accountId,
          token: token,
          refreshToken: refreshToken,
          userName: userName
        },
        function(responseData) {}
      )
    } else if (window.WeixinJSBridge) {
      saveAccountInfoPWA(accountId, token, refreshToken, userName)
    } else if (window.AlipayJSBridge) {
      saveAccountInfoPWA(accountId, token, refreshToken, userName)
    } else {
      saveAccountInfoPWA(accountId, token, refreshToken, userName)
    }
  }

  /**
   * @description 带存储结果回调的saveAccountInfo函数
   * 存储token，refreshToken，userName，accountId
   * 注意：这四个都是必传字段
   * callback 存储结果回调
   */
  function saveAccountInfoWithCallback(accountId, token, refreshToken, userName, callback) {
    if (!accountId || !token || !refreshToken || !userName) {
      throw new Error('saveAccountInfoWithCallback 参数字段不全')
    }

    var serialNum = uuid_kit()

    var call = {}
    call.serialNum = serialNum
    call.callback = callback
    callArray_kit.push(call)

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.saveAccountInfoWithCallback.postMessage({
        accountId: accountId,
        token: token,
        refreshToken: refreshToken,
        userName: userName,
        serialNum: serialNum
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.saveAccountInfoWithCallback',
        {
          accountId: accountId,
          token: token,
          refreshToken: refreshToken,
          userName: userName,
          serialNum: serialNum
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.saveAccountInfoWithCallback',
        {
          accountId: accountId,
          token: token,
          refreshToken: refreshToken,
          userName: userName,
          serialNum: serialNum
        },
        function(responseData) {}
      )
    } else if (window.WeixinJSBridge) {
      saveAccountInfoPWA(accountId, token, refreshToken, userName)
      callback(JSON.stringify({ error: '' }))
    } else if (window.AlipayJSBridge) {
      saveAccountInfoPWA(accountId, token, refreshToken, userName)
      callback(JSON.stringify({ error: '' }))
    } else {
      saveAccountInfoPWA(accountId, token, refreshToken, userName)
      callback(JSON.stringify({ error: '' }))
    }
  }

  /**
   * 接收Native的saveAccountInfoWithCallback回调
   * par为json对象，serialNum为字符串，val为Json字符串，里面是传递的信息
   *  val里固定会有error字段，如果成功error字段为空，其他情况下error为错误信息
   */
  function onsaveAccountInfoWithCallback(par) {
    var serialNum = par.serialNum
    var val = par.val
    for (x in callArray_kit) {
      var s = callArray_kit[x].serialNum
      var callback = callArray_kit[x].callback

      if (s == serialNum) {
        if (callback) {
          callback(val)
        }
        return
      }
    }
  }

  /**
   * @description 存储用户信息，以key-val方式存储
   * 注意：key val 都是字符串
   */
  function saveUserInfo(accountId, key, val) {
    if (!accountId || !key || !val) {
      throw new Error('saveAccountInfo 参数字段不全')
    }

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.saveUserInfo.postMessage({
        accountId: accountId,
        key: key,
        val: val
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.saveUserInfo',
        {
          accountId: accountId,
          key: key,
          val: val
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.saveUserInfo',
        {
          accountId: accountId,
          key: key,
          val: val
        },
        function(responseData) {}
      )
    } else if (window.WeixinJSBridge) {
      saveUserInfoPWA(accountId, key, val)
    } else if (window.AlipayJSBridge) {
      saveUserInfoPWA(accountId, key, val)
    } else {
      saveUserInfoPWA(accountId, key, val)
    }
  }

  /**
   * @description 带回调函数的存储用户信息，以key-val方式存储
   * 注意：key val 都是字符串
   */
  function saveUserInfoWithCallback(accountId, key, val, callback) {
    if (!accountId || !key || !val) {
      throw new Error('saveUserInfoWithCallback 参数字段不全')
    }

    var serialNum = uuid_kit()

    var call = {}
    call.serialNum = serialNum
    call.callback = callback
    callArray_kit.push(call)

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.saveUserInfoWithCallback.postMessage({
        accountId: accountId,
        key: key,
        val: val,
        serialNum: serialNum
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.saveUserInfoWithCallback',
        {
          accountId: accountId,
          key: key,
          val: val,
          serialNum: serialNum
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.saveUserInfoWithCallback',
        {
          accountId: accountId,
          key: key,
          val: val,
          serialNum: serialNum
        },
        function(responseData) {}
      )
    } else if (window.WeixinJSBridge) {
      saveUserInfoPWA(accountId, key, val)
      callback(JSON.stringify({ error: '' }))
    } else if (window.AlipayJSBridge) {
      saveUserInfoPWA(accountId, key, val)
      callback(JSON.stringify({ error: '' }))
    } else {
      saveUserInfoPWA(accountId, key, val)
      callback(JSON.stringify({ error: '' }))
    }
  }

  /**
   * 接收Native的saveUserInfoWithCallback回调
   * par为json对象，serialNum为字符串，val为Json字符串，里面是传递的信息
   *  val里固定会有error字段，如果成功error字段为空，其他情况下error为错误信息
   */
  function onsaveUserInfoWithCallback(par) {
    var serialNum = par.serialNum
    var val = par.val
    for (x in callArray_kit) {
      var s = callArray_kit[x].serialNum
      var callback = callArray_kit[x].callback

      if (s == serialNum) {
        if (callback) {
          callback(val)
        }
        return
      }
    }
  }

  /**
   * @description 获取账户信息，token，refreshToken，userName，accountId
   * 获取格式为：callback(obj), obj对象格式 {"token":"","refreshToken":"","userName":"","accountId":""}
   */
  function getAccountInfo(accountId, callback) {
    var serialNum = uuid_kit()

    var call = {}
    call.serialNum = serialNum
    call.callback = callback
    callArray_kit.push(call)

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.getAccountInfo.postMessage({
        serialNum: serialNum,
        accountId: accountId
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.getAccountInfo',
        {
          serialNum: serialNum,
          accountId: accountId
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.getAccountInfo',
        {
          serialNum: serialNum,
          accountId: accountId
        },
        function(responseData) {}
      )
    } else if (window.WeixinJSBridge) {
      getAccountInfoPWA(accountId, serialNum)
    } else if (window.AlipayJSBridge) {
      getAccountInfoPWA(accountId, serialNum)
    } else {
      getAccountInfoPWA(accountId, serialNum)
    }
  }

  /**
   * @description 获取AccountInfo的Native回调
   * @param {*} par
   * @ignore
   */
  function onGetAccountInfo(par) {
    var accountId = par.accountId
    var serialNum = par.serialNum
    var token = par.token
    var refreshToken = par.refreshToken
    var userName = par.userName

    var obj = {
      accountId: accountId,
      token: token,
      refreshToken: refreshToken,
      userName: userName
    }

    for (x in callArray_kit) {
      var s = callArray_kit[x].serialNum
      var callback = callArray_kit[x].callback

      if (s == serialNum) {
        if (callback) {
          callback(obj)
        }
        return
      }
    }
  }

  /**
   * @description 获取用户信息，通过key 获取需要的val
   * 获取格式为：callback(val), val字符串
   */
  function getUserInfo(accountId, key, callback) {
    var serialNum = uuid_kit()

    var call = {}
    call.serialNum = serialNum
    call.callback = callback
    callArray_kit.push(call)

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.getUserInfo.postMessage({
        key: key,
        serialNum: serialNum,
        accountId: accountId
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.getUserInfo',
        {
          key: key,
          serialNum: serialNum,
          accountId: accountId
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.getUserInfo',
        {
          key: key,
          serialNum: serialNum,
          accountId: accountId
        },
        function(responseData) {}
      )
    } else if (window.WeixinJSBridge) {
      getUserInfoPWA(accountId, key, serialNum)
    } else if (window.AlipayJSBridge) {
      getUserInfoPWA(accountId, key, serialNum)
    } else {
      getUserInfoPWA(accountId, key, serialNum)
    }
  }

  /**
   * 获取UserInfo的Native回调
   * @param {*} par
   * @ignore
   */
  function ongetUserInfo(par) {
    var serialNum = par.serialNum
    var val = par.val
    for (x in callArray_kit) {
      var s = callArray_kit[x].serialNum
      var callback = callArray_kit[x].callback

      if (s == serialNum) {
        if (callback) {
          callback(val)
        }
        return
      }
    }
  }

  /**
   *  @description 调用活体检测
   *   obj：配置参数，一维json对象(camera:0后置，1前置；steps:检测步骤)
   *   callbackOnShow：实现为无参函数callbackOnShow（）
   *   callbackOnComplete：实现为有参函数callbackOnComplete（cal），
   *   其中val的格式为json对象，固定会有一个error的key，如果发生错误其中会是错误信息，如果没有错误error的值为空
   *   val中其他的key和value根据所用的底层实现不同会有所不同，使用时需要知道底层是哪套实现
   */
  function openLiveness(obj, callbackOnShow, callbackOnComplete) {
    var serialNumOnShow = uuid_kit()
    var serialNumOnComplete = uuid_kit()

    var callOnShow = {}
    callOnShow.serialNum = serialNumOnShow
    callOnShow.callback = callbackOnShow
    callArray_kit.push(callOnShow)

    var callOnComplete = {}
    callOnComplete.serialNum = serialNumOnComplete
    callOnComplete.callback = callbackOnComplete
    callArray_kit.push(callOnComplete)

    obj.serialNumOnShow = serialNumOnShow
    obj.serialNumOnComplete = serialNumOnComplete

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.openLiveness.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.openLiveness', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.openLiveness', obj, function(
        responseData
      ) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   *  @description 活体检测onShow回调
   *  @ignore
   */
  function onShowOpenLiveness(par) {
    var serialNum = par.serialNum
    for (x in callArray_kit) {
      var s = callArray_kit[x].serialNum
      var callback = callArray_kit[x].callback

      if (s == serialNum) {
        if (callback) {
          callback()
        }
        return
      }
    }
  }

  /**
   *  @description 活体检测onComplete回调
   *  @ignore
   *  par为json对象，serialNum为字符串，val为Json字符串，里面是传递的信息
   *  val里固定会有error字段，如果成功error字段为空，其他情况下error为错误信息
   *
   */
  function onCompleteOpenLiveness(par) {
    var serialNum = par.serialNum
    var val = par.val
    for (x in callArray_kit) {
      var s = callArray_kit[x].serialNum
      var callback = callArray_kit[x].callback

      if (s == serialNum) {
        if (callback) {
          callback(val)
        }
        return
      }
    }
  }

  //----------------facepp ocr begin--------------------

  /**
   *  @description 调用ocr获取图像
   *   obj：配置参数，一维json对象(side:0人像，1国徽)
   *   callbackOnShow：实现为无参函数callbackOnShow（），可以在此函数回调时关闭js前端等待的蒙版
   *   callbackOnComplete：实现为有参函数callbackOnComplete（cal），
   *   其中val的格式为json对象，固定会有一个error的key，如果发生错误其中会是错误信息，如果没有错误error的值为空
   *   val中其他的key和value根据所用的底层实现不同会有所不同，使用时需要知道底层是哪套实现
   */
  function openOcr(obj, callbackOnShow, callbackOnComplete) {
    var serialNumOnShow = uuid_kit()
    var serialNumOnComplete = uuid_kit()

    var callOnShow = {}
    callOnShow.serialNum = serialNumOnShow
    callOnShow.callback = callbackOnShow
    callArray_kit.push(callOnShow)

    var callOnComplete = {}
    callOnComplete.serialNum = serialNumOnComplete
    callOnComplete.callback = callbackOnComplete
    callArray_kit.push(callOnComplete)

    obj.serialNumOnShow = serialNumOnShow
    obj.serialNumOnComplete = serialNumOnComplete

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.openOcr.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.openOcr', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.openOcr', obj, function(responseData) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   *  @description Ocr检测onShow回调
   *  @ignore
   */
  function onShowOpenOcr(par) {
    var serialNum = par.serialNum
    for (x in callArray_kit) {
      var s = callArray_kit[x].serialNum
      var callback = callArray_kit[x].callback

      if (s == serialNum) {
        if (callback) {
          callback()
        }
        return
      }
    }
  }

  /**
   *  @description Ocr检测onComplete回调
   *  @ignore
   *  par为json对象，serialNum为字符串，val为Json字符串，里面是传递的信息
   *  val里固定会有error字段，如果成功error字段为空，其他情况下error为错误信息
   *
   */
  function onCompleteOpenOcr(par) {
    var serialNum = par.serialNum
    var val = par.val
    for (x in callArray_kit) {
      var s = callArray_kit[x].serialNum
      var callback = callArray_kit[x].callback

      if (s == serialNum) {
        if (callback) {
          callback(val)
        }
        return
      }
    }
  }

  //----------------facepp ocr end--------------------

  //---------------neteaseim begin--------------------------
  /**
   *  @description 调用neteaseim的login
   *   obj：配置参数，一维json对象（account：用户名，token：网易云信的TOKEN）
   *   callbackOnComplete：实现为有参函数callbackOnComplete（obj）
   *  其中val的格式为json对象，固定会有一个error的key，如果发生错误其中会是错误信息，如果没有错误error的值为空
   */
  function loginNeteaseim(obj, callbackOnComplete) {
    var serialNumOnComplete = uuid_kit()

    var callOnComplete = {}
    callOnComplete.serialNum = serialNumOnComplete
    callOnComplete.callback = callbackOnComplete
    callArray_kit.push(callOnComplete)

    obj.serialNumOnComplete = serialNumOnComplete

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.loginNeteaseim.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.loginNeteaseim', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.loginNeteaseim', obj, function(
        responseData
      ) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   *  @description Neteaseim的login的onComplete回调
   *  @ignore
   *  par为json对象，serialNum为字符串，val为Json字符串，里面是传递的信息
   *  val里固定会有error字段，如果成功error字段为空，其他情况下error为错误信息
   */
  function onCompleteLoginNeteaseim(par) {
    var serialNum = par.serialNum
    var val = par.val
    for (x in callArray_kit) {
      var s = callArray_kit[x].serialNum
      var callback = callArray_kit[x].callback

      if (s == serialNum) {
        if (callback) {
          callback(val)
        }
        return
      }
    }
  }

  /**
   * @description 开始基于Neteaseim的视频通话，注意一定要在loginNeteaseim成功之后使用
   */
  function videoCallNeteaseim(towho, extendMessage) {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.videoCallNeteaseim.postMessage({
        towho: towho,
        extendMessage: extendMessage
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.videoCallNeteaseim',
        {
          towho: towho,
          extendMessage: extendMessage
        },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.videoCallNeteaseim',
        {
          towho: towho,
          extendMessage: extendMessage
        },
        function(responseData) {}
      )
    } else {
      throw new Error('J2C env init error')
    }
  }

  //---------------neteaseim end--------------------------

  //---------------ibeacon broadcast begin---------------

  /**
   * @description 开始Ibeacon broadcast
   * 参数 obj {'uuid':uuid,'major':major,'minor':minor}
   * callbackOnComplete：实现为有参函数callbackOnComplete（obj）
   * 其中val的格式为json字符串，固定会有一个error的key，如果发生错误其中会是错误信息，如果没有错误error的值为空
   */
  function startIbeaconbc(obj, callbackOnComplete) {
    var serialNumOnComplete = uuid_kit()
    var callOnComplete = {}
    callOnComplete.serialNum = serialNumOnComplete
    callOnComplete.callback = callbackOnComplete
    callArray_kit.push(callOnComplete)

    obj.serialNumOnComplete = serialNumOnComplete

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.startIbeaconbc.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.startIbeaconbc', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.startIbeaconbc', obj, function(
        responseData
      ) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   *  @description startIbeaconbc的onComplete回调
   *  @ignore
   *  par为json对象，serialNum为字符串，val为Json字符串，里面是传递的信息
   *  val里会有error字段，如果成功error字段为空，其他情况下error为错误信息
   */
  function onCompleteStartIbeaconbc(par) {
    var serialNum = par.serialNum
    var val = par.val
    for (x in callArray_kit) {
      var s = callArray_kit[x].serialNum
      var callback = callArray_kit[x].callback

      if (s == serialNum) {
        if (callback) {
          callback(val)
        }
        return
      }
    }
  }

  /**
   * @description 结束Ibeacon broadcast
   *
   */
  function stopIbeaconbc() {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.stopIbeaconbc.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.stopIbeaconbc', {}, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.stopIbeaconbc', {}, function(
        responseData
      ) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  var startMonitoringCallback = new (function(obj) {})()

  /** @description 开始接收ibeacon信号
   * uuids 目标 iBeacon 设备广播的 UUIDs
   * callbackOnComplete 返回值obj为json对象:{error:"",errorMsg:""}
   * 成功时error为空
   * 失败时error为错误code，errorMsg错误信息
   * @ignore
   * */
  function startMonitoring(uuids, callbackOnComplete) {
    startMonitoringCallback = callbackOnComplete

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.startMonitoring.postMessage({
        uuids: uuids
      })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.startMonitoring',
        { uuids: uuids },
        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.startMonitoring',
        { uuids: uuids },
        function(responseData) {}
      )
    } else {
      throw new Error('J2C env init error')
    }
  }

  function onstartMonitoringResult(obj) {
    startMonitoringCallback(obj)
  }

  /** @description 结束接收ibeacon信息
   * @ignore
   * */
  function stopMonitoring() {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.stopMonitoring.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.stopMonitoring', {}, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.stopMonitoring', {}, function(
        responseData
      ) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  var updateMonitoringCallback = new (function(obj) {})()

  /** @description 实时更新ibeacon信号
   * callbackOnComplete 返回值obj为json对象:{beacons:"[]",error:"",errorMsg:""}
   * beacons 当前搜寻到的所有 iBeacon 设备列表字符串，字符串里边的内容是数组，如下：
   * "beacons":"[{\"rssi\":-57,\"major\":\"1\",\"minor\":\"2\",\"accuracy\":0.7083182641128207,\"uuid\":\"45F78EB1-5D26-4301-A667-D5B2CF0C6CB0\"}]"
   * 每个ibeacon具体信息如下
   * uuid	String	iBeacon 设备广播的 uuid
   * major	String	iBeacon 设备的主 id
   * minor	String	iBeacon 设备的次 id
   * accuracy	Number	iBeacon 设备的距离
   * rssi	Number	iBeacon 信号强度
   *
   * 成功时error为空
   * 失败时error为错误code，errorMsg错误信息
   * @ignore
   * */
  function updateMonitoring(callbackOnComplete) {
    updateMonitoringCallback = callbackOnComplete

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.updateMonitoring.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.updateMonitoring', {}, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.updateMonitoring', {}, function(
        responseData
      ) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  function onupdateMonitoringResult(obj) {
    updateMonitoringCallback(obj)
  }

  //---------------ibeacon broadcast end-----------------

  //----------------Essc begin--------------------

  var esscOnResultCallback = new (function(obj) {})()
  var esscOnSceneResultCallback = new (function(obj) {})()

  /**
   *  @description 调用Essc（人社部电子社保卡）
   *   obj：配置参数，一维json对象(type："调用功能枚举"，sign："签名串")
   *   callbackOnResult：电子社保卡主流程回调，callbackOnResult(obj)，
   *   callbackOnSceneResult：独立服务回调 callbackOnSceneResult(obj)，
   *   type的取值范围：
   *   "PWD_VALIDATE"; //密码认证
   *   "BASE_INFO"; //默认首页路径
   *   "CHANGEPWD"; //修改密码
   *   "QR"; //身份二维码
   *   "PAY_CASHIER"; //收银台
   *   "OTP_VALIDATE"; //短信认证
   *   "FACE_VALIDATE"; //人脸认证
   */
  function openEssc(obj, callbackOnResult, callbackOnSceneResult) {
    esscOnResultCallback = callbackOnResult
    esscOnSceneResultCallback = callbackOnSceneResult

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.openEssc.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.openEssc', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.openEssc', obj, function(responseData) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   *  @description 关闭eesb sdk (人社部电子社保卡)
   *  @ignore
   */
  function closeEssc() {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.closeEssc.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.closeEssc', {}, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.closeEssc', {}, function(responseData) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   *  @description Essc的onEsscResult
   *  obj:为json对象
   *  @ignore
   */
  function onEsscResult(obj) {
    esscOnResultCallback(obj)
  }

  /**
   *  @description Essc的onEsscSceneResult
   *  obj:为json对象
   *  @ignore
   *
   */
  function onEsscSceneResult(obj) {
    esscOnSceneResultCallback(obj)
  }

  //----------------Essc end--------------------

  //----------------signature shangrong begin--------------------

  var signSROnResultCallback = new (function(obj) {})()

  /**
   *  @description 调用signSR（上融签名）
   *
   */
  function openSignSR(callbackOnResult) {
    signSROnResultCallback = callbackOnResult

    if (window.iosdkqgqc) {
      alert('iOS do not allow to do this!')
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.openSignSR', {}, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.openSignSR', {}, function(responseData) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   *  @description openSignSR的onSignSRResult
   *  obj:为json对象{"base64":"base64的签名图片值"}
   *  @ignore
   */
  function onSignSRResult(obj) {
    signSROnResultCallback(obj)
  }

  //----------------signature shangrong end--------------------

  //---------------liveness baiduface begin-----------------

  var openLivenessBdSyncCompeleteCallback = new (function(val) {})()
  var openLivenessBdAsynCompeleteCallback = new (function(val) {})()

  /**
   *  @description 调用东软云的百度活体检测(同步)
   *   obj：配置参数，一维json对象(scope:"东软云分配的渠道id"；)
   *   callbackOnComplete：实现为有参函数callbackOnComplete（val），
   *   其中val的格式为json字符串，固定会有一个error的key，如果发生错误其中会是错误信息，如果没有错误error的值为空
   *   val中其他的key和value根据所用的底层实现不同会有所不同，使用时需要知道底层是哪套实现
   */
  function openLivenessBdSync(obj, callbackOnComplete) {
    openLivenessBdSyncCompeleteCallback = callbackOnComplete

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.openLivenessBdSync.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.openLivenessBdSync', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.openLivenessBdSync', obj, function(
        responseData
      ) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   *  @description 调用东软云的百度活体检测(异步)
   *   obj：配置参数，一维json对象(token："东软云的百度刷脸token")
   *   callbackOnComplete：实现为有参函数callbackOnComplete（val），
   *   其中val的格式为json字符串，固定会有一个error的key，如果发生错误其中会是错误信息，如果没有错误error的值为空
   *   val中其他的key和value根据所用的底层实现不同会有所不同，使用时需要知道底层是哪套实现
   *   回参val示例 {error:""|"cancel"|errmsg,reqid:"本次请求的唯一id",status:"success",pass:true|false,msg:"本次比对的文字说明，如：比对通过",reskey:"历史问题，请忽略"}
   */
  function openLivenessBdAsyn(obj, callbackOnComplete) {
    openLivenessBdAsynCompeleteCallback = callbackOnComplete

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.openLivenessBdAsyn.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.openLivenessBdAsyn', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.openLivenessBdAsyn', obj, function(
        responseData
      ) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   *  @description 东软云百度活体检测onComplete回调（同步）
   *  @ignore
   *  val为json字符串，里面是传递的信息
   *  val里固定会有error字段，如果成功error字段为空，其他情况下error为错误信息
   *
   */
  function onCompleteOpenLivenessBdSync(val) {
    openLivenessBdSyncCompeleteCallback(val)
  }

  /**
   *  @description 东软云百度活体检测onComplete回调（异步）
   *  @ignore
   *  val为json字符串，里面是传递的信息
   *  val里固定会有error字段，如果成功error字段为空，其他情况下error为错误信息
   *
   */
  function onCompleteOpenLivenessBdAsyn(val) {
    openLivenessBdAsynCompeleteCallback(val)
  }

  //-------------------liveness baduface end------------------------

  //-------------------AliPay begin --------------------------------

  /**
   * @description 定义alipay的回调
   * res为json对象:{resultStatus:"状态码"} 9000：支付成功，8000：支付Pending，6001：支付取消，其他：支付失败
   * @ignore
   */
  var requestAlipayCallback = new (function(res) {})()

  /**
   * @description alipay
   * @param {*} callback:  格式为function(res) {}
   * @param {*} obj: {payParam:"支付参数"}
   */
  function requestAlipay(obj, callback) {
    requestAlipayCallback = callback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.requestAlipay.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.requestAlipay', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.requestAlipay', obj, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
    } else if (window.AlipayJSBridge) {
    } else {
    }
  }

  /**
   * @description 获取当前alipay的callback的Native回调
   * res为json对象:{resultStatus:"状态码"} 9000：支付成功，8000：支付Pending，6001：支付取消，其他：支付失败
   * @ignore
   */
  function requestAlipayCallbackSuccessed(res) {
    requestAlipayCallback(res)
  }

  //-------------------AliPay end ----------------------------------

  //-------------------LngAndLat begin --------------------------------

  /**
   * @description 定义requestLngAndLat的回调
   * res为json对象:{error:"",longtitude:"",latitude:""}
   * 成功时error为空，longtitude为经度，latitude为纬度；
   * 失败时error为错误信息，longtidude和latitude为空
   * @ignore
   */
  var requestLngAndLatCallback = new (function(res) {})()

  /**
   * @description LngAndLat
   * @param {*} callback:  格式为function(res) {}
   */
  function requestLngAndLat(callback) {
    requestLngAndLatCallback = callback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.requestLngAndLat.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.requestLngAndLat', {}, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.requestLngAndLat', {}, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
    } else if (window.AlipayJSBridge) {
    } else {
    }
  }

  /**
   * @description 获取LngAndLat的callback的Native回调
   * res为json对象:{error:"",longtitude:"",latitude:""}
   * 成功时error为空，longtitude为经度，latitude为纬度；
   * 失败时error为错误信息，longtidude和latitude为空
   * @ignore
   */
  function requestLngAndLatCallbackSuccessed(res) {
    requestLngAndLatCallback(res)
  }

  //-------------------LngAndLat end ----------------------------------

  //-------------------polyv防拖拽player begin----------------------------------

  /**
   * @description 定义polyv防拖拽player的进度回调
   * @param {*} obj:{curpos:33300,vid:"vid",duration:550000} ,curpos为当前播放进度的毫秒数
   * @ignore
   */
  var openPolyvPlayerCallback = new (function(obj) {})()

  /**
   * @description 定义polyv防拖拽player的结束回调
   * @ignore
   */
  var openPolyvPlayerFinishCallback = new (function() {})()

  /**
   * @description polyv防拖拽player
   * @param {*} obj: {vid:"vid"f,title:"title",viewerId:"viewerId",continuePos:66000,isplayed:true}
   * 特别注意continuePos为整数形，代表续播的时候跳到的指定的毫秒数
   * @param {*} callback:进度回调
   * @param {*} finishCallback:结束回调
   */
  function openPolyvPlayer(obj, callback, finishCallback) {
    openPolyvPlayerCallback = callback
    openPolyvPlayerFinishCallback = finishCallback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.openPolyvPlayer.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.openPolyvPlayer', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.openPolyvPlayer', obj, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
    } else if (window.AlipayJSBridge) {
    } else {
    }
  }

  /**
   * @description polyv防拖拽player的进度回调函数
   * @param {*} obj:{curpos:33300,vid:"vid",duration:550000} ,curpos为当前播放进度的毫秒数
   */
  function onPolyvPlayerReported(obj) {
    openPolyvPlayerCallback(obj)
  }

  /**
   * @description 定义polyv防拖拽player的结束回调
   */
  function onPolyvPlayerFinished() {
    openPolyvPlayerFinishCallback()
  }

  //-------------------polyv防拖拽player end----------------------------------

  //-------------------weixin分享 begin---------------------------------------

  /**
   * @description 从微信返回时的回调，不保证一定会调用此函数
   * @param {*} 暂时val 为{} 空对象
   * @ignore
   */
  var requestWxShareCallBack = function(val) {}

  /**
   * @description 微信分享
   * @param{*}  obj: {scene:"1"f,title:"标题",thumbUrl:"thumb图片url",desc:"描述",link:"分享链接"}
   * 参数说明：
   * scene：string类型，"0"表示对话，"1"表示朋友圈
   * title：string类型，分享的标题 （最长512个字符）
   * thumb64：string类型，分享的图标的Base64（大小一定不能超过30k，否则会导致分享无反应），如果使用微信默认图标该值传空字符串（""）
   * desc：string类型，分享的描述（最长1024个字符）
   * link：分享的链接（最长不能超过10k）
   */
  function requestWxShare(obj, callBack) {
    requestWxShareCallBack = callBack

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.requestWxShare.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.requestWxShare', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.requestWxShare', obj, function(
        responseData
      ) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  function onRequestWxShareCallBack(val) {
    requestWxShareCallBack(val)
  }

  //------------------weixin分享 end------------------------------------------

  //------------------短视频拍摄相关 begin--------------------------------------

  /**
   * @description 短视频完成回调
   * @param val {error:"",vid:"XXXXXXX"}
   * error 成功时error为空,失败时为错误原因。cancel 表示取消拍摄
   * vid 短视频存储的id，用于上传等操作
   */
  var shotVideoCallback = new (function(val) {})()

  /**
   * @description 短视频页面消失回调
   * @param val {error:""}
   * error 成功时error为空,失败时为错误原因。
   */
  var shotVideoShowCallback = new (function(val) {})()

  /**
   * @description 开始短视频
   * obj: {maxTime:"5",defPosition:"1"}
   * maxTime 视频最大时间(秒)不能超过60秒，字符串
   * defPosition 进入视频时摄像头方向，"1" 代表后置摄像头。 "2"代表前置摄像头，字符串
   * @param callBack 返回视频完成回调
   */
  function openShotVideo(obj, showCallBack, callBack) {
    shotVideoShowCallback = showCallBack
    shotVideoCallback = callBack
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.openShotVideo.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.openShotVideo', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.openShotVideo', obj, function(
        responseData
      ) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  function onShotVideoCallback(val) {
    shotVideoCallback(val)
  }

  function onShotVideoShowCallback(val) {
    shotVideoShowCallback(val)
  }

  //------------------短视频拍摄相关 end----------------------------------------

  //-------------------showPdfWithVid begin-------------------------------------

  /**
   *  @description 是否成功展示pdf回调（异步）
   *  @ignore
   *  val为json字符串，里面是传递的信息 {"error":""}
   *  val里固定会有error字段，如果成功error字段为空，其他情况下error为错误信息
   *
   */
  var showPdfWithVidCallBack = function(val) {}

  /**
   * @description pdf下载及展示,以vid形式,其中如果没有样式修改naviStyle可以不写，rightName（头右侧按钮名称）不写此字段则没有右侧按钮
   * @param {*} paramJsonObj :  {vid:'文件vid',titleName：展示pdf页面标题,"naviStyle":{"naviColor": "#FFFFFF", "naviTitleColor":"#3e3e3e", "naviBackTheme":"GRAY", "rightBtnColor":"#3e3e3e"},"rightName":"分享"}
   * 特别说明：当右侧按钮需要显示自定义图标时，rightName的值传入如下格式："image:base64,aabbccddeeffgg" (其中aabbccddeeffgg为图标的base64值，图标尺寸32*32，大小不超过10K)
   */
  function showPdfWithVid(paramJsonObj, callback) {
    showPdfWithVidCallBack = callback

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.showPdfWithVid.postMessage(paramJsonObj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.showPdfWithVid', paramJsonObj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge & !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.showPdfWithVid', paramJsonObj, function(
        responseData
      ) {})
    } else {
    }
  }

  function onShowPdfWithVidCallBack(val) {
    showPdfWithVidCallBack(val)
  }

  //-------------------showPdfWithVid end---------------------------------------

  //--------------------- 思必驰语音识别 begin--------------------------------------

  /**
   * @ignore
   * @param {*} obj
   */
  var startSbcYuYinCallback = function(obj) {}

  /**
   * @description 开始语音识别时
   * 需要回调 :  flag有三种状态，startCountDown开始录音、state返回录音状态的变量、endCountDown结束
   * 其中当flag为state时，map里可能有vol与temresult分别代表音量和临时返回识别结果
   * 其中当flag为startCountDown，map里可能有result、error分别代表全部识别结果与错误信息
   * obj：{} 暂时不需要参数，传{}就可以
   *
   */
  function startSbcYuYin(obj, callback) {
    if (callback != null) startSbcYuYinCallback = callback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.startSbcYuYin.postMessage({ body: obj })
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.startSbcYuYin',
        obj,

        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.startSbcYuYin',
        obj,

        function(responseData) {}
      )
    } else {
      throw new Error('J2C env init error')
    }
  }

  /**
   * @description Native中invoke了startSbcYuYin后回调JS的方法
   * @ignore
   */
  function onstartSbcYuYined(obj) {
    startSbcYuYinCallback(obj)
  }

  /**
   * @description 结束语音识别时
   */
  function endSbcYuYin() {
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.endSbcYuYin.postMessage(1)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler(
        'Native.endSbcYuYin',
        {},

        function(responseData) {}
      )
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.endSbcYuYin',
        {},

        function(responseData) {}
      )
    } else {
      throw new Error('J2C env init error')
    }
  }
  //--------------------- 思必驰语音识别 end--------------------------------------

  //--------------------- zhihuiyan begin---------------------------------------

  var requestZhiHuiYanCallBack = function(val) {}

  /**
   * @description 智慧眼活体检验后的回调
   * val：json对象 {"error":"","val":""}
   * error:空表示成功，为空时val才会有值
   * val：json字符串，其中包含如下信息
   *  images：数组，比对和显示用的照片数据（使用BASE64编码）
   *  rect：数组，人脸区域位置
   *  alive：数组，用来做后台活体判断的数据
   *  picnum：照片数量
   *  bioType：照片类型
   *  channel：采集途径
   *  isCompress：是否压缩
   *  isCrypt：是否加密
   */
  function onRequestZhiHuiYanCallBack(val) {
    requestZhiHuiYanCallBack(val)
  }

  /**
   * @description 开始zhihuiyan活体
   * obj：配置参数，一维json对象(steps:检测步骤)
   * steps 检测步骤 注意steps的值是字符串
   * @param callBack 活体检验完成后的回调
   */
  function requestZhiHuiYan(obj, callBack) {
    requestZhiHuiYanCallBack = callBack

    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.requestZhiHuiYan.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.requestZhiHuiYan', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'Native.requestZhiHuiYan',
        {},

        function(responseData) {}
      )
    } else {
      throw new Error('J2C env init error')
    }
  }

  //--------------------- zhihuiyan end-----------------------------------------

  //------------------isAppInstalled begin--------------------------------------
  /**
   * @description 定义isAppInstalled的回调
   * res为json对象:{exists:true/false}
   * @ignore
   */
  var isAppInstalledCallback = new (function(res) {})()

  /**
   * @description 根据appId判断应该是否安装
   * @param {*} obj:{appId:'android要判断的应用的applicationId, ios 格式为 约定好的schema:// '}
   * @param {*} callback:  格式为function(res) {}
   */
  function isAppInstalled(obj, callback) {
    isAppInstalledCallback = callback
    if (window.iosdkqgqc) {
      window.webkit.messageHandlers.isAppInstalled.postMessage(obj)
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.isAppInstalled', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.isAppInstalled', obj, function(
        responseData
      ) {})
    } else if (window.WeixinJSBridge) {
    } else if (window.AlipayJSBridge) {
    } else {
    }
  }

  /**
   * @description 定义isAppInstalled的Native回调
   * res为json对象:{exists:true/false}
   * @ignore
   */
  function onIsAppInstalledCallback(res) {
    isAppInstalledCallback(res)
  }
  //------------------isAppInstalled end--------------------------------------

  /**
   * @description 东软云检测更新
   */
  function yunupdate() {
    var obj = {}
    obj.msg = 'no_used'
    if (window.iosdkqgqc) {
      alert('iOS do not allow to do this!')
    } else if (window.WebViewJ2CJavascriptBridge) {
      window.WebViewJ2CJavascriptBridge.callHandler('Native.yunupdate', obj, function(
        responseData
      ) {})
    } else if (window.WebViewJavascriptBridge && !window.AlipayJSBridge) {
      window.WebViewJavascriptBridge.callHandler('Native.yunupdate', obj, function(responseData) {})
    } else {
      throw new Error('J2C env init error')
    }
  }

  //---------------------deprecated --------------------------------------

  // 把函数注册到命名空间中
  window['J2C']['requestGetToken4NanNing'] = requestGetToken4Nanning
  window['J2C']['onGetTokenSuccessed4NanNing'] = onGetTokenSuccessed4NanNing

  window['J2C']['requestISLogin'] = requestISLogin
  window['J2C']['requestISLoginSuccessed'] = requestISLoginSuccessed
  window['J2C']['requestPensionCertification'] = requestPensionCertification
  window['J2C']['requestPensionCertificationSuccessed'] = requestPensionCertificationSuccessed
  window['J2C']['requestInjuryCertification'] = requestInjuryCertification
  window['J2C']['requestInjuryCertificationSuccessed'] = requestInjuryCertificationSuccessed
  window['J2C']['requestSurvival'] = requestSurvival
  window['J2C']['onrequestSurvivalSuccessed'] = onrequestSurvivalSuccessed

  window['J2C']['viewPdf'] = viewPdf

  window['J2C']['scanFace'] = scanFace
  window['J2C']['onScanFaceSuccessed'] = onScanFaceSuccessed

  window['J2C']['startQRCode'] = startQRCode
  window['J2C']['onstartQRCodeSuccessed'] = onstartQRCodeSuccessed

  window['J2C']['startXunfeiYuYin'] = startXunfeiYuYin
  window['J2C']['onstartXunfeiYuYined'] = onstartXunfeiYuYined
  window['J2C']['endXunfeiYuYin'] = endXunfeiYuYin
  window['J2C']['onendXunfeiYuYined'] = onendXunfeiYuYined
  window['J2C']['cancelXunfeiYuYin'] = cancelXunfeiYuYin
  window['J2C']['oncancelXunfeiYuYined'] = oncancelXunfeiYuYined

  window['J2C']['startBaiduYuYin'] = startBaiduYuYin
  window['J2C']['onstartBaiduYuYined'] = onstartBaiduYuYined
  window['J2C']['endBaiduYuYin'] = endBaiduYuYin

  window['J2C']['getLogInHistory'] = getLogInHistory
  window['J2C']['onGetLogInHistory'] = onGetLogInHistory
  window['J2C']['getLogInAccountId'] = getLogInAccountId
  window['J2C']['ongetLogInAccountId'] = ongetLogInAccountId
  window['J2C']['chooseAccount'] = chooseAccount
  window['J2C']['logInOut'] = logInOut
  window['J2C']['saveAccountInfo'] = saveAccountInfo
  window['J2C']['saveUserInfo'] = saveUserInfo
  window['J2C']['getAccountInfo'] = getAccountInfo
  window['J2C']['onGetAccountInfo'] = onGetAccountInfo
  window['J2C']['getUserInfo'] = getUserInfo
  window['J2C']['ongetUserInfo'] = ongetUserInfo

  window['J2C']['yunupdate'] = yunupdate

  window['J2C']['openLiveness'] = openLiveness
  window['J2C']['onShowOpenLiveness'] = onShowOpenLiveness
  window['J2C']['onCompleteOpenLiveness'] = onCompleteOpenLiveness

  window['J2C']['openOcr'] = openOcr
  window['J2C']['onShowOpenOcr'] = onShowOpenOcr
  window['J2C']['onCompleteOpenOcr'] = onCompleteOpenOcr

  window['J2C']['loginNeteaseim'] = loginNeteaseim
  window['J2C']['onCompleteLoginNeteaseim'] = onCompleteLoginNeteaseim
  window['J2C']['videoCallNeteaseim'] = videoCallNeteaseim

  window['J2C']['startIbeaconbc'] = startIbeaconbc
  window['J2C']['onCompleteStartIbeaconbc'] = onCompleteStartIbeaconbc
  window['J2C']['stopIbeaconbc'] = stopIbeaconbc
  window['J2C']['startMonitoring'] = startMonitoring
  window['J2C']['onstartMonitoringResult'] = onstartMonitoringResult
  window['J2C']['stopMonitoring'] = stopMonitoring
  window['J2C']['updateMonitoring'] = updateMonitoring
  window['J2C']['onupdateMonitoringResult'] = onupdateMonitoringResult

  window['J2C']['openEssc'] = openEssc
  window['J2C']['closeEssc'] = closeEssc
  window['J2C']['onEsscResult'] = onEsscResult
  window['J2C']['onEsscSceneResult'] = onEsscSceneResult

  window['J2C']['openSignSR'] = openSignSR
  window['J2C']['onSignSRResult'] = onSignSRResult

  window['J2C']['openLivenessBdSync'] = openLivenessBdSync
  window['J2C']['onCompleteOpenLivenessBdSync'] = onCompleteOpenLivenessBdSync
  window['J2C']['openLivenessBdAsyn'] = openLivenessBdAsyn
  window['J2C']['onCompleteOpenLivenessBdAsyn'] = onCompleteOpenLivenessBdAsyn

  window['J2C']['requestAlipay'] = requestAlipay
  window['J2C']['requestAlipayCallbackSuccessed'] = requestAlipayCallbackSuccessed

  window['J2C']['requestLngAndLat'] = requestLngAndLat
  window['J2C']['requestLngAndLatCallbackSuccessed'] = requestLngAndLatCallbackSuccessed

  window['J2C']['openPolyvPlayer'] = openPolyvPlayer
  window['J2C']['onPolyvPlayerReported'] = onPolyvPlayerReported
  window['J2C']['onPolyvPlayerFinished'] = onPolyvPlayerFinished

  window['J2C']['requestWxShare'] = requestWxShare
  window['J2C']['onRequestWxShareCallBack'] = onRequestWxShareCallBack

  window['J2C']['openShotVideo'] = openShotVideo
  window['J2C']['onShotVideoShowCallback'] = onShotVideoShowCallback
  window['J2C']['onShotVideoCallback'] = onShotVideoCallback

  window['J2C']['showPdfWithVid'] = showPdfWithVid
  window['J2C']['onShowPdfWithVidCallBack'] = onShowPdfWithVidCallBack

  window['J2C']['startSbcYuYin'] = startSbcYuYin
  window['J2C']['endSbcYuYin'] = endSbcYuYin
  window['J2C']['onstartSbcYuYined'] = onstartSbcYuYined

  window['J2C']['requestZhiHuiYan'] = requestZhiHuiYan
  window['J2C']['onRequestZhiHuiYanCallBack'] = onRequestZhiHuiYanCallBack

  window['J2C']['isAppInstalled'] = isAppInstalled
  window['J2C']['onIsAppInstalledCallback'] = onIsAppInstalledCallback

  window['J2C']['saveAccountInfoWithCallback'] = saveAccountInfoWithCallback
  window['J2C']['onsaveAccountInfoWithCallback'] = onsaveAccountInfoWithCallback

  window['J2C']['saveUserInfoWithCallback'] = saveUserInfoWithCallback
  window['J2C']['onsaveUserInfoWithCallback'] = onsaveUserInfoWithCallback
})()
