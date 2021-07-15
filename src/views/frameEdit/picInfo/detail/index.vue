<style lang="less">
@import "./index.less";
</style>
<script>
import wangEditor from "wangeditor";
import axios from "axios";
export default {
    name: "detail",
    template: require("./index.html"),
    data() {
        return {
            dialogFormVisible: false,
            list: [],
            form: {
                title: "",
                wpno: "",
                thumbnail: [],
                picCount: "",
                videoCount: "",
                price: "",
                type: [],
                memory: "",
                remarks: "",
                detailcontent: ""
            },
            typeForm: {
                name: "",
                thumbnail: ""
            },
            editor: null,
            VUE_APP_BASE_URL: ""
        };
    },
    mounted() {
        this.VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL;
        this.$api.queryPicTypeList().then(res => {
            this.list = res;
            if (this.$route.query.id) {
                this.$api
                    .queryPicDetailById({ id: this.$route.query.id })
                    .then(res => {
                        this.editor.txt.html(res.detailcontent);
                        this.form = {
                            ...res,
                            type: res.type.split("||").map(item => {
                                let t = this.list.filter(t => {
                                    return t.id == item;
                                })[0];
                                return t.name;
                            }),
                            thumbnail:
                                (res.thumbnail && res.thumbnail.split(",")) ||
                                []
                        };
                    });
                // this.list.filter((t)=>{return t.name == item})[0]
            }
        });
        const editor = new wangEditor(`#demo1`);
        let config = editor.customConfig ? editor.customConfig : editor.config;
        config.showLinkImg = false;
        config.onchange = newHtml => {
            this.editorData = newHtml;
        };
        // 本地图片上传：重写方法
        editor.config.customUploadImg = function(files, insertImgFn) {
            // 逐个上传
            files.forEach(file => {
                let formDate = new FormData();
                formDate.append("file", file, "1.jpg");
                axios
                    .post(
                        process.env.VUE_APP_BASE_URL + "/v1/picture/fileUpload",
                        formDate,
                        { headers: { "Content-Type": "multipart/form-data" } }
                    )
                    .then(res => {
                        console.log(res);
                        insertImgFn(
                            process.env.VUE_APP_BASE_URL + res.data.data
                        );
                    });
            });
        };
        // 创建编辑器
        editor.create();
        this.editor = editor;
    },
    methods: {
        beforeDestroy() {
            // 调用销毁 API 对当前编辑器实例进行销毁
            this.editor.destroy();
            this.editor = null;
        },
        onSubmit() {
            this.form.detailcontent = this.editor.txt.html();
            let type = this.form.type
                .map(item => {
                    let p = this.list.filter(t => {
                        return t.name == item;
                    })[0];
                    return p.id;
                })
                .join("||");
            this.$api
                .saveInfo({
                    ...this.form,
                    type,
                    thumbnail: this.form.thumbnail.join(",")
                })
                .then(res => {
                    this.$message({
                        message: "提交成功",
                        type: "success"
                    });
                    console.log(res);
                    history.back();
                });
            // this.form = {title: '', thumbnail: [], picCount: '', videoCount: '',
            //     price:'', type: [], memory: '', remarks: '',  detailcontent: ''}
        },
        subType() {
            this.$api.saveType({ ...this.typeForm }).then(() => {
                this.typeForm = { name: "", thumbnail: "" };
                this.dialogFormVisible = false;
                this.$api.queryPicTypeList().then(ress => {
                    this.list = ress;
                });
            });
        },
        uploadSuccess(response, file, fileList) {
            this.$message({
                message: "提交成功",
                type: "success"
            });
            console.log(response, file, fileList);
            this.form.thumbnail.push(response.data);
        },
        uploadTypeSuccess(response, file, fileList) {
            this.$message({
                message: "提交成功",
                type: "success"
            });
            console.log(response, file, fileList);
            this.typeForm.thumbnail = response.data;
        },
        uploadError(err, file, fileList) {
            this.$message.error("提交失败");
            console.log(err, file, fileList);
        },
        editType() {
            this.dialogFormVisible = true;
        }
    }
};
</script>
