<template>
    <div class="wrapper" ref="myscroll">
        <div>
            <ul class="shop-list" v-show="data.length">
                <li v-for="item in data" :key="data.gid">
                    <router-link :to="{name:'goodsinfo',query:{gid:item.gid,cid1:item.cid1}}">
                        <img :src="item.thumb" :alt="item.gname">
                    </router-link>
                    <div class="list-content">
                        <div class="item-title">
                            <p class="sub-title"> {{ item.gname }} </p>
                            <p class="mess-title"> {{ item.gdes }} </p>
                            <p class="item-txt">
                                <span v-for="tag in item.gtag.split('，')"> {{ tag }} </span>
                            </p>
                        </div>
                        <div class="price-info">
                            <div class="price">
                                <span class="now-price">¥{{ item.gdiscount }}</span>
                                <del class="bef-price">¥{{ item.gprice }}</del>
                            </div>
                            <cart :goods="item"></cart>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="loading" v-if="loading">
                loading
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import cart from '../cart/cart'
    export default {
        name: "myscroll",
        props: {
            data: {
                type:Array,
                // require: true,
                default: function () {
                    return [];
                }
            },
            isPullingup: {
                type: Boolean,
            },
        },
        data() {
            return {
                loading: false,
            }
        },
        methods: {
            // better-scroll初始化
            initScroll() {
               if (this.$refs.myscroll) {
                   this.scroll = new BScroll(this.$refs.myscroll,{
                       probeType: 3,
                       click: true,
                       pullUpLoad: {
                           threshold: 50
                       },
                   });
                   if (this.isPullingup) {
                       // this.scroll.on('scroll',(obj) => {
                       //     let y = obj.y;
                       // });
                       this.scroll.on('pullingUp',() => {
                           this.loading = true;
                           if (!this.isPullingup) {
                               this.scroll.finishPullUp();
                               this.loading = false;
                               return;
                           }
                           this.$emit('pullingup');
                           setTimeout(() => {
                               this.loading = false;
                           },2000)
                       })
                   }
               }
            },
        },
        created() {
            this.$nextTick(()=>{
                this.initScroll();
            })
        },
        watch: {
            data() {
                this.$nextTick(() => {
                    this.scroll.finishPullUp();
                    this.scroll.refresh();
                })
            }
        },
        components: {
            cart
        }
    }
</script>

<style scoped>
.loading {
    width: 100vw;
    line-height: 0.8rem;
    height: 0.8rem;
    font-size: 0.5rem;
    align-items: center;
}
</style>
