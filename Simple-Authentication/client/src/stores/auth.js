import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { getToken, setToken, removeToken } from "../services/JwtServices.js";
import ApiService from "../services/ApiServices";

export const useAuthStore = defineStore("auth", () => {
    const router = useRouter();
    const errors = ref({});
    const user = ref({});
    const isAuthenticated = ref(!!getToken());

    function setAuth(authUser) {
        user.value = authUser;
        isAuthenticated.value = true;
        setToken(authUser.token);
        errors.value = {};
        router.push("/");
    }

    function setError(error) {
        errors.value = error;
    }

    function logout() {
        user.value = {};
        isAuthenticated.value = false;
        removeToken();
        errors.value = {};
    }

    async function login(credentials) {
        try {
            const response = await ApiService.post("/login", credentials);
            setAuth(response.data);
        } catch (error) {
            console.log(error.response.data.errors);
            setError(error.response.data.errors);
        }
    }

    function verifyAuth() {
        if (getToken()) {
            ApiService.setHeader();
            ApiService.get("/user")
                .then(({ data }) => {
                    setAuth(data);
                })
                .catch((error) => {
                    setError(error.response.data.errors);
                    logout();
                });
        }
        else {
            logout();
        }
    }

    return {
        errors,
        user,
        isAuthenticated,
        logout,
        login,
        verifyAuth
    };
});