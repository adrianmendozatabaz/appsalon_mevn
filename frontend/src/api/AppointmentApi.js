import api from "@/lib/axios";

export default {
  create(data) {
    return api.post("/appointments", data);
  },
  getByDate(date) {
    return api.post(`/appointments?date=${date}`);
  },
};
