const state = {
  visitedViews: [],
  cachedViews: [],
};
const mutations = {
  ADD_TAGS_VISITED(state, data) {
    if (state.visitedViews.some((val) => val.path == data.path)) return;
    state.visitedViews.push(data);
  },
  DEL_VISITED_VIEW(state, data) {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path == data.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },
};

const actions = {
  addTags({ commit }, view) {
    commit("ADD_TAGS_VISITED", view);
  },
  delView({ commit, state }, data) {
    return new Promise((resolve) => {
      commit("DEL_VISITED_VIEW", data);
      console.log([...state.visitedViews]);
      resolve([...state.visitedViews]);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
