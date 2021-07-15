import service from "./httpIntercept";
function _get(url, params) {
    return service({ url, method: "get", params });
}
function _post(url, data) {
    return service({ url, method: "post", data });
}
let apiFuns = {
    queryPicTypeList(e) {
        return _get("/v1/picture/queryPicTypeList", e);
    },
    deleteTypeById(e) {
        return _post("/v1/picture/deleteTypeById", e);
    },
    queryPicListByTypeId(e) {
        return _get("/v1/picture/queryPicListByTypeId", e);
    },
    queryPicDetailById(e) {
        return _get("/v1/picture/queryPicDetailById", e);
    },
    queryPicListByTypeName(e) {
        return _get("/v1/picture/queryPicListByTypeName", e);
    },
    queryPics(e) {
        return _get(`/v1/picture/queryPics`, e);
    },
    deletePicById(e) {
        return _post("/v1/picture/deletePicById", e);
    },
    search(e) {
        return _get(`/v1/picture/search`, e);
    },
    saveInfo(e) {
        return _post(`/v1/picture/saveInfo`, e);
    },
    saveType(e) {
        return _post(`/v1/picture/savePicType`, e);
    },
    getDownloadDoc(e) {
        return _post(`/v1/tool/getDownloadDoc`, e);
    }
};
export default {
    ...apiFuns
};
