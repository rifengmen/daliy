<template>
    <div>
        <div class="addcar" @click="insertGoods" v-show="!goods.numbers">
            <img src="./static/img/new-cart.a16f026.png" alt="">
        </div>
        <div class="compute" v-show="goods.numbers">
            <img src="./static/img/jian.png" alt="" class="jian" @click="reduceGoods">
            <div class="numbers">{{goods.numbers}}</div>
            <img src="./static/img/jia.png" alt="" class="jia" @click="addGoods">
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: "cart",
        props: {
            goods: {
                type: Object,
                require: true
            },
            isExist: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                cart: null,
            }
        },
        methods: {
            //本地存储不存在的情况
            _initCart() {
                localStorage.cart = JSON.stringify({
                    discount:0,
                    price:0,
                    count:0,
                    goods:[],
                })
            },
            //本地存储存在的情况
            _isExistCart() {
                if (localStorage.cart) {
                    return true
                }
                return false
            },
            //初始化购物车
            _getCart() {
                this.cart = JSON.parse(localStorage.cart)
            },
            //实时更新购物车信息
            _getCart1() {
                this.cart = localStorage.cart ? JSON.parse(localStorage.cart) : null;
                if (this.cart) {
                    let goods = this.cart.goods.filter(ele => ele.gid == this.goods.gid)[0];
                    if (goods) {
                        Vue.set(this.goods,'numbers',goods.numbers)
                    }
                }
            },
            //第一次添加购物车商品的方法
            insertGoods() {
                Vue.set(this.goods,'numbers',1);
                Vue.set(this.goods,'ischeck',true);
                if (!this._isExistCart()) {
                    this._initCart();
                }
                this._getCart();
                this.cart.goods.push(this.goods);
            },
            //再次添加购物车商品的方法
            addGoods() {
                this._getCart();
                let goods = this.cart.goods.filter(ele => ele.gid == this.goods.gid)[0];
                this.goods.numbers = ++goods.numbers;
            },
            //减少购物车商品的方法
            reduceGoods() {
                this._getCart();
                let goods = this.cart.goods.filter(ele => ele.gid == this.goods.gid)[0];
                this.goods.numbers = --goods.numbers;
                if (this.goods.numbers === 0) {
                    this.cart.goods = this.cart.goods.filter(ele => ele.gid != this.goods.gid)
                }
            },
            //计算商品总数的方法
            cartSum() {
                let discount = 0;
                let price = 0;
                let count = 0;
                this.cart.goods.forEach(v => {
                    discount += v.gdiscount * v.numbers;
                    price += v.gprice * v.numbers;
                    count += v.numbers;
                });
                this.cart.discount = discount;
                this.cart.price = price;
                this.cart.count = count;
            }
        },
        created() {
            this._getCart1();
        },
        watch: {
            cart: {
                handler() {
                    this.cartSum();
                    localStorage.cart = JSON.stringify(this.cart);
                    this.isExist && this.$emit('changeCart');
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    .addcar{
        width: 0.6rem;
        height: 0.6rem;
        position: absolute;
        bottom: 0;
        right: 0.1rem;
    }
    .addcar>img{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .compute{
        width: 1.3rem;
        height: 0.4rem;
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
    }
    .compute>img{
        width: 0.4rem;
        height: 0.4rem;
    }
    .compute>div{
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        font-size: 0.28rem;
        text-align: center;
        line-height: 0.4rem;
    }
</style>
