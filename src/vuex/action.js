/**
 * Created by DELL on 2017/12/29.
 */
import * as server from "./ajax";
import axios from "axios";
export const ajaxOpenS = function ({commit}, page) {
  let list = {};
  list.type = page.type;
  return server._postAxios(page.url, page.name).then((data) => {
    list.data = data;
    commit("POST_AXIOS", list)
  }).catch(() => {
    commit("ERROR")
  });
};

export const ajaxOpenS2 = async ({commit}, page) => {
  let list = {};
  list.type = page.type;
  let dataS = await server._postAxios2(page.url, page.name);
  try {
    list.data = dataS.data;
    commit("POST_AXIOS", list);
  } catch (e) {
    commit("ERROR")
  }
  return dataS;
};


export const loading = function ({commit}) {
  commit("LOADING")
};
export const titleInfo = function ({commit}, index) {
  commit("TITLEINFO", index)
};
export const setData = function ({commit}, index) {
  commit("SETDATA", index)
};
