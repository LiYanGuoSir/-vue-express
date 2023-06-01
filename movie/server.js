// 引入并创建服务对象
const express =require('express');
const app = express();
// 引入数据所在文件.require jison返回对象，readfile json返回buffer
const data =require('./data.json');
// 引入fs
const fs =require('fs');

// 使用静态资源服务中间件，参数是根目录下的public文件夹
app.use(express.static(__dirname + '/public'));

// 封装函数1，用于筛选出所有数组data中的type的值为美食的元素。
// 接下来同样封装几个函数，筛选出不同的数据，在不同的接口里面调用这些函数，得到特定数据，实现访问某个接口就返回数组data中特定的数据。

//  导航条其他分页路由
app.get('/othermovie',(request,response)=>{
    // 根据关键字筛选电影
    //   console.log(request.query)
    othermovies=data.movies.filter(item=>{
        return item.tags.indexOf(request.query.data)!=-1;
     })
    //  console.log(othermovies);
    response.send(othermovies);
})

// 首页路由
app.get('/movie',(request,response)=>{
   
    // 返回data中的对象movies里面随机15个视频
    let arr=data.movies;

    // sort方法里面return返回正值，就交换数组中两个元素的位置，反之不交换位置。实现打乱data中的数组movies里面的元素的效果
    arr.sort(function(a,b){
        // 生成-1到1之间的随机数
        return Math.random()-0.5;
    })
    
    // 生成的随机数是0到movies数组的长度-1之间的数
    //   Math.round(Math.random()*(b)+a);
    response.send(arr);
})

// 更多推荐视频路由
app.get('/moremovie',(request,response)=>{
    let arr=data.movies;
    // sort方法里面return返回正值，就交换数组中两个元素的位置，反之不交换位置。实现打乱data中的数组movies里面的元素的效果
    arr.sort(function(a,b){
        // 生成-1到1之间的随机数
        return Math.random()-0.5;
    })
    
    //  拿到数组arr中的前四个元素
    response.send(arr.slice(0,4));
    // console.log(arr.slice(0,2))
})

// 搜索路由
app.get('/select',(request,response)=>{
    // console.log(request)
    let selectmovies;
    // 根据关键字筛选电影
    if(request.query.keywords){
        // console.log(request.query.keywords)
           selectmovies=data.movies.filter(item=>{
              return item.name.indexOf(request.query.keywords)!=-1;
           })
    }else{
        selectmovies=[];
    }
    // console.log(selectmovies)
    
    response.send(selectmovies);
})

// 添加电影
app.get('/addmovie',(request,response)=>{
    //  console.log(request.query.userdata);
    let userdatas=request.query.userdata;
    // 遍历对象userdata，key依次代表每个属性
    for(var key in userdatas){
        if(userdatas[key]===''){
            response.end("输入数据不能有空！请填写完整！");
            break;
        }else{
            // 对标签属性进行改造，让接收到的对象中的属性tags的值从字符串变成以逗号分割的数组
    userdatas.tags=userdatas.tags.split(',');
    // 添加id属性
    userdatas.id=++data.mid;
    // 将拼接好的数据放到data的movies属性的值里面的末尾
    data.movies.push(userdatas);
    // 将添加了用户输入的新视频数据的data写入到data.json文件中
    fs.writeFileSync('./data.json',JSON.stringify(data));
    response.send("发布成功！")

        }
    }



})

// 注册
app.get('/register',(request,response)=>{
    // console.log(request.query);
    request.query.uid= ++data.uid;
// 将用户信息保存到用户数组中
data.users.push(request.query);
// 将data转化成json字符串，覆盖写入到data。json文件中
let str= JSON.stringify(data);
fs.writeFile('./data.json',str,err=>{
    if(err){
        response.send('服务器内部错误');
        return;
    }
    response.send('注册成功');
})
    response.send("注册成功！请立即登录");
})

// 登录
app.get('/login',(request,response)=>{
    // 获取表单数据
    let userInfo=request.query;
    // 标识变量
    let is_success=false;
    for(let i=0;i<data.users.length;i++){
        if(data.users[i].account===userInfo.account && data.users[i].password===userInfo.password){
            // 满足判断，说明用户已注册，改变标识变量的值为true
            is_success=true;
            break;
        }
    }  
    // 根据标识变量的值是否为true，返回用户是否登录成功

        response.end(JSON.stringify(is_success)); 
})

// 接收用户发布的评论，并拼接到数据文件中
  
app.get('/pinglun',(request,response)=>{
    // 接收到的数据为{ keywords: 'q', moviesid: '0' }
    // console.log(request.query);
    // console.log( Number(request.query.moviesid))
    // 将接收到的评论数据放到对应id的视频中的属性pinglun里面，根据request.query.moviesid找到对应视频
    // 空字符串和undefined转成布尔值都是false，其余为true，由此判断接收到的用户与视频id发来的评论不为空
        let moviesid=Number(request.query.moviesid);

      let arr= data.movies.filter(item=>{
          if(item.id === moviesid){
            item.pinglun.push(request.query.keywords);
            // console.log(item);
             return item;
          }
        })
        // console.log(data.movies[0]);
        fs.writeFileSync('./data.json',JSON.stringify(data));
        
        // console.log(arr);
        response.send(arr);
    
})



// 启动服务/movie/:id.html
app.listen(5000,()=>{
    console.log('服务已经启动');
})