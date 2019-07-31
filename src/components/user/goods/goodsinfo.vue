<template>
    <div class="main">
        <loading v-if="loading"></loading>
        <!--头部-->
        <div class="title-list">
            <span></span>
            <div class="font">商品详情</div>
            <span class="share">
            <img src="./static/img/share.png">
        </span>
        </div>
        <!--主要信息-->
        <div class="maininfo" v-if="goodsinfo">
            <div class="wapper">
                <div class="banner">
                    <swiper :options="swiperOptions" ref="mySwiper">
                        <swiper-slide v-for="(item,index) in banner" :key="index">
                            <img :src="item" style="width: 100%;height:100%">
                        </swiper-slide>
                    </swiper>
                    <div class="pagination banner-num"></div>
                </div>
                <div class="desc">
                    <div class="produxt-title">
                        <span> {{ goodsinfo.gdes }} </span>
                    </div>
                    <div class="product-num">
                        <p> {{ goodsinfo.gname }} </p>
                    </div>
                    <div class="product-price">
                        <div class="left">￥<span> {{ goodsinfo.gdiscount }} </span></div>
                        <div class="right">已售<span> {{ goodsinfo.gcount }} </span>份</div>
                    </div>
                    <div class="product-area">
                        <div>产地 <span>湖南</span></div>
                        <div>2小时到达</div>
                        <div>实付满49包邮</div>
                    </div>
                </div>
                <div class="discount">
                    <div class="discount-top">
                        <div class="discount-top-font">优惠</div>
                        <div class="discount-top-desc">详情<i class="iconfont icon-youjiantou"></i></div>
                    </div>
                    <div class="discount-bottom">
                        <img src="./static/img/img.png">
                        <span>每单购买不超过1件，享受此优惠</span>
                    </div>
                </div>
                <div class="card">
                    <div class="cardinner">
                        <img src="./static/img/card.png">
                        <span>开通会员优惠多多</span>
                        <div>去开通 <i class="iconfont icon-youjiantou"></i></div>
                    </div>
                </div>
                <div class="packet">
                    <div class="packetinner">
                        <img src="./static/img/back.png">
                        <span>该商品分享可领49减10红包</span>
                        <img src="./static/img/issue.png" id="issue">
                        <div>去分享<i class="iconfont icon-youjiantou"></i></div>
                    </div>
                    <p>已经有9755人分享了该商品</p>
                </div>
                <div class="finger">
                    <div class="fingerinner">
                        <div class="fingerinner-top">
                            <span>安心指纹</span>
                            <span>点击查看<i class="iconfont icon-youjiantou"></i></span>
                        </div>
                        <div class="fingerinner-bottom">
                            <img src="./static/img/note.png">
                            <p>优鲜安心检测</p>
                        </div>
                    </div>
                </div>
                <div class="light">
                    <div class="lightinner">
                        <div class="lightinner-title">亮点</div>
                        <div class="lightinner-content">
                            <div class="message">
                                <div class="messageimg">
                                    <img src="./static/img/douhao.png">
                                </div>
                                <ul>
                                    <li>瓤嫩，果肉放进嘴巴轻轻一咬就融化</li>
                                    <li>蜜桔皮薄肉嫩，香甜微酸，入口即化</li>
                                    <li>蜜桔皮薄肉嫩，香甜微酸，入口即化</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="recommend">
                    <div class="recommend-title">推荐商品</div>
                    <swiper class="recommend-content" :options="recommrndOptions">
                        <swiper-slide class="recommend-content-wapper" v-for="item in recommendgoods" :key="item.gid">
                            <div class="goodslist">
                                <div class="goodslist-img">
                                    <img :src="item.thumb">
                                </div>
                                <div class="goodslist-title"> {{ item.gname }} </div>
                                <div class="goodslist-desc"> {{ item.gdes }} </div>
                                <div class="goodslist-price">
                                    <div class="goodslist-price-old">￥ <span> {{ item.gprice }} </span></div>
                                    <div class="goodslist-price-new">
                                        <span>￥ {{ item.gdiscount }} </span>
                                        <div class="member-card">会员5.4折</div>
                                    </div>
                                </div>
                                <div class="goodslist-cart">
                                    <img src="./static/img/new-cart.png" alt="">
                                </div>

                                <!--购物车加减-->
                                <div class="numcart" style="display: none">
                                    <div class="jian">
                                        <img src="./static/img/jian.png" alt="">
                                    </div>
                                    <span>1</span>
                                    <div class="jia">
                                        <img src="./static/img/jia.png" alt="">
                                    </div>
                                </div>

                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="goodsinfo">
                    <div class="goodsinfo-top">
                        <div class="goodsinfo-title">商品详情</div>
                    </div>
                    <div class="goodsinfo-bottom" v-html="goodsinfo.gcontent" style="padding-right: 0.2rem ">
                    </div>
                </div>
            </div>
        </div>
        <!--底部-->
        <div class="footer">
            <div class="footer-left">
                <img src="./static/img/shop-icon.png">
                <div class="num" style="display: none">
                    <span>1</span>
                </div>
            </div>
            <div class="footer-right">加入购物车</div>
        </div>
    </div>
</template>

<script>
    import loading from '../common/loading/loading'
    export default {
        name: "goodsinfo",
        data() {
            return {
                goodsinfo: null,
                recommendgoods:[],
                gid: 0,
                cid1:0,
                loading:true,
                banner: [],
                swiperOptions: {
                    pagination: {
                        el: '.pagination',
                        type: 'fraction',
                    },
                },
                recommrndOptions: {
                    slidesPerView: 2,
                },
            }
        },
        methods: {
            //获取商品详情
            getGoodsInfo() {
                this.loading = true;
                this.axios({
                    url:'/goods/goodsinfo',
                    method:'get',
                    params:{
                        gid:this.gid,
                        cid1:this.cid1,
                    }
                }).then(res => {
                    this.loading = false;
                    if (res.data.code === 0) {
                        this.goodsinfo = res.data.goodsinfo;
                        this.recommendgoods = res.data.recommendgoods;
                        this.banner = this.goodsinfo.gbanner.split(",");
                    }
                    else if (res.data.code === 1) {
                        this.$message.error(res.data.msg)
                    }
                })
            },
        },
        created() {
            this.gid = this.$route.query.gid;
            this.cid1 = this.$route.query.cid1;
            this.getGoodsInfo();
        },
        components: {
            loading
        },
    }
</script>

<style scoped>
    @import url(./static/css/goodsinfo.css);
    @import url(//at.alicdn.com/t/font_959734_zuly3ap9e5h.css);
    .swiper-pagination-fraction {
        bottom: 0;
    }
    .product-num>p{
        text-align: left;
    }
    .goodsinfo-top{
        width: 100%;
        margin: 0.1rem 0;
    }
    .swiper-slide {
        height: 5rem;
    }
    .swiper-pagination-fraction {
        text-align: right;
        padding-right: 0.32rem;
    }
</style>
