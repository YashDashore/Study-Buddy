import axios from 'axios';
const Api = axios.create({
    baseURL: "https://study-buddy-backend-7nhi.onrender.com",
    withCredentials: true
});

Api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await Api.get("/users/refresh-tokens");
                return Api(originalRequest);
            } catch (err) {
                alert("Session expired. Please login again.");
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default Api;
