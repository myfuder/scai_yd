import Vue from "vue";
import VueRouter from "vue-router";
// 路由数据
import routes from "./routes";
Vue.use(VueRouter);
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error);
};
const router = new VueRouter({
    mode: "history",
    routes
});
/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
    // if(to && to.meta && to.meta.hasOwnProperty('clickFlag')){
    //     to.meta.clickFlag = true;
    // }
    let user = from.query.user || to.query.user || "zz";
    window, scrollTo(0, 0);
    if (to.path.indexOf("edit") > 0 || to.query.user) {
        next();
    } else {
        next({ ...to, query: { ...to.query, user } });
    }
});
export default router;
