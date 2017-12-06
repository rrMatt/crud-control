import Vue from 'vue'
import Vuex from 'vuex'
import usersModule from './usersList'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{},
    modules:{
        usersList: usersModule
    }
});


export default store;