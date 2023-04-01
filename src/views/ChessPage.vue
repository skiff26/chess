<template>
	<div class="wrapper" :class="{'white' : !blackTheme}">
		<h1 class="title" :style="{color: !blackTheme ? 'black' : 'white'}">CHESS</h1>
		<TheSidebarSettings @changeTheme="changeTheme" @setAnim="setAnim"/>
		<TheBoardChess @whiteMove="changeColorMove"/>
		<TheMoveNow :whiteMove="whiteMove"/>
	</div>
</template>
<script>
import { computed } from 'vue'
import BaseToast from '../components/BaseToast.vue';
import TheBoardChess from '../components/TheBoardChess.vue';
import TheSidebarSettings from '../components/TheSidebarSettings.vue'
import TheMoveNow from '../components/TheMoveNow.vue';
export default {
	components: {
		BaseToast, TheBoardChess, TheSidebarSettings, TheMoveNow
	},
	provide(){
		return {
			animStatus: computed(() => this.animStatus)
		}
	},
	data () {
		return {
			whiteMove: true,
			blackTheme: true,
			animStatus: false,
		}
	},
	methods: {
		changeColorMove(whiteMove){
			this.whiteMove = whiteMove
		},
		changeTheme(theme){
			this.blackTheme = theme
		},
		setAnim(status){
			this.animStatus = status
		}	
	},
}
</script>