export const state = () => ({
  users: [],
});

export const getters = {
  users: (state) => {
    return state.users;
  },
};

export const mutations = {
  saveUsers: (state, value) => {
    state.users = value;
  },
};

export const actions = {
  // Search user by `id`
  async findById({ commit }, id) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        res.status = response.status;
        res.data = await response.json();
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Search user models
  async findModels({ commit }, id) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/users/${id}/models`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        res.status = response.status;
        res.data = await response.json();
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
};
