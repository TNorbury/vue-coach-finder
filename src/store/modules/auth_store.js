import axios from 'axios';

export default {
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null
    };
  },
  actions: {
    async login(context, payload) {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_TOKEN}`,
        JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        }),

        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const responseData = response.data;

      if (response.status !== 200) {
        console.log(responseData);
        const error = new Error(
          response.statusText || 'Failed to authenticate'
        );
        throw error;
      }

      console.log(responseData);
      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
      });
    },

    async signup(context, payload) {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_TOKEN}`,
        JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        }),

        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const responseData = response.data;

      if (response.status !== 200) {
        console.log(responseData);
        const error = new Error(
          response.statusText || 'Failed to authenticate'
        );
        throw error;
      }

      console.log(responseData);
      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
      });
    }
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.tokenExpiration = payload.tokenExpiration;
    }
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    }
  }
};
