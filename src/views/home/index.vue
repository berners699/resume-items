<template>
	<div class="home">首頁</div>
	<div>{{ list.legnth }}</div>
</template>
<script setup>
import { defineOptions, onMounted } from 'vue';
const list = 123;
onMounted(() => {
	let testMap = null
	if (testMap.length > 1) {
		console.log(
			'---报错了---'
		)
	}
})
defineOptions({
	name: 'HomeComp'
});
</script>
<style>
.home {
	color: blue;
	font-size: 20px;
	margin: 10px;
}
</style>
