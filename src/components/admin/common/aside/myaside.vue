<template>
  <el-menu class="el-menu-vertical-demo" router>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>基本信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/webinfo">网站信息
          <!--<router-link :to="{name:'webinfo'}">网站信息</router-link>-->
        </el-menu-item>
        <el-menu-item index="/userinfo">修改信息
          <!--<router-link :to="{name:'userinfo'}">修改信息</router-link>-->
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>内容管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/cate">分类管理
          <!--<router-link :to="{name:'cate'}">分类管理</router-link>-->
        </el-menu-item>
        <el-menu-item index="/goods">商品管理
          <!--<router-link :to="{name:'goods'}">商品管理</router-link>-->
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: 'myaside'
  }
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #333;
    width: 100%;
    height: 100%;
  }
  .router-link-exact-active {
    color: #409eff;
  }
</style>
