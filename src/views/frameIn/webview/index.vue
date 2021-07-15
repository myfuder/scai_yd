<style lang="less">
@import "./index.less";
</style>
<script>
export default {
    name: "webview",
    template: require("./index.html"),
    data() {
        return {
            content: ""
        };
    },
    mounted() {
        let key = this.$route.query.key;
        this.$api.getDownloadDoc({ docName: key }).then(res => {
            // str.replace(new RegExp(oldString,"gm"),newString)
            this.content = res.content.replace(
                new RegExp(res.path, "gm"),
                process.env.VUE_APP_BASE_URL
            );
        });
    }
};
</script>
