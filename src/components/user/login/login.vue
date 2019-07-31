<template>
    <div>
        <div>
            <div class="header">
                <router-link :to="{name:'index'}" class="iconfont icon-fanhui"></router-link>
                <span>登录</span>
                <div></div>
            </div>
        </div>

        <div class="login">
            <form id="myform"></form>
            <input type="text" v-model="phone" placeholder="请输入手机号" form="myform" required>
            <input type="password" v-model="password" placeholder="请输入密码" form="myform" required>
            <button @click="handleform" :class="{'hot':flag}">登录</button>
            <router-link :to="{name:'registe'}" class="registe">还没账号？请注册</router-link>
            <div class="text">为方便您及时查询订单信息，需要验证您的手机号来登录</div>
        </div>

        <div class="fast">
            <div>其他方式登录</div>
            <div>
                <a href="" class="iconfont icon-weixin"></a>
                <div>微信登录</div>
            </div>
            <div>
                未注册过的用户将直接为您创建优鲜账户
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                phone: '',
                password: '',
            }
        },
        computed: {
            flag() {
                if ((this.phone && /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.phone)) && (this.password && /^([a-z])\d{5,7}$/.test(this.password))) {
                    return true
                }
                return false
            },
        },
        methods: {
            //提交表单
            handleform() {
                if (this.flag) {
                    this.axios.post('/login',{phone:this.phone,password:this.password}).then(res => {
                        if (res.data.code === 0) {
                            sessionStorage.setItem('uid',res.data.uid);
                            let redirect = this.$route.query.redirect || '/';
                            this.$router.push(redirect);
                        }
                        else if (res.data.code === 1) {
                            console.log(res.data.msg);
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped>

    @import url(./static/css/login.css);
    @import url(//at.alicdn.com/t/font_959450_nzom9m15698.css);

</style>
