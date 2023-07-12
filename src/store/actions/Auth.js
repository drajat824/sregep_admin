function createAction(type, payload) {
    return {
        type,
        payload,
    };
}

export const setAdminProfile = (data) => createAction('SET_ADMIN_PROFILE', data?.data?.data);
export const setTeacherProfile = (data) => createAction('SET_TEACHER_PROFILE', data?.data?.data);
export const logout = (data) => createAction('LOGOUT');