<template>
    <div>
        <div class="successful" v-if="discount">
            <div class="bgc"></div>
            <div class="xiaofei">
                <span class="name1">您本次完成消费</span>
                <span>￥{{ discount }}</span>
                <span>谢谢你的消费，期待下次见面哦</span>
            </div>
            <div class="kong">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="correct">
                <img src="./static/img/correct.png" alt="" />
            </div>
        </div>
        <div class="btn">
            <ul>
                <li><router-link :to="{name:'index'}">返回首页</router-link></li>
                <li><router-link :to="{name:'order'}">查看订单</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "success",
        data() {
            return {
                discount: 0,
            }
        },
        created() {
            this.discount = this.$route.query.discount
        }
    }
</script>

<style scoped>
@import "./static/css/success.css";
@import "//at.alicdn.com/t/font_802633_jipm22lcmlh.css";
</style>
