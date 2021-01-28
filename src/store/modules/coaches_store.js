import axios from 'axios';

export default {
  state() {
    return {
      lastFetch: null,
      coaches: []
    };
  },
  actions: {
    async addCoach(context, { coachData }) {
      // const coaches = context.getters.coaches;

      // create id for the coach
      // const newCoachId = coachData.firstName + coachData.lastName;

      const userId = context.rootGetters.userId;
      const newCoach = {
        ...coachData
      };

      const token = context.getters.token;

      const response = await axios.put(
        `${process.env.VUE_APP_FIREBASE_RTDB_LINK}/coaches/${userId}.json?auth=${token}`,
        JSON.stringify(newCoach),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status !== 200) {
        // error
        const error = new Error(
          response.statusText || 'Failed to register as coach'
        );
        throw error;
      }

      context.commit('addCoach', {
        newCoach: {
          ...response.data,
          id: userId
        }
      });
    },
    async loadCoaches(context, payload) {
      if (payload && !payload.forceRefresh && !context.getters.shouldUpdate) {
        return;
      }

      const response = await axios.get(
        `${process.env.VUE_APP_FIREBASE_RTDB_LINK}/coaches.json`
      );

      const responseData = response.data;

      if (response.status !== 200) {
        // console.log('There was a problem loading coaches');
        const error = new Error(response.statusText || 'Failed to fetch');
        throw error;
      } else {
        const coaches = [];
        for (const key in responseData) {
          const coach = {
            id: key,
            firstName: responseData[key].firstName,
            lastName: responseData[key].lastName,
            areas: responseData[key].areas,
            description: responseData[key].description,
            hourlyRate: responseData[key].hourlyRate
          };
          coaches.push(coach);
        }
        context.commit('setCoaches', { coaches });
        context.commit('setFetchTimestamp');
      }
    }
  },
  mutations: {
    addCoach(state, { newCoach }) {
      state.coaches.push(newCoach);
    },
    setCoaches(state, { coaches }) {
      state.coaches = coaches;
    },
    setFetchTimestamp(state) {
      state.lastFetch = new Date().getTime();
    }
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    isCoach(_state, getters, _rootState, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;

      return coaches.some(coach => {
        return coach.id == userId;
      });
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }

      const currentTime = new Date().getTime();
      return (currentTime - lastFetch) / 1000 > 60;
    }
  }
};
