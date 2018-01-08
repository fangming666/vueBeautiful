/**
 * Created by DELL on 2017/12/29.
 */
import * as server from "./ajax";

export const ajaxOpenS = function ({commit}, page) {
  let list = {};
  list.type = page.type;
  server._postAxios(page.url, page.name).then((data) => {
    list.data = data;
    commit("POST_AXIOS", list)
  }).catch(() => {
    commit("ERROR")
  })
};

export const titleInfo = function ({commit}, index) {
  commit("TITLEINFO", index)
};
export const setData = function ({commit},index) {
  commit("SETDATA",index)
};
