<template>
    <div>
		<div class="car_header">
            <div class="con">
                <img src="./static/img/local.png" alt="">
                <i class="h_icon_loca"></i>
                <span>凯通大厦</span>
                <i class="h_icon_xia"></i>
                <img src="./static/img/down.png" alt="">
            </div>
        </div>
        <div class="tips">
            <span>小提示</span>
            <p>开通会员卡，本单可省<i>6元</i></p>
        </div>
        <div class="miancar">
            <div class="order">
                <div class="group-content" v-if="cart.goods.length">
                    <ul class="group-item-list">
                        <li class="item-list-car" v-for="item in cart.goods" :key="item.gid">
                            <div class="item-checkbox">
                                <i class="checkbox-c" @click="toggleCheck(item)" :class="item.ischeck ? 'hot' : ''"></i>
                            </div>
                            <div class="item-image">
                                <img :src="item.thumb" :alt="item.gname" class="item-img">
                            </div>
                            <div class="item-info">
                                <p class="item-name">{{ item.gname }}</p>
                                <div class="item-price">
                                    <span class="item-price-unit">￥</span>
                                    <span class="item-price-price">{{ item.gdiscount }}</span>
                                    <del style="color: #bbbbbb">
                                        <span>￥{{ item.gprice }}</span>
                                    </del>
                                </div>
                                <cart :goods="item" :isExist="true" @changeCart="getCart"></cart>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="group-content-null" v-else>
                    您还未选购商品！
                </div>
            </div>
            <!-- 订单信息 -->
            <div class="price-list-panel">
                <ul>
                    <li class="frist">
                        <p class="left">商品总价</p>
                        <p class="right">
                            <span class="price">￥{{ (cart.price).toFixed(2) }}</span>
                            <span class="nopri">其中￥2.9不可使用红包</span>
                        </p>
                    </li>
                    <li>
                        <p class="left">
                            <img src="./static/img/img_20170106155049081.png" alt="">
                            商品券
                        </p>
                        <p class="right">
                            登录后查看商品券
                        </p>
                    </li>
                    <li>
                        <p class="left">
                            <img src="./static/img/img_20170106155024750.png" alt="">
                            红包
                        </p>
                        <p class="right more" style="color: rgb(150, 150, 150);">
                            登录后查看红包
                        </p>
                    </li>
                    <li>
                        <p class="left">商品实付</p>
                        <p class="right">￥{{ (cart.discount).toFixed(2) }}</p>
                    </li>
                    <li>
                        <p class="left">配送费</p>
                        <p class="right">￥10</p>
                    </li>
                </ul>
                <div class="total_price">
                    合计
                    <span>￥{{(cart.discount + 10).toFixed(2) }}</span>
                </div>
            </div>
            <!-- 会员 -->
            <div class="data-v">
                <div class="openvip">
                    <img src="https://j-image.missfresh.cn/img_20171028224101960.png?iopcmd=convert&dst=webp">
                    <p>开通会员优惠多多</p>
                </div>
                <ul class="list">
                    <li>
                        <img src="https://j-image.missfresh.cn/img_20180521204629828.png">
                        <div class="member">
                            <p>
                                优享会员 ￥ <span>8</span>/月
                            </p>
                            <div>
                                <i class="iconfont icon-icon"></i>
                            </div>
                        </div>
                    </li>
                    <li>
                        <img src="https://j-image.missfresh.cn/img_20180521215123923.png">
                        <div class="member">
                            <p>
                                优享会员 ￥ <span>12.12</span>/3月
                            </p>
                            <div>
                                <i class="iconfont icon-icon"></i>
                            </div>
                        </div>
                    </li>
                    <li>
                        <img src="https://j-image.missfresh.cn/img_20180521215326042.png">
                        <div class="member">
                            <p>
                                优享会员 ￥ <span>18</span>/6月
                            </p>
                            <div>
                                <i class="iconfont icon-icon"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 推荐商品 -->
            <div>
                <div class="title">推荐商品</div>

                <!-- 推荐商品内容大框-->
                <div class="box" v-if="recommendgoods.length">

                    <!-- 推荐商品展示-->
                    <div class="box1" v-for="item in recommendgoods" :key="item.gid">
                        <router-link :to="{name:'goodsinfo',query:{gid:item.gid,cid1:item.cid1}}" tag="img" class="tu" :src="item.thumb"></router-link>
                        <div class="depict">{{ item.gname }}</div>
                        <div class="depict1">{{ item.gdes }}</div>
                        <div class="bottom">
                            <div class="left">
                                <div class="up">¥{{ item.gprice }}</div>
                                <div class="down">
                                    <h1>¥{{ item.gdiscount }}</h1>
                                    <div>会员{{ (item.gdiscount / item.gprice * 10).toFixed(1) }}折</div>
                                </div>
                            </div>
                            <cart :goods="item" :isExist="true" @changeCart="getCart"></cart>
                        </div>
                    </div>

                </div>
                <!-- 推荐商品内容结束-->

                <!-- 底部提示 -->
                <div class="di">没有更多了~</div>
            </div>
        </div>
        <footer>
            <div class="f_left">
                <div class="all">
                    <span @click="allCheck"></span>
                    全选
                </div>
                <div class="priceinfo">
                    <div class="heji">
                     合计：<span>￥{{(cart.discount + 10).toFixed(2) }}</span>
                    </div>
                    <p>配送费￥<span>10</span>,包含会员卡费用6元</p>
                </div>
            </div>
            <div class="f_right" @click="jumpPay" :class="isJump ? 'hot' : ''">去结算</div>
        </footer>
        <my-footer></my-footer>
    </div>
</template>

	<script>
        import MyFooter from '../common/footer/myfooter'
        import cart from '../common/cart/cart'
		export default {
			name:'car',
			data(){
				return {
				    cart: null,
                    recommendgoods: [],
				}
			},
            computed: {
			    // 是否全选
			    isAllCheck() {
			        return this.cart.goods.every(ele => ele.ischeck);
                },
                //判断是否可以去支付
                isJump() {
			        if (this.cart.discount) {
			            return true;
                    }
                    return false
                },
            },
            methods: {
			    //从本地存储加载购物车商品资料
                getCart() {
                    this.cart = JSON.parse(localStorage.cart);
                },
                //改变商品选中状态
                toggleCheck(item) {
                    item.ischeck = !item.ischeck;
                },
                //重新计算商品总数的方法
                cartSum() {
                    let discount = 0;
                    let price = 0;
                    let count = 0;
                    this.cart.goods.forEach(v => {
                        if (v.ischeck) {
                            discount += v.gdiscount * v.numbers;
                            price += v.gprice * v.numbers;
                            count += v.numbers;
                        }
                    });
                    this.cart.discount = discount;
                    this.cart.price = price;
                    this.cart.count = count;
                },
                //全选或者全不选方法
                allCheck() {
                    if (this.isAllCheck) {
                        let goods = this.cart.goods.forEach(ele => {
                            ele.ischeck = false;
                        })
                    }
                    else {
                        let goods = this.cart.goods.filter(ele => ele.ischeck == false);
                        goods.forEach(ele => {
                            ele.ischeck = true;
                        })
                    }
                },
                //获取推荐商品方法
                getRecommendGoods() {
                    let gidarr = this.cart.goods.map(ele => ele.gid);
                    let str = gidarr.join() || 0;
                    this.axios.get('/goods/recommendgoods',{params:{str:str}}).then(res => {
                        this.recommendgoods = res.data;
                    })
                },
                //跳转到支付页面
                jumpPay() {
                    if (!this.isJump) {
                        return
                    }
                    let uid = sessionStorage.uid || 0;
                    let {discount , price , count} = this.cart;
                    let goods = this.cart.goods.filter(ele => ele.ischeck);
                    let data = {uid , discount , price , count , goods};
                    this.axios.post('/orders/insert',data).then(res => {
                        if (res.data.code === 0) {
                            let oid = res.data.oid;
                            this.$router.push({path:'/pay',query:{oid}});
                        }
                    });
                },
            },
            components: {
			    MyFooter,
                cart
            },
            created() {
			    this.getCart();
			    this.getRecommendGoods();
            },
            watch: {
			    cart: {
			        handler() {
                        localStorage.cart = JSON.stringify(this.cart);
                        this.cartSum();
                    },
                    deep: true
                }
            }
		}
	</script>

	<style scoped>
		@import url(./static/css/car.css);
	</style>
