<template>
    <div class="home-box">
        <div class="header">
            <router-link :to="{name:'mine'}"><</router-link>
            <div>我的订单</div>
            <div>开发票</div>
        </div>
        <div class="order-body">
            <div class="banner1-info">
                <div v-if="typelist.length" class="order-nav-box">
                    <div v-for="item in typelist" :key="item.typecode" class="items-nav" :class="{hot:type == item.typecode}" @click="type = item.typecode">
                        <span>{{ item.typetext }}</span>
                    </div>
                    <div class="bar">
                        <span></span>
                    </div>
                </div>
            </div>
            <div class="banner2">
                <div>
                    <div class="order-items" v-if="orders.length">
                        <div class="dingdanbaoguo">
                            <div class="dingdingdandan" v-for="(item,index) in getList" :key="index">
                                <div class="ddddtop">
                                    <span>2小时达</span>
                                    <span class="ddstatus">{{ statusarr[item.status] }}</span>
                                    <span class="ddctime">{{ item.cttime.slice(0,10) }}</span>
                                </div>
                                <div class="ddddmid">
                                    <router-link :to="{name:'orderlist',query: {oid:item.oid}}" tag="div">
                                        <img v-for="goods in item.goods" :src="goods.thumb" :alt="goods.gname" :title="goods.gname">
                                    </router-link>
                                    <div>实付：￥{{ item.discount }}</div>
                                </div>
                                <div class="ddddbottom">
                                    <div>
                                        <span class="gengduo">更多</span>
                                        <span class="linghongbao">领红包</span>
                                        <span class="shenqing">申请退款</span>
                                        <span class="zailai">再来一单</span>
                                    </div>
                                </div>
                            </div>
                            <div class="jiazai">已经全部加载完毕</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "order",
		data(){
			return{
                orders: [],
                uid: 0,
                statusarr: ['未支付','待配送','已完成'],
                typelist: [
                    {typetext: '全部订单',typecode: -1},
                    {typetext: '未付订单',typecode: 0},
                    {typetext: '已付订单',typecode: 1},
                    {typetext: '完成订单',typecode: 2},
                ],
                type: -1,
			}
		},
		computed:{
            //查看未付订单
            //查看已付订单
            //查看已完成订单
            getList() {
                if (this.orders.length) {
                    if (this.type == -1) {
                        return this.orders;
                    }
                    else {
                        let list = this.orders.filter(ele => ele.status == this.type);
                        return list;
                    }
                }
            },
		},
		methods: {
            //获取用户全部订单,订单详情
            getOrders() {
			    this.axios.get('/orders/queryall',{params:{uid:this.uid}}).then(res => {
			        if (res.data.code === 0) {
			            this.orders = res.data.orders;
                    }
                    else if (res.data.code === 1) {
                        console.log(res.data.msg);
                    }
                })
            },
		},
        created() {
		    this.uid = JSON.parse(sessionStorage.uid);
		    this.getOrders();
        },
	}
</script>

<style scoped>
    @import url('./static/css/order.css');
    @import url('./static/css/swiper.min.css');
</style>
