<template>
	<div class="number">
		<span :class="{'transform-rotate': rotate}" v-for="num in 8">{{ num }}</span>
	</div>
</template>
<script>
export default {
	props: ['rotate']
}
</script>