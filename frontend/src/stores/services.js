import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import ServicesApi from "@/api/ServicesApi";

export const useServicesStore = defineStore("services", () => {
  onMounted(async () => {
    try {
      const { data } = await ServicesApi.all();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
  return {};
});
