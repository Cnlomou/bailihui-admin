const app = new Vue({
  el: "#cate",
  data: {
    categories: []
  },
  created(){
    network.getCategories().then(res => {
      if(res.flag===true){
        this.categories=res.data;
      }
    })
  }
})

layui.use(['form','upload','layer'], function(){
  let form = layui.form;
  let upload=layui.upload;
  let layer=layui.layer;
  form.on('submit(formGoods)', function(data){
    console.log(data);
    const field=data.field;
    util.verifyFloat(field.price,()=>{
      const param=[{
        name: field.name,
        categoryid: field.category,
        price: field.price,
        description: field.des,
        info: field.info,
        image: field.image
      }]
      const loadIndex=layer.load(1,{time: 10000})
      network.addGoods(param)
        .then(res => {
          console.log(res)
          if(res.flag===true){
            layer.close(loadIndex)
            layer.msg('添加成功',{time: 1000,icon: 1})
          }else{
            layer.msg('添加失败',{time:1000,icon: 5})
          }
        })
    },()=>{
      layer.msg('非法的金额格式!',{time: 1500,icon: 5})
    })
    return false;
  });
  //上传图片
  var uploadInst = upload.render({
    elem: '#test1' //绑定元素
    ,url: network.BASE_URL+'/upload', //上传接口
    method: 'post',
    field: 'images',
    accept: 'images'
    ,done: function(res){
      if(res.flag===true){
        layer.msg('上传成功!', {
          icon: 1,
          time: 1000
        });
        let s = network.BASE_URL+'/image'+res.data[0];
        console.log('image:'+s);
        $('#image').val(s)
      }else{
        layer.msg('上传失败!',5,{time:1000})
      }
    }
    ,error: function(){
      layer.msg('网络异常！',5,{time:1000})
    }
  });
});