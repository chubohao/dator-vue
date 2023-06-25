import { defineStore } from 'pinia';
import router from '@/router'
import { string } from 'yup';


export const useAuthStore = defineStore('auth', {
    state: () => ({
            isAuthenticated: false,
            timer: "",
            user: {
                id: "",
                name: "",
                email: "",
                token: ""
            },
            logoutTimerId: null as NodeJS.Timeout | null,
    }),

    actions: {
        storeRegisterInfo(user:any) {
            this.user.name = user.name;
            this.user.email = user.email;
            localStorage.setItem('user', JSON.stringify(this.user));
        },

        storeLoginStatus(res:any, form:any) {
            this.isAuthenticated = true;
            this.user.email = res.data.data.email;
            this.user.name = res.data.data.name;
            this.user.id = res.data.data.userId;
            this.user.token = res.data.data.token;
            if (form.rememberMe == "True"){
                this.timer = "300";
            } else {
                this.timer = "10"
            }
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('timer', this.timer);
            this.startLogoutTimer(this.timer);
        },

        logout() {
            router.push("/login");
            this.isAuthenticated = false;
            this.user = {
                id: "",
                name: "",
                email: "",
                token: ""
            };
            this.timer = "";

            localStorage.clear();
            this.clearLogoutTimer();
        },

        startLogoutTimer(minu:any) {
            this.logoutTimerId = setTimeout(() => {
                this.logout();
            }, parseInt(minu) * 60 * 1000);
        },

        clearLogoutTimer() {
            if (this.logoutTimerId) {
                clearTimeout(this.logoutTimerId as any);
                this.logoutTimerId = null;
            }
        },

        resetLogoutTimer() {
            this.clearLogoutTimer();
            this.startLogoutTimer(this.timer);
        },

        checkAuth() {
            const isAuthenticated = localStorage.getItem('isAuthenticated');
            const user = localStorage.getItem('user');
            const timer = localStorage.getItem('timer')
            if (isAuthenticated && user && timer) {
                this.isAuthenticated = true;
                this.user = JSON.parse(user);
                this.timer = timer;
                this.startLogoutTimer(this.timer);
            }
        },
    },
});
