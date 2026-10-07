<script setup>
import { useUserStore } from '@/stores/user';

const user = useUserStore();
</script>

<template>
    <p class="text-white text-lg mt-5">
        A continuación podrás administrar tus próximas citas.
    </p>
</template>