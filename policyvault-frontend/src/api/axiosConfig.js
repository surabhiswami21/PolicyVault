import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});


// ===============================
// REQUEST INTERCEPTOR
// ===============================

api.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {

        return Promise.reject(error);
    }
);


// ===============================
// RESPONSE INTERCEPTOR
// ===============================

api.interceptors.response.use(

    (response) => {

        return response;
    },

    async (error) => {

        const originalRequest =
            error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest?._retry
        ) {

            originalRequest._retry = true;

            try {

                const refreshToken =
                    localStorage.getItem(
                        "refreshToken"
                    );

                if (!refreshToken) {

                    throw new Error(
                        "Refresh token not found"
                    );
                }

                const response =
                    await axios.post(

                        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,

                        {
                            refreshToken:
                                refreshToken
                        }
                    );

                const newAccessToken =
                    response.data.accessToken;

                const newRefreshToken =
                    response.data.refreshToken;


                localStorage.setItem(
                    "token",
                    newAccessToken
                );

                localStorage.setItem(
                    "refreshToken",
                    newRefreshToken
                );


                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;


                return api(originalRequest);

            } catch (refreshError) {

                console.log(
                    "Token refresh failed:",
                    refreshError
                );


                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "refreshToken"
                );

                localStorage.removeItem(
                    "userEmail"
                );


                window.location.href =
                    "/login";


                return Promise.reject(
                    refreshError
                );
            }
        }


        return Promise.reject(error);
    }
);

export default api;