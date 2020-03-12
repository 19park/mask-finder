module.exports = {
    SET_CITY(state, payload) {
        state.search.city = payload;
    },
    SET_DISTRICT(state, payload) {
        state.search.district = payload;
    },
    SET_NEIGH(state, payload) {
        state.search.neigh = payload;
    },
};
