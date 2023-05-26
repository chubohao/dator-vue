<script lang="ts">
import { useAppOptionStore } from '@/stores/app-option';
import { useRouter, RouterLink } from 'vue-router';
import { login } from '@/api/user'

const appOption = useAppOptionStore();

export default {
	mounted() {
		appOption.appSidebarHide = true;
		appOption.appHeaderHide = true;
		appOption.appContentClass = 'p-0';
	},
	beforeUnmount() {
		appOption.appSidebarHide = false;
		appOption.appHeaderHide = false;
		appOption.appContentClass = '';
	},
	methods: {
		submitForm: function() {
			var res = login(this.userForm)
			console.log(res)
			if (res.status == 200){
				this.$router.push('/');
			}
		},
		switchStatus() {
			this.passwordStatus = !this.passwordStatus;
		},
	},
	data() {
		return {
		passwordStatus: true,
		version: import.meta.env.VITE_VERSION,
		systemName: import.meta.env.VITE_SYSTEM_NAME,
		loading: false,
		switchText: "password",
		switchIcon: "eye",
		userForm: {
			email: "",
			password: "",
		},

		rules: {
			email: [
			{
				required: true,
				message: "Please enter your email",
				trigger: "blur",
			},
			{ pattern:/^[A-Za-z0-9.\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,min: 2, max: 15, message: "Error Email", trigger: "blur" },
			],

			password: [
			{ 
				required: true, 
				message: "Please enter your password", 
				trigger: "blur" 
			},
			],
		},
		};
  	},
	watch: {
		passwordStatus(newValue) {
		if (newValue) {
			this.switchText = "password";
			this.switchIcon = "eye";
		} else {
			this.switchText = "text";
			this.switchIcon = "eye-open";
		}
		},
  	},
}
</script>
<template>
	<!-- BEGIN login -->
	<div class="vh-100 p-5 overflow-auto" style="background-color: hsl(0, 0%, 97%)">
		<div class="row align-items-center pt-5">

			<!-- LEFT PART -->
			<div class="col-lg-5 mb-5 mb-lg-0">
				<h1 class="display-3 fw-bold ls-tight">
					Dator <br/> <span class="text-primary fw-bold display-4">IoT Data Platform</span>
				</h1>
				<p style="color: hsl(216, 10%, 51%)">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Eveniet, itaque accusantium odio, soluta, corrupti aliquam
					quibusdam tempora at cupiditate quis eum maiores libero
					veritatis? Dicta facilis sint aliquid ipsum atque?
				</p>
			</div>
			<div class="col-lg-1"></div>

			<!-- RIGHT PART -->
			<div class="col-lg-5 mb-5 mb-lg-0">
				<div class="card border-0">
					<div class="card-body py-5 px-md-5 mx-4 text-center">
						
						<!-- VUE LOGIN FORM -->
						<form v-on:submit.prevent="submitForm()" name="userInfo">
							<div class="mb-3">
								<input type="email" class="form-control form-control-lg fs-14px" placeholder="User Email" v-model="userForm.email"/>
							</div>
							<div class="mb-3">
								<input type="password" class="form-control form-control-lg fs-14px" placeholder="User Password" v-model="userForm.password"/>
							</div>
							<div class="mb-3">
								<button type="submit" class="btn btn-theme btn-lg fs-14px fw-500 d-block w-100">Sign Up</button>
							</div>
							<div class="text-muted text-center">
								Already have an Admin ID? <a href="/page/login">Sign In</a>
							</div>
						</form>
					</div>

					<!-- Register buttons -->
					<div class="text-center m-0 pb-2">
						<button type="button" class="btn btn-link btn-floating mx-1">
							<i class="bi bi-facebook"></i>
						</button>

						<button type="button" class="btn btn-link btn-floating mx-1">
							<i class="bi bi-google"></i>
						</button>

						<button type="button" class="btn btn-link btn-floating mx-1">
							<i class="bi bi-twitter"></i>
						</button>

						<button type="button" class="btn btn-link btn-floating mx-1">
							<i class="bi bi-github"></i>
						</button>

						<button type="button" class="btn btn-link btn-floating mx-1">
							<i class="bi bi-wechat"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END login -->
</template>

<style>
.login-title {
  color: #000;
  text-align: center;
  margin-bottom: 40px;
}

.el-form-item {
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  background: rgba(0, 0, 0, 0.1);
  color: #454545;
  border-radius: 5px;
  margin-bottom: 25px;
}

.login-form input{
  background: transparent !important;
  outline: none;
  border: none;
  padding-left: 30px;
  color: #000;
  height: 30px;
}

.el-input__wrapper  {
  background: transparent !important;
  box-shadow: none;
}

.login-user {
  position: absolute;
  font-size: 19px;
  color: #889aa4;
  left: 5px;
  top: 8px;
}

.eye {
  position: absolute;
  right: 18px;
  top: 10px;
  cursor: pointer;
  font-size: 16px;
}

.el-button {
  width: 100%;
}

</style>