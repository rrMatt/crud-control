import * as userService from '../services/user-service'


export const state = {
    list: [],
    total: 0,
    isLoading: false,
    isSaving: false,
}


export const mutations = {
    setUsers(state, value){
        state.list = value;
        state.isLoading = false;
    },
    setLoading(state, value){
        state.isLoading = !!value;
    },
    setSaving(state, value){
        state.isSaving = !!value;
    },
    setTotal(state,value){
        state.total = value;
    }
}

export const actions = {

    getUsers({commit}, searchTerms){
        commit(mutations.setLoading.name, true);

        userService.getUsers(searchTerms)
            .then((data) => {
                commit(mutations.setTotal.name, data.resultCount);
                commit(mutations.setUsers.name, data.results)
            });
    },

    createUser({commit, dispatch}, user){
        commit(mutations.setSaving.name, true);

        userService.createUser(user).then(() => {
            commit(mutations.setSaving.name, false);
            dispatch(actions.getUsers.name);    
        });
    },

    editUser({commit, dispatch}, user){
        commit(mutations.setSaving.name, true);

        userService.editUser(user).then(() => {
            commit(mutations.setSaving.name, false);
            dispatch(actions.getUsers.name);
        });
    },

    deleteUser({commit, dispatch}, user){
        commit(mutations.setSaving.name, true);

        userService.deleteUser(user).then(() => {
            commit(mutations.setSaving.name, false);
            dispatch(actions.getUsers.name);
        });
    },
}


const usersModule = {
    namespaced: true,
    state: state,
    mutations,
    actions,
};

export default usersModule;
