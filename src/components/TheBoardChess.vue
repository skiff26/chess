<template>
	<div class="main">
		<div class="block">
			<BasicListWithLetter class="transform-rotate"/>
			<div class="content">
				<BasicList />
				<TheBorderChessCells @whiteMove="send"/>
				<BasicList :rotate="rotate"/>
			</div>
			<BasicListWithLetter />
		</div>
	</div>
</template>
<script>
import BasicList from './BasicList.vue';
import BasicListWithLetter from './BasicListWithLetter.vue';
import TheBorderChessCells from './TheBorderChessCells.vue'
export default {
	components: { BasicList, BasicListWithLetter, TheBorderChessCells },
	data () {
		return {
			rotate: true,
		}
	},
	methods: {
		send(whiteMove){
			this.$emit('whiteMove', whiteMove)			
		},
	}
}
</script>