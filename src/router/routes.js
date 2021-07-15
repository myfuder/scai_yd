// const home = ()=>import("@v/home")
import home from "@v/frameIn/home";
import picture from "@v/frameIn/picture";
import detail from "@v/frameIn/detail";
import block from "@v/frameIn/block";
import help from "@v/frameIn/webview";

import picEdit from "@v/frameEdit/picInfo";
import picEditDetail from "@v/frameEdit/picInfo/detail";
import typeEdit from "@v/frameEdit/picType";
import banner from "@v/frameEdit/banner";
import blockEdit from "@v/frameEdit/block";

/**
 * 在主框架内显示
 */
const frameIn = [
    {
        path: "/",
        name: "block",
        redirect: "/home",
        component: block,
        children: [
            {
                path: "home",
                name: "home",
                component: home
            },
            {
                path: "picture/list/:type",
                name: "picture",
                component: picture
            },
            {
                path: "picture/detail/:type/:id",
                name: "detail",
                component: detail
            },
            {
                path: "help",
                name: "webview",
                component: help
            }
        ]
    }
];

/**
 * 在主框架之外显示
 */
const frameOut = [
    // 登录
    // {
    //     path: "login",
    //     name: "login",
    //     component: () => import("@v/login")
    // },
    // {
    //     path: "home",
    //     name: "home",
    //     component: () => import("@v/home")
    // }
];

/**
 * 编辑操作相关
 * @type {*[]}
 */
const frameEdit = [
    {
        path: "/edit",
        name: "block",
        component: blockEdit,
        children: [
            {
                path: "picture",
                name: "picInfo",
                component: picEdit
            },
            {
                path: "picture/detail",
                name: "detail",
                component: picEditDetail
            },
            {
                path: "pic_type",
                name: "picType",
                component: typeEdit
            },
            {
                path: "banner",
                name: "banner",
                component: banner
            }
        ]
    }
];
//
// /**
//  * 错误页面
//  */
// const errorPage = [
//   {
//     path: "*",
//     name: "404",
//     component: _import("system/error/404")
//   }
// ]
//
// // 导出需要显示菜单的
// export const frameInRoutes = frameIn

// 重新组织后导出
export default [
    ...frameIn,
    ...frameOut,
    ...frameEdit
    // ...errorPage
];
