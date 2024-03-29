<script lang="ts">
import { defineComponent } from 'vue';
import { useAppOptionStore } from "@/stores/app-option";
import { useAuthStore } from '@/stores/user-auth';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { register } from "@/api/user";

const appOption = useAppOptionStore();
const userAuth = useAuthStore();

export default defineComponent({
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
		async onSubmit() {
			try {
				const res = await register(this.form)
				if (res.status == 0){
					userAuth.storeRegisterInfo(this.form)
					this.$router.push('/login');
				} else if (res.status == 2){
					this.userInfoError = true;
				} else {
					this.networkError = true;
				}
			} catch (error) {
					console.log(error)
				}
		},

		togglePasswordVisibility() {
			this.showPassword = !this.showPassword;
		},

		showCaptcha() {
			const captcha = new TencentCaptcha('198579184', (res:any) => {
				if (res.ret === 0) {
					this.onSubmit()
				}
			});
			captcha.langFun();
			captcha.show();
		},
	},

	computed: {
		iconClass():any  {
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
                .required('Password is required'),
			confirmPassword: Yup.string()
			.oneOf([Yup.ref('password')], 'Passwords do not match')
			.required('Password is required'),
			name: Yup.string()
			.min(1, 'User name must be at least 1 characters')
			.required('User name is required')
        });


		return {
			passwordStatus: true,
			version: import.meta.env.VITE_VERSION,
			systemName: import.meta.env.VITE_SYSTEM_NAME,
			loading: false,
			showPassword: false,
			showPasswordIcon: "eye",
			schema,
			networkError: false,
			userInfoError: false,
			form: {
				email: "",
				password: "",
				country: "DE",
				name: ""
			}
		};
  	},
	watch: {
  	},
});
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
						<Form @submit="showCaptcha" :validation-schema="schema" v-slot="{ errors }">
							<div v-if="networkError" class="d-flex mb-2">
								<div class="text-red">Sorry Server Error.</div>
							</div>

							<div v-if="userInfoError" class="d-flex mb-2">
								<div class="text-red">Email already exists, please use new email.</div>
							</div>

							<!-- EMAIL -->
							<div class="mb-3">
								<Field type="email" name="email" v-model="form.email" class="form-control fs-14px" placeholder="User Email" :class="{ 'is-invalid': errors.email }"/>
								<div class="invalid-feedback d-flex ps-2">{{errors.email}}</div>
							</div>

							<!-- NAME -->
							<div class="mb-3">
								<Field type="text" name="name" v-model="form.name" class="form-control fs-14px" placeholder="User Name" :class="{ 'is-invalid': errors.name }"/>
								<div class="invalid-feedback d-flex ps-2">{{errors.name}}</div>
							</div>

							<!-- COUNTRY -->
							<div class="mb-3">
								<select class="form-select form-control"  v-model="form.country" >
									<option value="CN">China</option>
									<option value="DE">Germany</option>
								</select>
							</div>
							
							<!-- PASSWORD -->
							<div class="mb-3 position-relative">
								<Field :type="showPassword ? 'text' : 'password'" v-model="form.password" name="password" class="form-control fs-14px" placeholder="User Password" :class="{ 'is-invalid': errors.password }"/>
								<div class="invalid-feedback d-flex ps-2">{{errors.password}}</div>
								<i :class="iconClass" @click="togglePasswordVisibility"></i>
							</div>

							<!-- PASSWORD CONFIRM -->
							<div class="mb-3 position-relative">
								<Field :type="showPassword ? 'text' : 'password'" name="confirmPassword" class="form-control fs-14px" placeholder="User Password Again" :class="{ 'is-invalid': errors.confirmPassword }"/>
								<div class="invalid-feedback d-flex ps-2">{{errors.confirmPassword}}</div>
								<i :class="iconClass" @click="togglePasswordVisibility"></i>
							</div>

							<!-- PASSWORD SUBMIT -->
							<div class="mb-3">
								<button type="submit" class="btn btn-theme fs-14px fw-500 d-block w-100">Sign Up</button>
							</div>

							<div class="d-flex">
								Already have a Dator ID ? &nbsp;&nbsp;<a href="/login">Sign In</a>
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