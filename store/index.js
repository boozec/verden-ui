export const state = () => ({
  loading: false,
});

export const getters = {
  animation: (state) => {
    return state.loading ? "animate-none" : "animate-spin";
  },
};
export const mutations = {
  loadingStatus: (state, value) => {
    state.loading = value;
  },
};
