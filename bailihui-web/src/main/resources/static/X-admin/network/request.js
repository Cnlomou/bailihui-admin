const util = {
  ___token: '',
  getTokenCookie() {
    if (this.___token !== '')
      return this.___token;
    let cookies = new String(document.cookie);
    let arr = cookies.split(';')
    for (let i = 0; i < arr.length; i++) {
      let pair = arr[i].split('=');
      if (pair[0].trim() === 'jwt') {
        this.___token = pair[1].trim();
      }
    }
    return this.___token;
  },
  loadAndMsg(layer, asyc) {
    const loadInde = layer.load(1, {time: 10 * 1000})

    function close() {
      layer.close(loadInde);
    }

    function success(msg, next) {
      layer.msg(msg, {time: 1000, icon: 1}, () => {
        if (typeof next === 'function')
          next();
      })
    }

    function failure(msg, next) {
      layer.msg(msg, {time: 1000, icon: 5}, () => {
        if (typeof next === 'function')
          next()
      })
    }

    asyc(close, success, failure)
  },
  verifyFloat(float, sucess, fail) {
    if (isNaN(parseFloat(float))) {
      if (typeof fail === "function")
        fail();
      return false;
    }
    if (typeof sucess === "function")
      sucess();
    return true;
  },
  dateFormat(fmt, date) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      }
      ;
    }
    ;
    return fmt;
  }
  // dateFormat("YYYY-mm-dd HH:MM", date)
}

/*网络请求*/
const option = {
  baseURL: 'https://blhapi.applinzi.com',
  // baseURL: 'http://localhost:8080/bailihui',
  timeout: 8000,
  headers: {
    accept: 'application/json'
  },
  withCredentials: true
}

const instance = axios.create(option);
//请求拦截器
instance.interceptors.request.use((request)=>{
    request.headers['Content-Type']='application/json';
  return request;
})
//

//响应拦截器
instance.interceptors.response.use((res) => {
  if (res.status === 401 || res.data.status === 401) {
    console.log('没有授权的请求');
    location.href = '/X-admin/login.html'
  }
  return res;
})

function request(config) {
  return instance(config).then(res => {
    if (res.status === 200) {
      return Promise.resolve(res.data)
    }
  })
}
function jqRequest(config) {
  return new Promise((resolve,reject) => {
    $.ajax({
      type: config.method,
      url: option.baseURL+config.url,
      data: config.data,
      headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf8'},
      success: function (res) {
        console.log(res);
        resolve(res);
      },
      error: function (err) {
        reject(err)
      }
    })
  })
}
const network = {
  addCategory(body){
    return request({
      url: '/category/add',
      data: body,
      method: 'post'
    })
  },
  lockAdmin(destId){
    return request({
      url: '/admin/lock/1/'+destId,
      method: 'put'
    })
  },
  deleteAdmin(destid){
      return request({
        url: '/admin/del/'+1+'/'+destid,
        method: 'delete',
      })
  },
  updateAdmin(body){
    return request({
      url: '/admin/update',
      method: 'put',
      data: body
    })
  },
  getAdminById(id){
    return request({
      url: '/admin/sel/'+id,
      method: 'get'
    })
  },
  getAdmins(pageNum){
    return request({
      url: '/admin/page/'+pageNum,
      method: 'get'
    })
  },
  addAdmin(body){
    return request({
      url: '/admin/add',
      method: 'post',
      data: body
    })
  },
  deleteGoods(body){
    return request({
      url: '/goods/all',
      method: 'delete',
      data: body
    })
  },
  login(parm){
    return request({
      url:'/admin/login',
      method: 'post',
      data: parm
    })
  },
  logout(){
    return request({
      url: '/logout',
      method: 'get'
    })
  },
  updateGoods(id, field, value) {
    return request({
      url: '/goods/update/' + id,
      method: 'put',
      data: {
        field: field,
        value: value
      }
    })
  },
  //添加商品
  addGoods(param) {
    return request({
      url: '/goods/add',
      method: 'post',
      data: param,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  },
  //获取分类信息
  getCategories() {
    return request({
      url: '/category/all',
      method: 'get'
    })
  },
  //获取订单信息
  getOrderDetails(num) {
    return request({
      url: '/order/page/'+num,
      method: 'get'
    })
  },
  //修改订单状态
  updateOrderStatus(id, status) {
    return request({
      url: '/order/update/' + id + '/' + status,
      method: 'put',
    })
  },
  BASE_URL: option.baseURL,

}
