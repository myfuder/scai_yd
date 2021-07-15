<style lang="less">
@import "index.less";
</style>
<script>
export default {
    name: "home",
    template: require("./index.html"),
    data() {
        return {
            imgs: [
                "https://img5.51tietu.net/pic/2019-081822/5wip12n5hvs5wip12n5hvs.jpg",
                "https://img5.51tietu.net/pic/2019-081822/y3nkt2550hgy3nkt2550hg.jpg",
                "https://img5.51tietu.net/pic/2019-081822/1wofirk4ris1wofirk4ris.jpg"
            ],
            input2: "",
            menus: [],
            tuij_list: [],
            route: ""
        };
    },
    mounted() {
        this.$api.queryPicTypeList().then(res => {
            this.menus = res.map(item => {
                return {
                    ...item,
                    thumbnail: process.env.VUE_APP_BASE_URL + item.thumbnail
                };
            });
        });
        this.$api.queryPics({ pageNum: 1, pageSize: 12 }).then(res => {
            this.tuij_list = res.list.map(item => {
                return {
                    ...item,
                    thumbnail: (
                        (item.thumbnail && item.thumbnail.split(",")) ||
                        []
                    ).map(item => process.env.VUE_APP_BASE_URL + item)[0]
                };
            });
            console.log(this.tuij_list);
        });
    },
    methods: {
        search(key) {
            this.$router.push({
                path: "/picture/list/search",
                query: { key: (typeof key == "string" && key) || this.input2 }
            });
        }
    }
};
</script>
