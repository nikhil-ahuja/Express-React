import request from 'reqwest';
import {BASE_URL} from '../constants';


class BaseService {

  static createPostRequest(baseUrl, relativeUrl, authToken, data, contentType){

    let url = baseUrl;

    if(relativeUrl)
      url = url+relativeUrl;

    let headers = {};
    if(authToken){
      headers['Authorization'] = 'Bearer '+authToken;
    }
    if(contentType){
      headers['Content-Type'] = contentType
    }

    return request({
      url: url,
      method: "POST",
      type: 'json',
      contentType: 'application/json',
      data: data,
      headers: headers
    })

  }

  static createGetRequest(baseUrl, relativeUrl, authToken, data){

    let url = baseUrl;

    if(relativeUrl)
      url = url+relativeUrl;

    if(data){
      url+='?'+data;
    }
    let headers= {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    if (authToken){
      headers["Authorization"] = 'Bearer '+authToken
    }
    return request({
      url: url,
      method: "GET",
      type: 'json',
      contentType: 'application/json',
      headers: headers
    })

  }

  static createPutRequest(baseUrl, relativeUrl, authToken, data, contentType){

    let headers = {};
    if(authToken){
      headers['Authorization'] = 'Bearer '+authToken;
    }
    if(contentType){
      headers['Content-Type'] = contentType
    }

    return request({
      url: baseUrl+relativeUrl,
      method: "PUT",
      type: 'json',
      contentType: 'application/json',
      data: data,
      headers: headers
    })
  }

}

module.exports = BaseService;
