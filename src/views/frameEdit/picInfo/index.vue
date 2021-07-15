<style lang="less">
@import "./index.less";
</style>
<script>
export default {
    name: "picInfo",
    template: require("./index.html"),
    data() {
        return {
            tableData: [],
            input2: "",
            pageNum: 1,
            pageSize: 10,
            total: 1
        };
    },
    mounted() {
        this.queryPics("", 1);
    },
    methods: {
        intent(row) {
            if (row.id) {
                this.$router.push({
                    path: "/edit/picture/detail",
                    query: { id: row.id }
                });
            } else {
                this.$router.push({
                    path: "/edit/picture/detail"
                });
            }
        },
        queryPics(key, pageNum) {
            this.$api
                .search({ key, pageNum, pageSize: this.pageSize })
                .then(res => {
                    this.tableData = res.list.map(item => {
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
                    console.log(this.tableData);
                });
        },
        remove(row) {
            this.$api.deletePicById({ id: row.id }).then(res => {
                this.queryPics(this.input2, this.pageNum);
            });
        },
        handleCurrentChange(val) {
            this.queryPics(this.input2, val);
            this.pageNum = val;
        },
        bindInput() {
            this.queryPics(this.input2, 1);
        }
    }
};
</script>
