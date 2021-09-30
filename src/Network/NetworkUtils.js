import axios from 'axios'

class NetworkUtils {
  constructor(options) {
    this.baseUrl = options.baseUrl
  }

  get(endpoint, token = null) {
    console.log(this.baseUrl + " " + endpoint)
    return this.requestHttp("GET", this.baseUrl + endpoint, null, token)
  }

  post(endpoint, params, token = null) {
    console.log(this.baseUrl + " " + endpoint + " " + params)
    params.append("SECRET", "2ca153dabdc7aa720b7ef9c341e14a75")
    params.append("X_AUTH_KEY", "037e54a21e894632ebd518e2623ca414")
    params.append("X_AUTH_O_KEY", "89152c7451378f00228f6f74d466015d")
    return this.requestHttp("POST", this.baseUrl + endpoint, params, token)
  }

  put(endpoint, params, token = null) {
    return this.requestHttp("PUT", this.baseUrl + endpoint, params, token)
  }

  delete(endpoint, params, token = null) {
    return this.requestHttp("DELETE", this.baseUrl + endpoint, params, token)
  }

  requestHttp(method, url, params, token) {
    return new Promise((resolve, reject) => {

      var options = {
        method,
        url,
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      if (params) {
        options.data = params
      }
      if (token) {
        options.headers["Authorization"] = 'Bearer ' + token
      }

      axios(options)
      .then((response)=>{
        resolve({ statusCode: response.status, body: response.data })
      })
      .catch((error)=>{
        if (error.response != undefined) {
          resolve({ statusCode: error.response.status, body: error.response.data })
        }else{
          reject("Can not connect to server" + error)
        }
      })
    })
  }
}

export default NetworkUtils
