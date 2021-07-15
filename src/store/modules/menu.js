export default {
    namespaced: true,
    state: {
        currTab: "99",
        userName: "",
        menus: []
    },
    mutations: {
        reset(state, currTab) {
            state.currTab = currTab;
        },
        setName(state, name) {
            state.userName = name;
        },
        setMenus(state, menus) {
            state.menus = menus;
        }
    },
    actions: {
        set({ commit }, currTab) {
            commit("reset", currTab);
        },
        setName({ commit }, name) {
            commit("setName", name);
        },
        setMenus({ commit }, menus) {
            commit("setMenus", menus);
        }
    },
    modules: {}
};
