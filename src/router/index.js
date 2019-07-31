import Vue from 'vue'
import vueRouter from 'vue-router'
//引入组件    /*admin*/    /*login*/
//后台
import adminlogin from '../components/admin/login/login'
import main from '../components/admin/main/main'
import webinfo from '../components/admin/userinfo/webinfo'
import userinfo from '../components/admin/userinfo/userinfo'
import cate from '../components/admin/cate/cate'
import updatecate from '../components/admin/cate/updatecate'
import goods from '../components/admin/goods/goods'
import updategoods from '../components/admin/goods/updategoods'
//前台
import index from '../components/user/index/index'
import goodsinfo from '../components/user/goods/goodsinfo'
import category from '../components/user/category/category'
import car from '../components/user/car/car'
import order from '../components/user/order/order'
import orderlist from '../components/user/orderlist/orderlist'
import pay from '../components/user/pay/pay'
import success from '../components/user/success/success'
import mine from '../components/user/mine/mine'
import login from '../components/user/login/login'
import registe from '../components/user/login/registe'

Vue.use(vueRouter);
//创建router实例
export default new vueRouter({
    //配置路由
    routes:[
        {path:'/adminlogin', component:adminlogin, name:'adminlogin'},
        {path:'/main', component:main, name:'main',
            children: [
              {path: '/webinfo',component: webinfo, name: 'webinfo' },
              {path: '/userinfo',component: userinfo, name: 'userinfo' },
              {path: '/cate',component: cate, name: 'cate' },
              {path: '/updatecate',component: updatecate, name: 'updatecate' },
              {path: '/goods',component: goods, name: 'goods' },
              {path: '/updategoods',component: updategoods, name: 'updategoods' },
            ],
        },
        {path:'/', component:index, name:'index'},
        {path:'/goodsinfo', component:goodsinfo, name:'goodsinfo'},
        {path:'/category', component:category, name:'category'},
        {path:'/car', component:car, name:'car'},
        {path:'/order', component:order, name:'order'},
        {path:'/orderlist', component:orderlist, name:'orderlist'},
        {path:'/pay', component:pay, name:'pay', meta: { requiresAuth: true }},
        {path:'/success', component:success, name:'success'},
        {path:'/mine', component:mine, name:'mine'},
        {path:'/login', component:login, name:'login'},
        {path:'/registe', component:registe, name:'registe'},
    ]
});
