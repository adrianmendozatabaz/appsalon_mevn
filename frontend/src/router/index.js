import { createRouter, createWebHistory } from "vue-router";
import AppointmentsLayout from "@/views/appointments/AppointmentsLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: "",
    },
    {
      path: "/reservaciones",
      name: "appointments",
      component: AppointmentsLayout,
      children: [
        {
          path: "nueva",
          component: () =>
            import("../views/appointments/NewAppointmentLayout.vue"),
          children: [
            {
              path: "",
              name: "new-appointment",
              component: () => import("../views/appointments/ServicesView.vue"),
            },
            {
              path: "detalles",
              name: "appointment-details",
              component: () =>
                import("../views/appointments/AppointmentView.vue"),
            },
          ],
        },
      ],
    },
  ],
});

export default router;
