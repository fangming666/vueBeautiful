/**
 * Created by DELL on 2018/1/2.
 */
import axios from "axios";

//get请求数据
export const _postAxios = function (url, params) {
  if (params) {
    return axios({
      method: "post",
      url: url,
      data: params,
      timeout: 5000,
      responseType: 'json'
    }).then(function (res) {
      if (res.status === 200) {
        return res.data
      }
      return Promise.reject(new Error);
    })
  } else {
    return axios({
      method: "post",
      url: url,
      timeout: 5000,
      responseType: 'json'
    }).then(function (res) {
      if (res.status === 200) {
        return res.data
      }
      return Promise.reject(new Error);
    })
  }

};


export const _postAxios2 = async (url, params) => {
    if (params) {
      let data = await axios({
        method: "post",
        url: url,
        data: params,
        timeout: 5000,
        responseType: 'json'
      });
      try{
        return data;
      }catch(e){
        return Promise.reject(new Error);
      }

    }
  }
;


