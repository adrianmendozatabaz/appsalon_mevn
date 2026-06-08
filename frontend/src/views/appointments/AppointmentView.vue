<script setup>
import VueTailwindDatepicker from 'vue-tailwind-datepicker';
import SelectedService from '@/components/SelectedService.vue';
import { formatCurrency } from '@/helpers';
import { useAppointmentsStore } from '@/stores/appointments';

const appointment = useAppointmentsStore();

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
            <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
                <VueTailwindDatepicker i18n="es-mx" as-single no-input />
            </div>

            <div>
            </div>
        </div>
    </div>

</template>
