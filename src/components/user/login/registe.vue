<template>
    <div>
        <div>
            <div class="header">
                <router-link :to="{name:'index'}" class="iconfont icon-fanhui"></router-link>
                <span>注册</span>
                <div></div>
            </div>
        </div>

        <div class="login">
            <form id="myform" ref="myform"></form>
            <input type="text" placeholder="请输入手机号" class="user" form="myform" v-model="phone" required>
            <input type="password" placeholder="请输入密码" class="user" form="myform" v-model="password" required>
            <div class="form-protocol">
                <input type="checkbox" class="check" v-model="isCheck">
                <span>我已认真阅读、理解并同意</span>
                <span class="importanttext">《每日优鲜用户协议》</span>
                <span>及</span>
                <span class="importanttext">《每日优鲜隐私策略》</span>
            </div>
            <button @click="handleform" :class="{'hot':flag}">注册</button>
            <router-link :to="{name:'login'}" class="registe">已注册？请登录</router-link>
            <div class="text">为方便您及时查询订单信息，需要验证您的手机号来登录</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "registe",
        data() {
            return {
                phone: '',
                password: '',
                isCheck: false,
            }
        },
        computed: {
            flag() {
                if ((this.phone && /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.phone)) && (this.password && /^([a-z])\d{5,7}$/.test(this.password)) && this.isCheck) {
                    return true
                }
                return false
            },
        },
        methods: {
            //提交表单
            handleform() {
                if (this.flag) {
                    this.axios.post('/login/registe',{phone:this.phone,password:this.password}).then(res => {
                        if (res.data.code === 0) {
                            this.$router.push('/login');
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

    @import url(./static/css/registe.css);
    @import url(//at.alicdn.com/t/font_959450_nzom9m15698.css);

</style>
