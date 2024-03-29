<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useAppOptionStore } from '@/stores/app-option';
import { useAuthStore } from '@/stores/user-auth';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import AppSidebar from '@/components/app/Sidebar.vue';
import AppHeader from '@/components/app/Header.vue';
import AppFooter from '@/components/app/Footer.vue';
import AppThemePanel from '@/components/app/ThemePanel.vue';
import router from '@/router';


const appOption = useAppOptionStore();
const userAuth = useAuthStore()

router.beforeEach((to, from, next) => {
	if (to.path !== "/login" && to.path !== "/register" && !userAuth.isAuthenticated) {
		next({ path: "/login"});
	}
	else {
		userAuth.resetLogoutTimer();
		NProgress.start();
		next();
		appOption.appSidebarMobileToggled = false;
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}
});

router.afterEach(() => {
	NProgress.done();
});
</script>


<template>
	<div class="app" v-bind:class="{ 
		'app-header-menu-search-toggled': appOption.appHeaderSearchToggled,
		'app-sidebar-minified': appOption.appSidebarMinified,
		'app-sidebar-collapsed': appOption.appSidebarCollapsed,
		'app-sidebar-mobile-toggled': appOption.appSidebarMobileToggled,
		'app-sidebar-mobile-closed': appOption.appSidebarMobileClosed,
		'app-content-full-height': appOption.appContentFullHeight,
		'app-content-full-width': appOption.appSidebarHide,
		'app-without-sidebar': appOption.appSidebarHide,
		'app-without-header': appOption.appHeaderHide,
		'app-boxed-layout': appOption.appBoxedLayout,
		'app-footer-fixed': appOption.appFooterFixed,
		}">
		<!-- 导航 -->
		<app-header v-if="!appOption.appHeaderHide" />

		<!-- 边导 -->
		<app-sidebar v-if="!appOption.appSidebarHide" />

		<!-- 主体 -->
		<div class="app-content" v-bind:class="appOption.appContentClass">
			<router-view></router-view>
		</div>

		<!-- 页尾 -->
		<app-footer v-if="appOption.appFooter" />

		<!-- 主题漂浮键 -->
		<app-theme-panel />
	</div>
</template>
