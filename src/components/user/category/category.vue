<template>
    <div class="category">
        <my-header></my-header>
        <div class="category-main">
            <div>
                <div class="main-left">
                    <div class="main-list" id="wrapper1" ref="wrapper1" v-if="querylevel1cate.length">
                        <ul id="scroller1">
                            <li v-for="item in querylevel1cate" :key="item.cid" @click="changelevel1(item.cid)" :class="currentlevel1 === item.cid ? 'active' : ''"> {{ item.cname }} </li>
                        </ul>
                    </div>
                </div>
                <div class="main-right">
                    <div class="main-content" v-if="goodslist.length">
                        <ul>
                            <li class="content" >
                                <div>
                                    <div class="contentMain" ref="level2scroll">
                                        <ul class="content-top" ref="contenttop">
                                            <li v-for="(item,index) in goodslist" :key="item.cid" @click="jumplist(index)" :class="index === level2index ? 'hot' : ''"> {{ item.cname }} </li>
                                        </ul>
                                    </div>
                                    <div class="opendown"><i class="iconfont">&#xe632;</i></div>
                                </div>
                                <div class="contentInfo" ref="goodslistscroll">
                                    <ul>
                                        <li v-for="(item,index) in goodslist" :key="item.cid" ref="listheight">
                                            <ul class="content-footer">
                                                <li> {{ item.cname }} </li>
                                                <li v-for="goods in item.goods" :key="goods.gid">
                                                    <router-link :to="{name:'goodsinfo',query:{gid:goods.gid,cid1:goods.cid1}}" tag="div" class="content-img">
                                                        <img :src="goods.thumb" :alt="goods.gname">
                                                    </router-link>
                                                    <div class="content-info">
                                                        <div class="info-name"> {{ goods.gname }} </div>
                                                        <div class="info-des"> {{ goods.gdes }} </div>
                                                        <div class="info-price">
                                                            <span>￥<span> {{ goods.gprice }} </span></span>
                                                            <div>
                                                                <span class="category-discount">￥<span> {{ goods.gdiscount }} </span></span>
                                                                <span class="vip">会员8.2折</span>
                                                            </div>

                                                        </div>
                                                        <cart :goods="goods"></cart>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="main-up" style="display: none">
                        <div class="up">
                            <ul>
                                <li>优选水果</li>
                                <li>优选蔬菜</li>
                                <li>优选肉蛋</li>
                                <li>优选水产</li>
                                <li>优选乳品</li>
                                <li>优选零食</li>
                                <li>优选酒饮</li>
                                <li>优选熟食</li>
                                <li>优选轻食</li>
                                <li>优选素食</li>
                                <li>优选粮油</li>
                                <li>优选日百</li>
                            </ul>
                            <div class="updown"><i class="iconfont">&#xe630;</i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    const CLIENTWIDTH = 750;
    const LEVEL2WIDTH = 160;
    import MyHeader from '../common/header/myheader'
    import MyFooter from '../common/footer/myfooter'
    import cart from '../common/cart/cart'
    import BScroll from 'better-scroll'
    export default {
        name: "category",
        data() {
            return {
                querylevel1cate: [],
                currentlevel1: 0,
                goodslist: [],
                goodslistheight: [],
                level2index: 0,
            }
        },
        computed: {
            _level2itemwidth() {
                return LEVEL2WIDTH * window.innerWidth / CLIENTWIDTH
            },
        },
        methods: {
            //初始化scroll
            _initlevel1scroll() {
                if (this.$refs.wrapper1) {
                    this.level1scroll = new BScroll(this.$refs.wrapper1,{
                        click: true,
                        scrollbar: {
                            fade: true,
                            interactive: false,
                        },
                    })
                }
            },
            _initlevel2scroll() {
                if (this.$refs.level2scroll) {
                    this.level2scroll = new BScroll(this.$refs.level2scroll,{
                        click: true,
                        scrollX: true,
                        scrollY: false
                    });
                }
                if (this.$refs.goodslistscroll) {
                    this.goodslistscroll = new BScroll(this.$refs.goodslistscroll,{
                        click: true,
                        probeType: 3
                    })
                }
                this.goodslistscroll.on('scroll',function (e) {
                    let y = Math.abs(Math.round(e.y));
                    this.level2index = this._scroll(y);
                }.bind(this));
            },
            //获取所有内容高度
            getheightlist() {
                let list = this.$refs.listheight;
                let height = 0;
                this.goodslistheight.push(height);
                for (let i = 0; i < list.length; i++) {
                    height += list[i].scrollHeight;
                    this.goodslistheight.push(height);
                }
            },
            //页面滚动时获取对应二级标题索引值
            _scroll(y) {
                let arr = this.goodslistheight;
                for (let j = 0 ; j < arr.length ; j++) {
                    let top = arr[j];
                    let bottom = arr[j+1];
                    if (y >= top && y < bottom) {
                        return j;
                    }
                }
                return 0;
            },
            //点击二级列表goodslist滚动事件
            jumplist(index) {
                this.goodslistscroll.scrollTo(0,-this.goodslistheight[index],500)
            },
            //获取一级列表
            getlevel1cate() {
                this.axios.get('/admin/cate/querylevelcate').then(res => {
                    this.querylevel1cate = res.data;
                    this.currentlevel1 = this.querylevel1cate[0].cid;
                    this.getGoodsList(this.currentlevel1);
                    this.$nextTick(() => {
                        this._initlevel1scroll();
                    });
                })
            },
            //一级列表点击事件
            changelevel1(cid) {
                this.currentlevel1 = cid;
                this.getGoodsList(cid);
            },
            //获取二级列表以及对应商品的方法
            getGoodsList(cid) {
                this.axios.get('/goods/goodslist?cid='+cid).then(res => {
                    this.goodslist = res.data;
                    this.$nextTick(() => {
                        if (this.$refs.contenttop) {
                            this.$refs.contenttop.style.width = this._level2itemwidth * this.goodslist.length + "px"
                        }
                        this._initlevel2scroll();
                        this.getheightlist();
                    })
                })
            },
        },
        components: {
            MyHeader,
            MyFooter,
            cart
        },
        created() {
            this.getlevel1cate();
        },
        watch: {
            level2index(nval) {
                let  x = -this._level2itemwidth * nval;
                this.level2scroll.scrollTo(x,0,500)
            },
        },
    }
</script>

<style scoped>
    @import url(./static/css/category.css);
    @import url(./static/css/iconfont.css);
</style>
