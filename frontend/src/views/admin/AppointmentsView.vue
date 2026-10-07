<script setup>
import { useUserStore } from '@/stores/user';
import AdminAppointment from '@/components/AdminAppointment.vue';

const user = useUserStore();
</script>

<template>
    <p class="text-white text-lg mt-5">
        A continuación podrás administrar tus próximas citas.
    </p>

    <p v-if="user.noAppointments" class="text-white text-lg mt-5">
        No tienes citas programadas.
    </p>

    <div v-else class="grid grid-cols-1 gap-5 mt-10">
        <AdminAppointment v-for="appointment in user.userAppointments" :key="appointment._id" :appointment="appointment" />
    </div>
</template>