<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AuthAPI from '@/api/AuthAPI';

const route = useRoute();
const { token } = route.params;

onMounted(async () => {
    try {
        const { data } = await AuthAPI.verifyAccount(token);
    } catch (error) {
        console.log(error);
    }
})
</script>

<template>
    <div>
        <h1>desde confirmar</h1>

        <RouterView />
    </div>
</template>