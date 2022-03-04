import api from '@/services/api';

const state = {
    users: []
  };

  const getters = {
    allUsers: state => state.users
  };

  const mutations = {
    allusers: (state, users) => (state.users = users),
  };

  const actions = {
    async getUsers({commit}){
        try {
            const res = await api.get('users/anJV1pzv98954kD');
            console.log(res.data.data);
            commit('allusers', res.data.data)
        } catch (error) {
            console.log(error)
        }
    },
  };

  const modules = {
    
  }

  export default {
    state,
    getters,
    actions,
    mutations,
}