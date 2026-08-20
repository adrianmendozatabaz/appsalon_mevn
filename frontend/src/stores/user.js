import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import AuthAPI from "@/api/AuthAPI";
import AppointmentApi from "@/api/AppointmentApi";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const user = ref({});
  const userAppointments = ref([]);

  onMounted(async () => {
    try {
      const { data } = await AuthAPI.auth();
      user.value = data;

      await getUserAppointments();
    } catch (error) {
      console.log(error);
    }
  });

  async function getUserAppointments() {
    const { data } = await AppointmentApi.getUserAppointments(user.value._id);
    userAppointments.value = data;
  }

  function logout() {
    localStorage.removeItem("AUTH_TOKEN");
    user.value = {};
    router.push({ name: "login" });
  }

  const getUserName = computed(() =>
    user.value?.name ? user.value?.name : "",
  );

  const noAppointments = computed(() => userAppointments.value.length === 0);

  return {
    user,
    getUserName,
    userAppointments,
    noAppointments,
    logout,
  };
});
