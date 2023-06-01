import { defineStore } from 'pinia';
import router from '@/router'
import { string } from 'yup';


export const useAuthStore = defineStore('auth', {
    state: () => ({
            isAuthenticated: false,
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
            this.user.email = form.email;
            this.user.name = res.data.name;
            this.user.id = res.data.id;
            this.user.token = res.data.token;
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify(this.user));
            if (form.rememberMe == "True"){
                this.startLogoutTimer(30);
            } else {
                this.startLogoutTimer(0.1);
            }
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
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
            this.clearLogoutTimer();
        },

        startLogoutTimer(minu:any) {
            const logoutTime = minu * 60 * 1000; // 30分钟
            this.logoutTimerId = setTimeout(() => {
                this.logout();
            }, logoutTime);
        },

        clearLogoutTimer() {
            if (this.logoutTimerId) {
                clearTimeout(this.logoutTimerId as any);
                this.logoutTimerId = null;
            }
        },

        resetLogoutTimer() {
            this.clearLogoutTimer();
            this.startLogoutTimer(5);
        },

        checkAuth() {
            const isAuthenticated = localStorage.getItem('isAuthenticated');
            const user = localStorage.getItem('user');
            if (isAuthenticated && user) {
                this.isAuthenticated = true;
                this.user = JSON.parse(user);
                this.startLogoutTimer(5);
        }
        },
    },
});
