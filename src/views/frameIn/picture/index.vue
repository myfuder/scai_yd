<style lang="less">
@import "index.less";
</style>
<script>
export default {
    name: "picture",
    template: require("./index.html"),
    data() {
        return {
            currText: "",
            input2: "",
            list: [],
            value: 5,
            pageNum: 1,
            pageSize: 12,
            total: 1
        };
    },
    mounted() {
        let url = window.location.href;
        this.currText = this.getLastParams(url).split("?")[0];
        this.input2 = this.$route.query.key;
        if ("search" == this.currText) {
            this.search(this.pageNum);
        } else {
            this.queryPicListByTypeName(this.pageNum);
        }
        document.title = this.currText;
    },
    methods: {
        queryPicListByTypeName(pageNum) {
            this.$api
                .queryPicListByTypeName({
                    typeName: this.currText,
                    pageNum: pageNum,
                    pageSize: this.pageSize
                })
                .then(res => {
                    this.list = res.list.map(item => {
                        return {
                            ...item,
                            thumbnail: (
                                (item.thumbnail && item.thumbnail.split(",")) ||
                                []
                            ).map(
                                item => process.env.VUE_APP_BASE_URL + item
                            )[0]
                        };
                    });
                    this.total = res.total;
                });
        },
        getLastParams(url) {
            let index = url.lastIndexOf("/");
            return decodeURIComponent(url.substring(index + 1, url.length));
        },
        handleCurrentChange(val) {
            if ("search" == this.currText) {
                this.search(val);
            } else {
                this.queryPicListByTypeName(val);
            }
        },
        bindInput() {
            this.$router.replace({
                path: "/picture/list/search",
                query: { key: this.input2 }
            });
        },
        search(pageNum) {
            this.$api
                .search({
                    key: this.input2,
                    pageNum: pageNum,
                    pageSize: this.pageSize
                })
                .then(res => {
                    this.list = res.list.map(item => {
                        return {
                            ...item,
                            thumbnail: (
                                (item.thumbnail && item.thumbnail.split(",")) ||
                                []
                            ).map(
                                item => process.env.VUE_APP_BASE_URL + item
                            )[0]
                        };
                    });
                    this.total = res.total;
                });
        }
    }
};
</script>
