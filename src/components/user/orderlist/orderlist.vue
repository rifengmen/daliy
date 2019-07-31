<template>
    <div style="width: 100%;background: white">
        <div class="headern">
            <div class="headern-body">
                <span class="iconfont icon-cuohao"></span>
                <div class="gengduo">
                    <p class="iconfont icon-weibiaoti2zhuanhuan"></p>
                </div>
            </div>
        </div>
        <div class="headern1">
            <div class="headern1-body">
                <router-link :to="{name:'order'}" tag="span" class="iconfont icon-fanhui" style="color: black">返回</router-link>
                <p>订单详情</p>
            </div>
        </div>
        <div class="contentn">
            <img src="./static/img/20181211162951.png" alt="">
            <div class="contentn-one">订单已签收</div>
            <div class="contentn-tow"><span>还未收到商品</span><span class="iconfont icon-wenhaoyuanyiwenxianxing"></span></div>
            <div class="san">
                <div class="">申请售后退款</div>
                <div class="hot">去评价</div>
                <div class="hot">再来一单</div>
            </div>
        </div>
        <div class="line"></div>
        <div class="comment1">
            <div class="comment1-des">
                <div class="des-one">
                    <span>配送信息</span>
                    <div>打赏小哥</div>
                </div>
                <div class="des-tow">
                    <span>您的订单已配送成功,如需其他帮助请拨小哥的配送电话,或者你可以联系客服.</span>
                    <p>2018-12-11 15:10:44</p>
                    <div class="iconfont icon-arrow-r"></div>
                </div>
                <div class="des-tow">
                    <span>配送员 张益达</span>
                    <p>为您服务</p>
                    <div class="iconfont icon-dianhualianxi hot">电话联系</div>
                </div>
                <div class="des-tow">
                    <span>樊泽阳 15735181110</span>
                    <p>山西省太原市小店区凯通大厦501</p>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="comment1" v-if="goods.length">
            <div class="comment1-des">
                <div class="des-one">
                    <span>订单信息</span>
                </div>
                <div class="des-one">
                    <span>订单编号:35132231321</span>
                    <div>复制</div>
                </div>
                <div class="des-one">
                    <span>交易流水:ADFSADF5645131sSDFASDf</span>
                </div>
                <div class="des-one">
                    <span>创建时间:{{orders.cttime.slice(0,10)}}</span>
                </div>
                <div class="des-one">
                    <span>付款时间:{{orders.cttime.slice(0,10)}}</span>
                </div>
                <div class="des-one">
                    <span>配送时间:{{orders.cttime.slice(0,10)}}</span>
                </div>
                <div class="des-one">
                    <span>快递单号:asdfdsafsdf</span>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class=comment1>
            <div class="des-one">
                <span>物品详情</span>
            </div>
            <div class="des-tow" v-if="goods.length">
                <ul>
                    <li v-for="item in goods" :key="item.gid">
                        <img :src="item.thumb">
                    </li>
                </ul>
            </div>
        </div>
        <div class="line"></div>
        <div class=comment1 v-if="goods.length">
            <div class="des-one">
                <span><strong>总价</strong></span>
            </div>

            <div class="total_price">
                合计
                <span>￥{{ orders.discount }}</span>
            </div>
        </div>
        <div class="line"></div>
        <div class="line">没有更多内容了</div>
    </div>
</template>

<script>
    export default {
        name: "orderlist",
        data() {
            return {
                uid: 0,
                oid: 0,
                orders: null,
                goods: [],
            }
        },
        methods: {
            //获取订单信息
            getOrder() {
                this.axios.get('/orders/query',{params:{oid:this.oid,uid:this.uid}}).then(res => {
                    if (res.data.code === 0) {
                        this.orders = res.data.orders;
                        this.goods = res.data.goods;
                    }
                    else if (res.data.code === 1) {
                        console.log(res.data.msg);
                    }
                })
            },
        },
        created() {
            this.uid = JSON.parse(sessionStorage.uid);
            this.oid = this.$route.query.oid;
            console.log(this.oid);
            this.getOrder();
        },
    }
</script>

<style>
    @import url('static/css/orderlist.css');
    @import url(//at.alicdn.com/t/font_960145_s8m9lm46bfm.css);
    html,body{
        background: white;
    }
</style>
