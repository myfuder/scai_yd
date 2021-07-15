<style lang="less">
@import "index.less";
</style>
<script>
import Swiper from "swiper";
export default {
    name: "detail",
    template: require("./index.html"),
    data() {
        return {
            content: '<p style="font-size:14px">详情测试</p>',
            currText: "",
            picInfo: {},
            wxpic: "",
            zfbpic: "",
            tuij_list: [],
            currentImg: ""
        };
    },
    mounted() {
        this.$nextTick(() => {
            let user = this.$route.query.user;
            this.wxpic =
                process.env.VUE_APP_BASE_URL + "/upload/" + user + "/wx.jpg";
            this.zfbpic =
                process.env.VUE_APP_BASE_URL + "/upload/" + user + "/zfb.jpg";
        });
        let url = window.location.href;
        let index = url.lastIndexOf("/");
        let id = this.getLastParams(url);
        this.currText = this.getLastParams(url.substring(0, index));
        this.$api.queryPicDetailById({ id: id }).then(res => {
            this.picInfo = {
                ...res,
                thumbnail: (
                    (res.thumbnail && res.thumbnail.split(",")) ||
                    []
                ).map(item => process.env.VUE_APP_BASE_URL + item)
            };
            console.log(this.picInfo);
            document.title = this.picInfo.title;
            this.currentImg =
                this.picInfo.thumbnail && this.picInfo.thumbnail[0];
            this.$nextTick(function() {
                var swiper = new Swiper(".swiper-container");
            });
        });
        this.$api.queryPics({ pageNum: 1, pageSize: 4 }).then(res => {
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
        getLastParams(url) {
            let index = url.lastIndexOf("/");
            return decodeURIComponent(url.substring(index + 1, url.length));
        }
    }
};
</script>
