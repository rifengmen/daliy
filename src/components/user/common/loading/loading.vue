<template>

    <div class="loading">
        <img src="../../index/static/img/loading.gif" alt="">
    </div>

</template>

<script>
    export default {
        name: "loading"
    }
</script>

<style scoped>

    .loading {
        position: fixed;
        left: 0;
        top: 2rem;
        z-index: 999;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
    }

    img {
        width: 2rem;
    }

</style>
