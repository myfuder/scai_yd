<style lang="less">
@import "./index.less";
</style>
<script>
export default {
    name: "block",
    template: require("./index.html"),
    data() {
        return {};
    },
    methods: {
        intent(key) {
            this.$router.push({
                path: "/help",
                query: { key }
            });
        }
    }
};
</script>
