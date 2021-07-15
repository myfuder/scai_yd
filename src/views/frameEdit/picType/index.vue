<style lang="less">
@import "./index.less";
</style>
<script>
export default {
    name: "picType",
    template: require("./index.html"),
    data() {
        return {
            tableData: [],
            typeForm: {
                name: "",
                thumbnail: ""
            },
            VUE_APP_BASE_URL: "",
            list: [],
            dialogFormVisible: false
        };
    },
    mounted() {
        this.VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL;
        this.$api.queryPicTypeList().then(res => {
            this.tableData = res.map(item => {
                return {
                    ...item,
                    img: process.env.VUE_APP_BASE_URL + item.thumbnail
                };
            });
        });
    },
    methods: {
        onSubmit() {
            this.$api.saveType({ ...this.typeForm }).then(() => {
                this.typeForm = { name: "", thumbnail: "" };
                this.dialogFormVisible = false;
                this.$api.queryPicTypeList().then(ress => {
                    this.list = ress;
                });
            });
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

        edit(row) {
            this.typeForm = row;
            this.dialogFormVisible = true;
        },
        remove(row) {
            this.$api.deleteTypeById({ id: row.id }).then(() => {
                this.$api.queryPicTypeList().then(ress => {
                    this.list = ress;
                });
            });
        }
    }
};
</script>
