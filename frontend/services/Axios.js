import axios from 'axios'
export default class Axios{
    constructor(argv){
        this.api_url = (argv==='dev') ? process.env.api_url_dev : process.env.api_url_prod
        // this.api_url = (argv==='dev') ? process.env.api_url_dev : location.origin+"/api/v1"
    }

    get = (url, params = {}, headers = {})=>new Promise((resolve,reject)=>{
        axios.get(this.api_url+url,{params,headers}).then(response=>resolve(response.data)).catch(error=>reject(error))
    })

    post = (url, params = {}, headers = {})=>new Promise((resolve,reject)=>{
        axios.post(this.api_url+url, params, headers).then(response=>resolve(response.data)).catch(error=>reject(error))
    })

    patch = (url, params = {}, headers = {})=>new Promise((resolve,reject)=>{
        axios.patch(this.api_url+url, params,headers).then(response=>resolve(response.data)).catch(error=>reject(error))
    })

    put = (url, params = {}, headers = {})=>new Promise((resolve,reject)=>{
        axios.put(this.api_url+url, params, headers).then(response=>resolve(response.data)).catch(error=>reject(error))
    })

    delete = (url, params = {}, headers = {})=>new Promise((resolve,reject)=>{
        axios.delete(this.api_url+url,{params, headers}).then(response=>resolve(response.data)).catch(error=>reject(error))
    })

    signIn = (url, params = {}, headers = {})=>new Promise((resolve,reject)=>{
        axios.post(url, params, headers).then(response=>resolve(response.data)).catch(error=>reject(error))
    })

    refreshToken = (url, params = {}, headers = {})=>new Promise((resolve,reject)=>{
        axios.post(url, params, headers).then(response=>resolve(response.data)).catch(error=>reject(error))
    })
    gets = (url, params = {})=>new Promise((resolve,reject)=>{
        axios.get(url, params).then(response=>resolve(response.data)).catch(error=>reject(error))
    })
}
