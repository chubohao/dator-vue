import { defineStore } from "pinia";

export const useAppOptionStore = defineStore({
  id: "appOption",
  state: () => {
    return {
    	appThemeClass: '',
    	appCoverClass: '',
			appSidebarMinified: false,
			appBoxedLayout: false,
			appHeaderHide: true,
			appHeaderSearchToggled: false,
			appSidebarCollapsed: false,
			appSidebarMobileToggled: false,
			appSidebarMobileClosed: false,
			appSidebarHide: true,
			appContentFullHeight: false,
			appContentClass: '',
			appFooter: false,
			appFooterFixed: false,
			appThemePanelToggled: false
		}
  }
});
