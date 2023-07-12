const initialState = {
  token: null,
  data: null,
  admin: false,
  teacher: false,
};

const Auth = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_ADMIN_PROFILE":
      return {
        token: payload?.token,
        data: payload?.user,
        admin: true,
        teacher: false,
      };
    case "SET_TEACHER_PROFILE":
      return {
        token: payload?.token,
        data: payload?.user,
        admin: false,
        teacher: true,
      };
    case "LOGOUT":
      return {
        token: null,
        data: null,
        _persist: {
          rehydrated: true,
          version: -1,
        },
      };
    default:
      return state;
  }
};

export default Auth;
