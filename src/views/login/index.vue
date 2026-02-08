<template>
    <div class="home">
        登录 {{ uesrStore.username }}
        <button @click="uesrStore.add">添加</button>
    </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/user';
const uesrStore = useUserStore();

</script>
<style>
.home {
    color: yellow;
}
</style>