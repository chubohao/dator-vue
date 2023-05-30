<script lang="ts">
import { useAppOptionStore } from "@/stores/app-option";
import { userVariables } from "@/stores/user-variable";
import { useRouter, RouterLink } from 'vue-router';

import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { login } from "@/api/user";
import { reactive } from "vue";

const appOption = useAppOptionStore();


export default {
	components: {
		Form,
		Field
	},
	mounted() {
		appOption.appSidebarHide = true;
		appOption.appHeaderHide = true;
		appOption.appContentClass = 'p-0';
	},
	beforeUnmount() {
		appOption.appSidebarHide = true;
		appOption.appHeaderHide = true;
		appOption.appContentClass = '';
	},

	methods: {
		async onSubmit(values:JSON) {
			const res = await login(values)
			console.log("API RETURN: ", res)
			if (res.status == 200){
				this.$router.push('/');
				userVariables.isAuthenticated = true;
				localStorage.setItem("token", res.data.token);
			} else {
				this.passwordError = true;
				console.log("error", res)
			}
		},

		togglePasswordVisibility() {
			this.showPassword = !this.showPassword;
		},
	},

	computed: {
		iconClass()  {
			return this.showPassword ? 'bi bi-eye eye' : 'bi-eye-slash eye';
		}
  	},
	data() {
		const schema = Yup.object().shape({
			email: Yup.string()
                .required('Email is required')
                .email('Email is invalid'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required')
        });

		return {
			passwordStatus: true,
			version: import.meta.env.VITE_VERSION,
			systemName: import.meta.env.VITE_SYSTEM_NAME,
			loading: false,
			showPassword: false,
			showPasswordIcon: "eye",
			schema,
			passwordError: false
		};
  	},
	watch: {
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
						<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
							<div v-if="passwordError">
								Email or Password Error !
							</div>
							<div class="mb-3">
								<Field type="email" rules="required" name="email" class="form-control fs-14px" placeholder="User Email" :class="{ 'is-invalid': errors.email }"/>
								<div class="invalid-feedback d-flex ps-2">{{errors.email}}</div>
							</div>
							<div class="mb-3 position-relative">
								<Field :type="showPassword ? 'text' : 'password'" name="password" class="form-control fs-14px" placeholder="User Password" :class="{ 'is-invalid': errors.password }"/>
								<div class="invalid-feedback d-flex ps-2">{{errors.password}}</div>
								<i :class="iconClass" @click="togglePasswordVisibility"></i>
							</div>
							
							<div class="mb-3 d-flex">
								<Field name="acceptTerms" type="checkbox" class="form-check-input" :class="{ 'is-invalid': errors.acceptTerms }" value="Flase"/>
								<label for="acceptTerms" class="form-check-label">&nbsp;&nbsp;Remember Me</label>
								<div class="invalid-feedback">{{ errors.acceptTerms }}</div>
							</div>
							<div class="mb-3">
								<button type="submit" class="btn btn-theme fs-14px fw-500 d-block w-100">Sign In</button>
							</div>
							<div class="d-flex">
								<a href="/page/login">Forget Your Dator ID or Password ?</a>
							</div> 
							<div class="d-flex">
								Don’t have an Dator ID ? &nbsp;&nbsp;<a href="/page/register">Create One</a>
							</div>
						</Form>
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

.form-control {
    border-radius: 4px;
  }

.eye {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
  font-size: 16px;
}

.form-control.is-invalid {
	border: 2px solid lightgray; /* 自定义边框样式 */
	background-image: none;
}

.invalid-feedback{
	color: red;
}


</style>