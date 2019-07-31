<template>
    <div class="home-box">
        <loading v-if="isShowLoading"></loading>
        <my-header></my-header>
        <div class="body">
            <div class="banner1-info">
                <swiper :options="navSwiperOption" ref="navSwiper" v-if="querylevel1cate.length">
                    <swiper-slide v-for="item in querylevel1cate" :key="item.cid"><span>{{ item.cname }}</span></swiper-slide>
                    <div class="bar">
                        <span></span>
                    </div>
                </swiper>
            </div>
            <div class="swiper-container banner2">
                <swiper :options="listSwiperOption" ref="listSwiper" v-if="querylevel1cate.length">
                    <swiper-slide v-for="item in querylevel1cate" :key="item.cid">
                        <div v-if="goods[item.cid].length" style="width: 100%">
                            <my-scroll :data="goods[item.cid]" :isPullingup="ispullingup[item.cid]" @pullingup="getGoods"></my-scroll>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="footer">
            <a>
                <div><img src="./static/img/shouye.png" alt=""></div>
                <p>首页</p>
            </a>
            <router-link :to="{name:'category'}">
                <div><img src="./static/img/fenleihui.png" alt=""></div>
                <p>分类</p>
            </router-link>
            <router-link :to="{name:'car'}">
                <div><img src="./static/img/carhui.png" alt=""></div>
                <p>购物车</p>
            </router-link>
            <router-link :to="{name:'mine'}">
                <div><img src="./static/img/wodehui.png" alt=""></div>
                <p>我的</p>
            </router-link>
        </div>
    </div>
</template>

<script>
    let slideWidth = 0;
    let navWidth = 0;
    let tspeed = 1000;
    import Vue from 'vue'
    import MyScroll from '../common/myscroll/myscroll'
    import loading from '../common/loading/loading'
    import MyHeader from '../common/header/myheader'
    export default {
        name: "index",
        data() {
            return {
                navSwiperOption: {
                    slidesPerView: 5,//一屏显示的内容数量
                    freeMode : true,//根据惯性滑动不止一格且不会贴合
                    on: {
                        init() {
                            slideWidth = Number.parseInt(this.slides.eq(0).css('width'));
                            this.$wrapperEl.find('.bar').css('width',slideWidth+'px');
                            for (let i = 0; i < this.slides.length; i++) {
                                navWidth += Number.parseInt(this.slides.eq(i).css('width'));
                            }
                        }
                    },
                },
                listSwiperOption: {
                    resistanceRatio : 0,//边缘抵抗力的大小比例,值越小越难将slide拖离边缘。
                },
                type: 0,
                querylevel1cate: [],
                querylevel2cate: [],
                goods:{
                    // 2:[],
                    // 53:[],
                },
                pages: {
                    // 2:{page: 0,total: 0},
                    // 53:{page: 0,total: 0},
                },
                ispullingup: {},
                isShowLoading: true,
            }
        },
        computed: {
            navSwiper() {
                return this.$refs.navSwiper.swiper;
            },
            listSwiper() {
                return this.$refs.listSwiper.swiper;
            },
        },
        methods: {
            //swiper初始化
            _tapNavSwiper() {
               let that = this;
               this.navSwiper.on('tap',function () {
                   let clickindex = this.clickedIndex;
                   that.listSwiper.slideTo(clickindex);
                   this.slides.find('span').css('color','#333');
                   this.slides.eq(clickindex).find('span').css('color','#ff4891');
               });
               this.listSwiper.transitionStart = () => {
                   let navSwiper = this.navSwiper;
                   let activeIndex = this.listSwiper.activeIndex;
                   let bar = navSwiper.$el.find('.bar');

                   this.type = this.querylevel1cate[activeIndex].cid;

                   bar.transition(tspeed);
                   bar.transform(`translateX(${activeIndex*slideWidth}px)`);
                   navSwiper.slides.eq(activeIndex).find('span').transition(tspeed);
                   navSwiper.slides.find('span').css('color','#333');
                   navSwiper.slides.eq(activeIndex).find('span').css('color','#ff4891');

                   let barPosition = activeIndex * slideWidth;
                   let clientWidth = window.innerWidth;
                   this.navSwiper.setTransition(tspeed);
                   //大于第一屏的一半时
                   if (barPosition < (clientWidth - slideWidth)/2) {
                       navSwiper.setTranslate(0);
                   }
                   //最后一屏的最后一半
                   else if (barPosition >= navWidth - clientWidth) {
                       navSwiper.setTranslate(clientWidth - navWidth);
                   }
                   //中间过程
                   else {
                       navSwiper.setTranslate((clientWidth-slideWidth)/2-barPosition);
                   }
               }
           },
           //获取一级列表
            getlevel1cate(callback) {
                this.axios.get('/admin/cate/querylevelcate').then(res => {
                    this.querylevel1cate = res.data;
                    this.type = res.data[0].cid;
                    this.querylevel1cate.forEach((obj) => {
                        // this.goods[obj.cid] = [];
                        Vue.set(this.goods,obj.cid,[]);
                        Vue.set(this.ispullingup,obj.cid,true);
                        Vue.set(this.pages,obj.cid,{page:0,total:0});
                        // this.pages[obj.cid] = {
                        //     page:0,
                        //     total:0
                        // }
                    });
                    callback();
                })
            },
            //获取商品
            getGoods() {
                let page = this.pages[this.type].page;
                let total = this.pages[this.type].total;
                if (page > total) {

                }
                else {
                    let currentpage = ++this.pages[this.type].page;
                    this.axios.get(`/goods/querygoods/${this.type}/${currentpage}`).then(res => {
                        if (res.data.code === 0) {
                            this.goods[this.type].push(...res.data.data);
                            this.pages[this.type].total = res.data.total;
                            this.isShowLoading = false;
                        }
                        else if (res.data.code === 1) {
                            this.isPullingup[this.type] = false;
                        }
                    })
                }
            }
        },
        watch: {
            type() {
                if (!this.pages[this.type].page) {
                    this.isShowLoading = true;
                    this.getGoods();
                }
            }
        },
        components: {
            MyScroll,
            loading,
            MyHeader
        },
        created() {
            this.getlevel1cate(function () {
                setTimeout(() => {
                    //检测到文档页面更新后初始化
                    this.$nextTick(() => {
                        this._tapNavSwiper();
                        this.getGoods();
                    });
                })
            }.bind(this));
        },
    }
</script>

<style scoped>
    @import url('./static/css/index.css');
    @import url('//at.alicdn.com/t/font_959737_kgzbpgzr60l.css');
</style>
<style>
    * {
        box-sizing: border-box;
        font-size: 0.24rem;
    }
</style>
