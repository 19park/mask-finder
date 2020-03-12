// Lib imports
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

// Store functionality
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';


const vuexSession = new VuexPersistence({
    storage: window.localStorage,
    saveState: (key, state, storage) => {
        const stateStringData = JSON.stringify(state);
        storage.setItem(key, stateStringData);
    },
    restoreState: (key, storage) => {
        let jsonData = storage.getItem(key);
        let stateData;
        if (jsonData) {
            stateData = JSON.parse(jsonData);
        } else {
            stateData = {
                search: {
                    city: null,
                    district: null,
                    neigh: null
                }
            };
        }

        return stateData;
    },
});

Vue.use(Vuex);

// Create a new store
export default new Vuex.Store({
    actions,
    getters,
    mutations,
    state,

    plugins: [vuexSession.plugin]
});
