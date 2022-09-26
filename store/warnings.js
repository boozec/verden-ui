export const state = () => ({
  warnings: [],
});

export const getters = {
  warnings: (state) => {
    return state.warnings;
  },
};

export const mutations = {
  saveWarnings: (state, value) => {
    state.warnings = value;
  },
};

export const actions = {
  // Create a new warning
  async createWarning({ commit, rootGetters }, payload) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/warnings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
      body: JSON.stringify(payload),
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
  // Edit a warning
  async editWarning({ commit, rootGetters }, payload) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/warnings/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        res.data = await response.json();
        res.status = response.status;
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
};
