import axios from 'axios';

export default {
  state() {
    return {
      requests: []
    };
  },
  actions: {
    async addRequest(context, { requestData }) {
      const newRequest = {
        ...requestData
      };

      const response = await axios.post(
        `${process.env.VUE_APP_FIREBASE_RTDB_LINK}/requests/${newRequest.coachId}.json`,
        JSON.stringify(newRequest),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status !== 200) {
        const error = new Error(
          response.statusText || 'Failed to send request'
        );
        throw error;
      }

      context.commit('addRequest', { newRequest });
    },
    async loadRequests(context) {
      const userId = context.rootGetters.userId;
      const token = context.getters.token;

      const response = await axios.get(
        `${process.env.VUE_APP_FIREBASE_RTDB_LINK}/requests/${userId}.json?auth=${token}`
      );

      if (response.status !== 200) {
        const error = new Error(
          response.statusText || 'Failed to load your requests'
        );
        throw error;
      }

      const requests = [];
      const responseData = response.data;
      for (const key in responseData) {
        const request = {
          id: key,
          ...responseData[key]
        };
        requests.push(request);
      }

      console.log(requests);

      context.commit('setRequests', { requests });
    }
  },
  mutations: {
    addRequest(state, { newRequest }) {
      state.requests.push(newRequest);
    },
    setRequests(state, { requests }) {
      state.requests = requests;
    }
  },
  getters: {
    getRequests(state, _getters, _rootState, rootGetters) {
      const id = rootGetters.userId;
      return state.requests.filter(request => {
        return request.coachId == id;
      });
    }
  }
};
