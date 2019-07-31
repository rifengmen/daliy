<template>
    <div>
        <div ref="toolbar" class=".toolbar"></div>
        <div ref="text" class="text"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    export default {
        name: "richtexteditor",
        data() {
            return {
                info: '',
            }
        },
        props: {
            'value': {
                type: String,
            },
        },
        methods: {
            initEditor() {
                this.editor = new E(this.$refs.toolbar, this.$refs.text);
                this.editor.customConfig.onchange = (html) => {
                    this.$emit('textchange',html);
                };
                this.editor.customConfig.uploadImgServer = '/uploadeditor';
                this.editor.customConfig.uploadFileName = 'file';
                this.editor.customConfig.uploadImgHooks = {
                    before: function (xhr, editor, files) {
                    },
                    success: function (xhr, editor, result) {
                    },
                    fail: function (xhr, editor, result) {
                    },
                    error: function (xhr, editor) {
                    },
                    timeout: function (xhr, editor) {
                    },
                    customInsert: function (insertImg, result, editor) {
                        let url = result.data[0];
                        insertImg(url)
                    }
                };
                this.editor.create();
                console.log(this.value);
                // this.editor.txt.html(this.value);
            },
        },
        mounted() {
            this.initEditor();
        },
    }
</script>

<style scoped>
    .toolbar,
    .text {
        border: 1px solid #ccc;
    }
    .text {
        height: 800px;
        overflow-y: auto;
    }
</style>
