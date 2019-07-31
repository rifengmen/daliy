<template>
    <div class="category-footer">
        <div class="footer-main">
            <router-link :to="{name:'index'}">
                <img src="./static/img/01.png" alt="">
                <div class="listname">首页</div>
            </router-link>
            <router-link :to="{name:'category'}">
                <img src="./static/img/02.png" alt="">
                <div class="listname">分类</div>
            </router-link>
            <a>
                <img src="./static/img/03.png" alt="">
                <div class="listname">发现</div>
            </a>
            <router-link :to="{name:'car'}">
                <img src="./static/img/04.png" alt="">
                <div class="listname">购物车</div>
            </router-link>
            <router-link :to="{name:'mine'}">
                <img src="./static/img/05.png" alt="">
                <div class="listname">我的</div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-footer"
    }
</script>

<style scoped>


    .category-footer{
        height: 1rem;
        background: url("./static/img/footer.png") 0 0 / cover no-repeat transparent;
        position: fixed;
        left: 0;
        bottom: 0;
    }
    .footer-main{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
    }
    .footer-main>a{
        position: relative;
        width: 1.5rem;
        height: 100%;
        text-align: center;
    }
    .footer-main>a>img{
        position: absolute;
        top: -0.2rem;
        left: 0.35rem;
        width: 0.8rem;
        height: 0.8rem;
    }
    .listname{
        position: absolute;
        bottom: 0.1rem;
        left: 0;
        width: 100%;
        font-size: 0.24rem;
        color: #fff;
    }

    div {
        text-align: center;
    }

    .router-link-exact-active > div.listname {
        color: rgb(251, 228, 0);
    }

</style>
