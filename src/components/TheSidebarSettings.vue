<template>
	<div class="sidebar">
		<h2 class="sidebar__title" @click="isHidden = !isHidden">
			<BaseIcon v-show="isHidden" class="cursor-pointer" name="settings" w="20" h="25"/>
			<BaseIcon v-show="!isHidden" class="cursor-pointer" name="exit" w="20" h="25"/>
			<strong class="cursor-pointer">НАСТРОЙКИ</strong>
		</h2>
			<div v-if="!isHidden && isSmall" class="sidebar__settings">
				<div v-for="setting in settings" :key="setting" class="setting">
					<input :id="setting.text" @input="settingChange(setting)" :checked="setting.status" type="checkbox">
					<label :for="setting.text">{{ setting.text }}</label>
				</div>		
			</div>

			<div v-if="!isHidden && !isSmall" class="sidebar__settings" :class="{'mt-15' : !isSmall}">
				<div v-for="setting in settings" :key="setting" class="sidebar_set">
					<label class="switch">
						<input type="checkbox" @input="settingChange(setting)" :checked="setting.status">
						<span class="slider"></span>
					</label>
					<span class="text">{{ setting.text }}</span>
				</div>
			</div>
		<teleport to="body" v-if="isOpen" >
			<BaseToast title="Изменение настроек" text="Сохранение данных..." :isOpen="isOpen"/> 
		</teleport>
	</div>
</template>
<script>
import BaseIcon from './BaseIcon.vue';
import BaseToast from './BaseToast.vue';
export default {
	components: {BaseToast, BaseIcon},
	data () {
		return {
			isHidden: false,
			isOpen: false,
			isSmall: false,
			settings: {
				darkMode: {
					id: 0,
					status: true,
					text: 'Включить темный режим'
				},
				animMode: {
					id: 1,
					status: false,
					text: 'Включить анимацию вращения доски'
				},
				secondBoard: {
					id: 2,
					status: false,
					text: 'Включить вторую доску'
				},
				startLogs: {
					id: 3,
					status: false,
					text: 'Включить запись ходов'
				}
			}
		}
	},
	methods: {
		settingChange(setting){
			if (!this.isOpen){
				this.isOpen = true
				setTimeout(() => {
					this.isOpen = false
				}, 5000);
			}
			setting.status = !setting.status
			this.changeTheme(setting)
		},
		changeTheme(setting){
			if(setting.text === this.settings.animMode.text){
				console.log(setting.status)
				this.$emit('setAnim', setting.status)
			}
			if(setting.text === this.settings.darkMode.text){
				if(setting.status){
					body.style.background = 'linear-gradient(to bottom, #222 0%, #444 100%)';
					body.style.background = '-moz-linear-gradient(to bottom, #222 0%, #444 100%)';
					body.style.background = '-webkit-linear-gradient(to bottom, #222 0%,#444 100%)';
				} else {
					body.style.background = 'linear-gradient(to bottom, #fff 0%, #eee 100%';
					body.style.background = '-moz-linear-gradient(to bottom, #fff 0%, #eee 100%)';
					body.style.background = 'webkit-linear-gradient(to bottom, #fff 0%,#eee 100%)';
				}
				this.$emit('changeTheme', setting.status)
			}
		},
		onResize(){
			if(window.innerWidth < 1500){
				this.isHidden = true
				this.isSmall = true
			} else {
				this.isHidden = false
				this.isSmall = false
			}
		}
	},
	mounted(){
		this.onResize()
		window.addEventListener('resize', this.onResize)
		window.addEventListener('click', event => {
			if(!this.$el.contains(event.target) && window.innerWidth < 1500){
				this.onResize()
			}
		})
	}
}
</script>

<style lang="scss" scoped>
.sidebar_set{
	display: flex;
	gap: 20px;
	align-items: center;
	margin-bottom: 10px;
}
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border: 1px solid #adb5bd;
  transition: .4s;
  border-radius: 30px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 1.4em;
  width: 1.4em;
  border-radius: 20px;
  left: 0.27em;
  bottom: 0.25em;
  background-color: #adb5bd;
  transition: .4s;
}
input:checked + .slider {
  background-color: #007bff;
  border: 1px solid #007bff;
}
input:focus + .slider {
  box-shadow: 0 0 1px #007bff;
}
input:checked + .slider:before {
  transform: translateX(1.4em);
  background-color: #fff;
}

.sidebar {
	position: absolute;
	z-index: 101;
	max-width: 400px;
	padding: 5px 20px;
	margin: 5px 10px;
	border-radius: 10px;
	border: 2px white solid;
	background: rgb(59,59,58);
	background: linear-gradient(90deg, rgba(59,59,58,1) 0%, rgba(19,18,17,1) 25%, rgba(0,0,0,0.7875525210084033) 50%, rgba(19,18,17,1) 75%, rgba(59,59,58,1) 100%);
	-webkit-box-shadow: 0px 0px 30px 30px rgba(20, 21, 22, 0.26);
	-moz-box-shadow: 0px 0px 30px 30px rgba(20, 21, 22, 0.26);
	box-shadow: 0px 0px 30px 30px rgba(20, 21, 22, 0.26);
	@media (max-width: 1500px){
		box-shadow: none;
		z-index: 101;
		margin-top: -40px;
	}
	@media (max-width: 720px){
		margin-top: -20px;
	}
	@media (max-width: 435px){
		margin-top: 10px;
	}

&__title {
	display: flex;
	align-items: center;
	color: white;
	font-size: 24px;
	padding: 5px 5px 5px 15px;
	user-select: none;
	@media (max-width: 1200px){
		font-size: 18px;
	}
	@media (max-width: 720px){
		font-size: 16px;
		padding: 2px;
	}
	strong {
		padding-left: 5px;
	}
}

&__settings {
	display: flex;
	flex-direction: column;
	&.mt-15{
		margin-top: 15px;
	}
	.setting {
		margin: 5px 15px;
		display: flex;
		align-items: center;
		@media (max-width: 1200px){
			font-size: 16px;
		}
		input {
			width: 20px;
			height: 20px;
			margin-right: 5px;
		}
		label {
			color: rgba(255, 255, 255, 0.9);
		}
	}
}
}
</style>