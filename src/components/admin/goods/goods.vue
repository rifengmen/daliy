<template>
    <el-tabs v-model="activename">
        <el-tab-pane label="查看商品" name="first">
            <el-form :inline="true" :model="goodsformInline" class="demo-form-inline">
                <el-form-item label="GID">
                    <el-input v-model="goodsformInline.gid" placeholder="gid"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="goodsformInline.gname" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item label="所属二级分类">
                    <el-input v-model="goodsformInline.cid2" placeholder="所属二级分类"></el-input>
                </el-form-item>
                <el-form-item label="所属一级分类">
                    <el-input v-model="goodsformInline.cid1" placeholder="所属一级分类"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="goodsArr" style="width: 100%" v-if="goodsArr.length" v-loading="loading">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="所属一级分类">
                                <span>{{ props.row.cnames }}</span>
                            </el-form-item>
                            <el-form-item label="所属二级分类">
                                <span>{{ props.row.cname }}</span>
                            </el-form-item>
                            <el-form-item label="商品名称">
                                <span>{{ props.row.gname }}</span>
                            </el-form-item>
                            <el-form-item label="商品描述">
                                <span>{{ props.row.gdes }}</span>
                            </el-form-item>
                            <el-form-item label="商品现价">
                                <span>{{ props.row.gdiscount }}</span>
                            </el-form-item>
                            <el-form-item label="商品原价">
                                <span>{{ props.row.gprice }}</span>
                            </el-form-item>
                            <el-form-item label="商品缩略图">
                                <img :src="props.row.thumb" :alt="props.row.gname">
                            </el-form-item>
                            <el-form-item label="商品标签">
                                <span>{{ props.row.gtag }}</span>
                            </el-form-item>
                            <el-form-item label="轮播图">
                                <el-carousel indicator-position="outside">
                                    <el-carousel-item v-for="(item,index) in props.row.gbanner.split(',')" :key="index">
                                        <img :src="item" style="width: 100%">
                                    </el-carousel-item>
                                </el-carousel>
                            </el-form-item>
                            <el-form-item label="商品内容">
                                <span>{{ props.row.gcontent }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="GID" prop="gid">
                </el-table-column>
                <el-table-column label="商品名称" prop="gname">
                </el-table-column>
                <el-table-column label="商品描述" prop="gdes">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <router-link :to="{name:'updategoods',query:{gid:scope.row.gid,cid1:scope.row.cid1}}" tag="el-button" class="el-button el-button--text el-button--small">修改</router-link>
                        <el-button type="text" size="small" @click="deletegoods(scope.row.gid)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="sizeChange"
                    @current-change="currentChange"
                    :current-page="currentpage"
                    :page-sizes="[10,25,50,100]"
                    :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total='total'
                    background>
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="添加商品" name="second">
            <el-form :model="goodsform" v-loading="loading" v-if="querylevel1cate.length" ref="goodsform" :rules="rules">
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
                    <el-button type="primary" plain round @click="insertgoods('goodsform')">Submit</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import RichTexteditor from '../common/richtexteditor/richtexteditor'
    export default {
        name: "goods",
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
                goodsArr: [],
                goodsformInline: {
                    gid: '',
                    gname: '',
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
                loading: true,
                activename: 'first',
                dialogVisible: false,
                dialogImageUrl: '',
                bannerArr: [],
                currentpage: 1,
                total: 0,
                size: 10,
            }
        },
        methods: {
            //获取一级列表
            getlevel1cate() {
                this.loading = true;
                this.axios.get('/admin/cate/querylevelcate').then(res => {
                    this.loading= false;
                    this.querylevel1cate = res.data;
                })
            },
            //获取去二级列表
            getlevel2cate(val) {
                this.loading = true;
                this.axios.get('/admin/cate/querylevel2cate?cid='+val).then(res => {
                    this.loading= false;
                    this.goodsform.cid2 = '';
                    this.querylevel2cate = res.data;
                })
            },
            //插入商品数据
            insertgoods(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.axios.post('/admin/goods/insertgoods',this.goodsform).then(res => {
                            this.loading = false;
                            if (res.data.code === 0) {
                                this.$message.success(res.data.msg);
                                this.activename = 'first';
                            }
                            else if (res.data.code === 1) {
                                this.$message.error(res.data.msg)
                            }
                            else if (res.data.code === 2) {
                                this.$message.error(res.data.msg)
                            }
                        })
                    }
                });
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
            //富文本编辑器
            setEditor(value) {
                this.goodsform.gcontent = value;
            },
            //查看商品详情
            getTables() {
                this.loading = true;
                let obj = Object.assign({},this.goodsformInline,{currentpage:this.currentpage},{size:this.size});
                this.axios.get('/admin/goods/querygoods',{params:obj}).then(res => {
                    this.loading = false;
                    this.total = res.data.total;
                    this.goodsArr = res.data.data;
                })
            },
            //页码改变时
            currentChange(page) {
                this.currentpage = page;
                this.getTables();
            },
            //页数改变时
            sizeChange(size) {
                this.size = size;
                this.currentpage = 1;
                this.getTables();
            },
            //搜索商品
            search() {
                this.currentpage = 1;
                this.getTables();
            },
            //删除商品
            deletegoods(gid) {
                this.loading = true;
                this.axios.get('/admin/goods/deletegoods',{params:{gid:gid}}).then(res => {
                    this.loading = false;
                    if (res.data.code === 0) {
                        this.axios.get('/removeimg',{params:{url:res.data.thumb}}).then();
                        res.data.banner.forEach(v => {
                            this.axios.get('/removeimg',{params:{url:v}}).then();
                        });
                        this.goodsArr = this.goodsArr.filter(ele => ele.gid != gid);
                        --this.total;
                        this.$message.success(res.data.msg);
                    }
                    else if (res.data.code === 1) {
                        this.$message.error(res.data.msg);
                    }
                })
            },
        },
        watch: {
            bannerArr(nval) {
                this.goodsform.gbanner = nval.join();
            },
            activename(nval) {
                if (nval === 'first') {
                    this.getTables();
                }
                else if (nval === 'second') {
                    this.getlevel1cate();
                }
            }
        },
        components: {
            RichTexteditor
        },
        created() {
            this.getTables();
        },
    }
</script>

<style scoped>

    .demo-table-expand {
        font-size: 0;
        display: flex;
        flex-flow: column;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }

</style>
