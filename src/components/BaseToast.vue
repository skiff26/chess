<template>
	<div class="toast" v-if="isOpenNow">
		<div class="toast__header">
			<BaseIcon name="notify" h="20" w="20"/>
			<strong class="toast__title">{{ title }}</strong>
			<BaseIcon @click="isOpenNow = false" class="toast__exit" name="clear" h="20" w="20"/>
		</div>
		<div class="toast__body">
			<p class="toast__text">{{ text }}</p>
		</div>
	</div>
</template>
<script>
import BaseIcon from './BaseIcon.vue';
export default {
	components: {BaseIcon},
	props: ['title', 'text', 'isOpen'],
	data () {
		return {
			isOpenNow: this.isOpen
		}
	}, 
}
</script>

<style lang="scss" scoped>
.toast {
background: rgb(59,59,58);
background: linear-gradient(90deg, rgba(59,59,58,1) 0%, rgba(19,18,17,1) 25%, rgba(0,0,0,0.7875525210084033) 50%, rgba(19,18,17,1) 75%, rgba(59,59,58,1) 100%);
display: inline-block;
position: absolute;
max-width: 400px;
min-width: 300px;
right: 1.5vw;
bottom: 3vh;
border-radius: 5px;

&__header {
	padding: 15px 10px;
	display: flex;
	justify-content: space-between;
	gap: 15px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.863);
}

&__title {
	font-size: 18px;
}
&__exit {
	cursor: pointer;
	transition: all 0.1s ease 0s;
	&:hover{
		fill: white;
	}
}

&__body {
	padding: 10px 20px;
}

&__text {
	font-size: 16px;
}
}

</style>