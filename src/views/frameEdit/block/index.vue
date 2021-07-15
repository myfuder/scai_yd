<style lang="less">
@import "./index.less";
</style>
<script>
export default {
    name: "block",
    template: require("./index.html"),
    data() {
        return {
            active_li: ""
        };
    },
    mounted() {
        console.log(this.$route.path);
        this.active_li = this.$route.path.split("/")[2];
    }
};
</script>
