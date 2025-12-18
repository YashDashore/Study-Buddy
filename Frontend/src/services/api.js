import axios from 'axios';
const Api = axios.create({
    baseURL: "https://study-buddy-3tys.onrender.com/api/v1",
    withCredentials: true
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");  // ⬅️ important in production
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
