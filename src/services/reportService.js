import axios from "axios";

export const reportService = {
    getTaskReport: async (month, branchUid, userUid = "") => {
        const token = localStorage.getItem("token");
        const params = {month, branch_uid: branchUid};
        if (userUid) params.user_uid = userUid;

        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/reports/task-by-user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: params,
        });
    },
    getBranches: async () => {
        const token = localStorage.getItem("token");
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/weekly-planning/branches`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getUsers: async (branchUid) => {
        const token = localStorage.getItem("token");
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { branch_uid: branchUid },
        });
    },
};