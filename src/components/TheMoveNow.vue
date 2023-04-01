<template>
	<p :class="getClass">{{ movesNow }}</p>
</template>

<script>
export default {
	props: ['whiteMove'],
	computed: {
		movesNow(){
			return this.whiteMove ? 'Ход белых' : 'Ход черных'
		},
		getClass(){
			return !this.whiteMove ? ['move-now', 'move-black', 'pulse-black'] : ['move-now', 'pulse-white']
		}
	}
}
</script>
<style lang="scss" scoped>
.move-now {
	display: block;
	width: 30vw;
	padding: 5px 40px;
	margin: 0 auto;
	margin-top: 35px;
	font-family: 'Times New Roman', sans-serif;
	letter-spacing: 2px;
	font-size: 34px;
	text-align: center;
	border-radius: 30px;
	color: rgb(14, 14, 14);
	background-color: #e2dcdbe0;
	-webkit-box-shadow: 0px 0px 54px 25px rgba(255, 255, 255, 0.7);
	-moz-box-shadow: 0px 0px 54px 25px rgba(255, 255, 255, 0.7);
	box-shadow: 0px 0px 54px 25px rgba(255, 255, 255, 0.7);
	transition: all 0.3s ease 0s;
	@media(max-width: 1200px){
		-webkit-box-shadow: 0px 0px 54px 5px rgba(255, 255, 255, 0.7);
		-moz-box-shadow: 0px 0px 54px 5px rgba(255, 255, 255, 0.7);
		box-shadow: 0px 0px 54px 5px rgba(255, 255, 255, 0.7);
		margin-top: 10px;
		font-size: 26px;
		white-space: nowrap;
		width: auto;
		max-width: max-content;
		padding: 10px 25px;
	}
	&.pulse-black{
		animation: pulse-animation-black 1s;
	}
	&.pulse-white{
		animation: pulse-animation-white 1s;
	}
}
@keyframes pulse-animation-black {
  0% {
    transform: scale(1);
  }
  50% {
	transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes pulse-animation-white {
  0% {
    transform: scale(1);
  }
  50% {
	transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.move-black{
	color: rgb(236, 227, 227);
	background-color: #1b1b1b;
	-webkit-box-shadow: 0px 0px 54px 39px rgba(28, 28, 23, 0.7);
	-moz-box-shadow: 0px 0px 54px 39px rgba(28, 28, 23, 0.7);
	box-shadow: 0px 0px 54px 25px rgba(28, 28, 23, 0.7);
}
</style>