import axios from 'axios'

class Service {
  /**
   * @param url:restful地址
   * @param withoutMock:用于在mock环境下调试后台接口，如在mock环境下本接口不想使用mock数据，则传true
   * @param flag:特殊mock标识，用于重名接口mock区分
   */
  constructor (url = '', withoutMock = false, flag = '') {
    this._url = url
    this.customConfig = { withoutMock, flag, businessRestful: true }
  }

  /**
   * 统一查询接口 GET
   * @param params 参数
   * @param noLoading 是否加载全局统一loading
   * @returns {Promise<AxiosResponse<T>>}
   */
  get (params = {}, noLoading = false) {
    this.customConfig.noLoading = noLoading
    return axios.get(this._url, { params, headers: { ...this.customConfig } })
  }

  /**
   * 统一保存接口
   * @param body
   * @param noLoading
   * @returns {Promise<any>}
   */
  post (body = {}, noLoading = false) {
    this.customConfig.noLoading = noLoading
    return axios.post(this._url, body, { headers: { ...this.customConfig }, timeout: 60000 })
  }
}

export default Service
