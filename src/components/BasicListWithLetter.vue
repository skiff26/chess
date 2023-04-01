<template>
	<div class="letter-number">
		<span v-for="num in numbers">{{ num }}</span>
	</div>
</template>
<script>
export default {
	data () {
		return {
			numbers: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
		}
	}
}
</script>