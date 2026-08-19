<script setup>
import VueTailwindDatepicker from 'vue-tailwind-datepicker';
import SelectedService from '@/components/SelectedService.vue';
import { formatCurrency } from '@/helpers';
import { useAppointmentsStore } from '@/stores/appointments';
import { ref } from 'vue';

const appointment = useAppointmentsStore();

const formatter = ref({
    date: 'DD/MM/YYYY',
    month: 'MMM'
})

const disableDate = (date) => {
    const today = new Date();
    return date < today || date.getMonth() > today.getMonth() + 1 || [0, 6].includes(date.getDay());
}
</script>

<template>
    <h2 class="text-4xl font-extrabold text-white mt-10">Resumen y Detalles de la cita</h2>
    <p class="text-white text-lg mt-5">A continuación verifica la información y confirma tu cita</p>

    <h3 class="text-3xl font-extrabold text-white text-center mt-10">Servicios</h3>

    <p v-if="appointment.noServicesSelected" class="text-white text-2xl text-center">No hay servicios seleccionados</p>

    <div class="grid gap-5 mt-5" v-else>
        <SelectedService v-for="service in appointment.services" :key="service._id" :service="service" />

        <p class="text-right text-white text-2xl">Total a pagar:
            <span class="font-black">{{ formatCurrency(appointment.totalAmount) }}</span>
        </p>
    </div>

    <div class="space-y-8" v-if="!appointment.noServicesSelected">
        <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>

        <div class="lg:flex gap-5 items-start">
            <div class="w-full flex-1 bg-white flex justify-center rounded-lg">
                <VueTailwindDatepicker i18n="es-mx" as-single no-input v-model="appointment.date" :formatter="formatter"
                    :disable-date="disableDate" />
            </div>

            <div v-if="appointment.isDateSelected" class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
                <button v-for="hour in appointment.hours"
                    class="block text-blue-500 rounded-lg text-xl font-black p-3 cursor-pointer"
                    :class="appointment.time === hour ? 'bg-blue-500 text-white' : 'bg-white'"
                    @click="appointment.time = hour">
                    {{ hour }}
                </button>
            </div>

        </div>
        <div class="flex justify-end" v-if="appointment.isValidReservation">
            <button
                class="w-full md:w-full-auto bg-blue-500 rounded-lg uppercase font-black text-white p-3 cursor-pointer"
                @click="appointment.createAppointment">
                Confirmar Reservación
            </button>
        </div>
    </div>
</template>
