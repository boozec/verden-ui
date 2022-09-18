export const state = () => ({
  models: [],
  count: 0,
});

export const getters = {
  models: (state) => {
    return state.models;
  },
  count: (state) => {
    return state.count;
  },
};

export const mutations = {
  // Save results and count
  saveModels: (state, value) => {
    state.models = value.results;
    state.count = value.count;
  },
};

export const actions = {
  // Get models usign `page`
  async getModels({ commit }, page) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    page = page ? page : 0;

    await fetch(`${api}/v1/models?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        res.data = await response.json();
        res.status = response.status;
        if (res.status == 200) {
          commit("saveModels", res.data);
        }
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
};
