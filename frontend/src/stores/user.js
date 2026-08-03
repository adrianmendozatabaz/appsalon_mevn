import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import AuthAPI from "@/api/AuthAPI";

export const useUserStore = defineStore("user", () => {
  const user = ref({});

  onMounted(async () => {
    try {
      const { data } = await AuthAPI.auth();
      user.value = data;
    } catch (error) {
      console.log(error);
    }
  });

  const getUserName = computed(() =>
    user.value?.name ? user.value?.name : "",
  );

  return {
    user,
    getUserName,
  };
});
