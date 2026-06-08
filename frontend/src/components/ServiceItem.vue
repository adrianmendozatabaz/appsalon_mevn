<script setup>
import { formatCurrency } from '@/helpers';
import { useAppointmentsStore } from '@/stores/appointments';

const appointment = useAppointmentsStore();

defineProps({
    service: Object
})
</script>

<template>
    <div class="p-5 space-y-5 rounded-lg cursor-pointer bg-white" @click="appointment.onServiceSelected(service)">
        <p class="text-2xl font-light">{{ service.name }}</p>
        <p class="text-4xl font-black text-blue-600">{{ formatCurrency(service.price) }}</p>
    </div>
</template>

<style lang="scss" scoped></style>