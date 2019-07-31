<template>
    <div>
        <h3>栏目内容修改</h3>
        <el-form :model="goodsform" v-loading="loading" v-if="querylevel2cate.length" ref="goodsform" :rules="rules">
            <el-form-item label="一级栏目" v-loading="loading" prop="cid1">
                <el-select v-model="goodsform.cid1" placeholder="请选择一级栏目" @change="getlevel2cate">
                    <el-option :label="item.cname" :value="item.cid" v-for="(item,index) in querylevel1cate" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级栏目" v-loading="loading" prop="cid2">
                <el-select v-model="goodsform.cid2" placeholder="请选择二级栏目">
                    <el-option :label="item.cname" :value="item.cid" v-for="(item,index) in querylevel2cate" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称" prop="gname" placeholder="商品名称">
                <el-input v-model="goodsform.gname"></el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="gdes" placeholder="商品描述">
                <el-input v-model="goodsform.gdes"></el-input>
            </el-form-item>
            <!--上传缩略图-->
            <el-form-item label="商品缩略图" prop="thumb">
                <el-input v-model="goodsform.thumb" type="hidden"></el-input>
            </el-form-item>
            <el-form-item>
                <img :src="goodsform.thumb" alt="" width="146" v-if="goodsform.thumb">
                <el-upload
                        action="/uploadimg"
                        list-type="picture-card"
                        :limit="1"
                        :before-upload="beforeThumbAvatarUpload"
                        :on-success="handleThumbSuccess"
                        :on-preview="handleThumbPictureCardPreview"
                        :on-remove="handleThumbRemove">
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif/webp文件，只能上传一张，且不超过500KB</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品标签" prop="gtag" placeholder="商品标签,用逗号隔开">
                <el-input v-model="goodsform.gtag"></el-input>
            </el-form-item>
            <el-form-item label="商品现价" prop="gdiscount" placeholder="商品现价">
                <el-input v-model.number="goodsform.gdiscount"></el-input>
            </el-form-item>
            <el-form-item label="商品原价" prop="gprice" placeholder="商品原价">
                <el-input v-model.number="goodsform.gprice"></el-input>
            </el-form-item>
            <!--上传轮播图-->
            <el-form-item label="商品轮播图" prop="gbanner">
                <el-input v-model="goodsform.gbanner" type="hidden"></el-input>
            </el-form-item>
            <el-form-item>
                <img :src="item" :key="index" v-for="(item,index) in bannerArr" v-if="bannerArr.length" alt="" width="146">
                <el-upload
                        action="/uploadimg"
                        list-type="picture-card"
                        :limit="5"
                        multiple
                        :before-upload="beforeBannerAvatarUpload"
                        :on-success="handleBannerSuccess"
                        :on-preview="handleBannerPictureCardPreview"
                        :on-remove="handleBannerRemove">
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif/webp文件，只能上传不超过5张，且不超过2MB</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品配送信息" prop="gfee" placeholder="商品配送信息">
                <el-input v-model="goodsform.gfee"></el-input>
            </el-form-item>
            <el-form-item label="商品内容" prop="gcontent" placeholder="商品内容">
                <el-form-item>
                    <rich-texteditor @textchange="setEditor" v-model="goodsform.gcontent"></rich-texteditor>
                </el-form-item>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain round @click="updateGoods">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import RichTexteditor from '../common/richtexteditor/richtexteditor'
    export default {
        name: "updategoods",
        data() {
            return {
                goodsform: {
                    gname: '',
                    gdes: '',
                    thumb: '',
                    gtag: '',
                    gdiscount: '',
                    gprice: '',
                    gbanner: '',
                    gfee: '',
                    gcontent: '',
                    cid1: '',
                    cid2: '',
                },
                rules: {
                    cid1: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    cid2: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    gname: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    gdes: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    thumb: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    gtag: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    gdiscount: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                        {type: 'number', message: '请填写数字', trigger: 'blur'}
                    ],
                    gprice: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                        {type: 'number', message: '请填写数字', trigger: 'blur'}
                    ],
                    gbanner: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    gfee: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    gcontent: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                },
                querylevel1cate: [],
                querylevel2cate: [],
                bannerArr: [],
                loading: true,
                dialogVisible: false,
                dialogImageUrl: '',
                gid: 0,
                cid1: 0,
            }
        },
        methods:{
            //获取一级列表
            getlevel1cate() {
                this.loading = true;
                this.axios.get('/admin/cate/querylevelcate').then(res => {
                    this.loading= false;
                    this.querylevel1cate = res.data;
                })
            },
            //获取二级列表
            getlevel2cate(val=this.cid1) {
                this.loading = true;
                this.axios.get('/admin/cate/querylevel2cate?cid='+val).then(res => {
                    this.loading= false;
                    this.goodsform.cid2 = '';
                    this.querylevel2cate = res.data;
                })
            },
            //获取当前数据
            getCurrentCate() {
                this.axios.get('/admin/goods/querycurrentgoods/'+this.gid).then(res => {
                    this.goodsform = res.data;
                    this.bannerArr = res.data.gbanner.split(',');
                })
            },
            //缩略图上传成功执行的函数
            handleThumbSuccess(res,file,fileList) {
                this.goodsform.thumb = res;
            },
            //删除缩略图预览图
            handleThumbRemove(file, fileList) {
                this.axios.get('/removeimg?url='+this.goodsform.thumb).then(res => {
                    if (res.data.code === 0) {
                        this.goodsform.thumb = '';
                        this.$message.success(res.data.msg);
                    }
                })
            },
            //放大缩略图预览
            handleThumbPictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //缩略图验证上传图片大小、格式
            beforeThumbAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGIF = file.type === 'image/gif';
                const isWEBP = file.type === 'image/webp';
                const isLt2M = file.size / 1024  < 500;
                if (!(isJPG || isPNG || isGIF  || isWEBP)) {
                    this.$message.error('上传图片只能是指定格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 500KB!');
                }
                return (isJPG || isPNG || isGIF  || isWEBP) && isLt2M ;
            },
            //轮播图上传成功执行的函数
            handleBannerSuccess(res,file,fileList) {
                this.bannerArr.push(res);
            },
            //删除轮播图预览图
            handleBannerRemove(file, fileList) {
                this.axios.get('/removeimg?url='+file.response).then(res => {
                    if (res.data.code === 0) {
                        this.bannerArr = this.bannerArr.filter(ele => ele != file.response);
                        this.$message.success(res.data.msg);
                    }
                })
            },
            //放大轮播图预览
            handleBannerPictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //轮播图验证上传图片大小、格式
            beforeBannerAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGIF = file.type === 'image/gif';
                const isWEBP = file.type === 'image/webp';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!(isJPG || isPNG || isGIF  || isWEBP)) {
                    this.$message.error('上传图片只能是指定格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return (isJPG || isPNG || isGIF  || isWEBP) && isLt2M ;
            },
            //设置富文本编辑器的方法
            setEditor(value) {
                this.goodsform.gcontent = value;
            },
            //修改数据
            updateGoods() {
                let obj = Object.assign({},this.goodsform,{gid:this.gid});
                this.axios.post('/admin/goods/updatecurrentgoods',obj).then(res => {
                    if (res.data.code === 0) {
                        this.$message.success(res.data.msg);
                        this.$router.push('/goods');
                    }
                    else if (res.data.code === 1) {
                        this.$message.error(res.data.msg)
                    }
                })
            },
        },
        created() {
            this.gid = this.$route.query.gid;
            this.cid1 = this.$route.query.cid1;
            this.getlevel1cate();
            this.getlevel2cate();
            this.getCurrentCate();
        },
        components: {
            RichTexteditor
        },
    }
</script>

<style scoped>

    h3 {
        font-size: 26px;
    }

</style>
