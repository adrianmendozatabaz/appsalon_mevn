import { defineStore } from "pinia";
import { computed, inject, onMounted, ref, watch } from "vue";
import { convertToISO, convertToDDMMYYYY } from "@/helpers/date";
import AppointmentApi from "@/api/AppointmentApi";
import { useRouter } from "vue-router";
import { useUserStore } from "./user";

export const useAppointmentsStore = defineStore("appointments", () => {
  const appointmentId = ref("");
  const services = ref([]);
  const date = ref("");
  const hours = ref([]);
  const time = ref("");
  const toast = inject("toast");
  const router = useRouter();
  const appointmentsByDate = ref([]);
  const user = useUserStore();

  onMounted(() => {
    const startHour = 10;
    const endHour = 19;
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ":00");
    }
  });

  watch(date, async () => {
    if (date.value === "") return;
    time.value = "";

    const { data } = await AppointmentApi.getByDate(date.value);

    if (appointmentId.value) {
      appointmentsByDate.value = data.filter(
        (appointment) => appointment._id !== appointmentId.value,
      );

      time.value = data.filter(
        (appointment) => appointment._id === appointmentId.value,
      )[0].time;
    } else {
      appointmentsByDate.value = data;
    }
  });

  function setSelectedAppointment(appointment) {
    services.value = appointment.services;
    date.value = convertToDDMMYYYY(appointment.date);
    time.value = appointment.time;
    appointmentId.value = appointment._id;
  }

  function onServiceSelected(service) {
    if (
      services.value.some(
        (selectedService) => selectedService._id === service._id,
      )
    ) {
      services.value = services.value.filter(
        (selectedService) => selectedService._id !== service._id,
      );
    } else {
      if (services.value.length === 2) {
        alert("Máximo 2 servicios por cita.");
        return;
      }
      services.value.push(service);
    }
  }

  async function createAppointment() {
    const appointment = {
      services: services.value.map((s) => s._id),
      date: convertToISO(date.value),
      time: time.value,
      totalAmount: totalAmount.value,
    };

    if (appointmentId.value) {
      try {
        const { data } = await AppointmentApi.update(
          appointmentId.value,
          appointment,
        );

        toast.open({
          message: data.msg,
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await AppointmentApi.create(appointment);

        toast.open({
          message: data.msg,
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    }

    clearAppointmentData();
    user.getUserAppointments();
    router.push({ name: "my-appointments" });
  }

  function clearAppointmentData() {
    appointmentId.value = "";
    services.value = [];
    date.value = "";
    time.value = "";
  }

  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id);
  });

  const noServicesSelected = computed(() => services.value.length === 0);

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0);
  });

  const isValidReservation = computed(() => {
    return services.value.length && date.value.length && time.value.length;
  });

  const isDateSelected = computed(() => {
    return date.value ? true : false;
  });

  const disableTime = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find(
        (appointment) => appointment.time === hour,
      );
    };
  });

  return {
    onServiceSelected,
    createAppointment,
    setSelectedAppointment,
    isServiceSelected,
    services,
    noServicesSelected,
    totalAmount,
    date,
    hours,
    time,
    isValidReservation,
    isDateSelected,
    disableTime,
  };
});
