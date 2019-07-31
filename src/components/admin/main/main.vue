<template>
  <div class="mains">
    <el-container>
      <el-header>
        <myheader></myheader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <myaside></myaside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import myheader from '../common/header/myheader'
  import myaside from '../common/aside/myaside'
  export default {
    name: 'mains',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        activeName2: 'first',
        tableData4: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },
    components: {
      myheader,
      myaside
    },
  }
</script>


<style scoped>

</style>
<style>
    .el-header {
        /*background: url(./img/bg.jpg) no-repeat;*/
        /*color: #333;*/
        text-align: center;
        line-height: 60px;
    }
    .left{
        float: left;
    }
    .right{
        float: right;
    }
    span:first-child{
        margin-right: 10px;
    }
    .el-aside {
        /*background-color: #D3DCE6;*/
        /*color: #333;*/
        text-align: center;
        /*line-height: 200px;*/
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        /*color: #333;*/
        text-align: center;
        /*line-height: 160px;*/
    }

    body > .el-container {
        margin-bottom: 40px;
    }


</style>
