<template>
	<div class="wrapper">
		<div class="menu">
			<ul class="menu__list">
				<li class="menu__item" :class="{'active' : item.isActive}" 
					v-for="item in itemsList" :key="item.id"
					@mouseenter="toggle(item.id)" 
					@mouseleave="toggle(item.id)">
					<BaseIcon :name="item.icon" />
					<a href="">{{ item.name }}</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import BaseIcon from '../components/BaseIcon.vue'
export default {
	components: {BaseIcon},
	data(){
		return {
			itemsList: {
				0: {
					id: 0,
					name: 'Обновить',
					isActive: false,
					icon: 'update',
				},
				1: {
					id: 1,
					name: 'Статистика',
					isActive: false,
					icon: 'stats',
				},
				2: {
					id: 2,
					name: 'Деморган',
					isActive: false,
					icon: 'jail',
				},
				3: {
					id: 3,
					name: 'Мут',
					isActive: false,
					icon: 'mute',
				},
				4: {
					id: 4,
					name: 'Подкинуть',
					isActive: false,
					icon: 'slap',
				},
				5: {
					id: 5,
					name: 'Информаци',
					isActive: false,
					icon: 'info',
				},
				6: {
					id: 6,
					name: 'Выход',
					isActive: false,
					icon: 'exit',
				}
			}
		}
	},
	methods: {
		toggle(id){
			this.itemsList[id].isActive = !this.itemsList[id].isActive
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/main.scss';
.wrapper {
	position: relative;
}
.menu {
	position: absolute;
	top: 60vh;
	left: 1.5vw;
	background-color: rgba(0, 0, 0, 0.568);
	border-radius: 20px;
	padding: 20px 20px;
		&__item {
			margin-bottom: 2px;
			border-radius: 15px;
			padding: 10px 40px;
			cursor: pointer;
			transition: all 0.3s ease 0s;
			background: rgb(33,33,36);
			background: linear-gradient(261deg, rgba(33,33,36,1) 0%, rgba(58,58,60,1) 35%, rgba(54,54,51,1) 65%, rgba(31,31,28,1) 100%);
			a {
				margin-left: 10px;
				color: #fff;
			}
		}
}
.active{
				background: rgb(48,48,48);
				background: linear-gradient(270deg, rgba(48,48,48,1) 0%, rgba(161,161,161,1) 50%, rgba(71,71,71,1) 100%);
			}

</style>