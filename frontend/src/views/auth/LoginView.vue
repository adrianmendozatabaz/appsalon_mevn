<script setup>
import { inject } from 'vue';
import AuthAPI from '@/api/AuthAPI';

const toast = inject('toast');

const handleSubmit = async (formData) => {
    try {
        const { data: { token } } = await AuthAPI.login(formData);
        localStorage.setItem('AUTH_TOKEN', token);
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type: 'error'
        })
    }
}
</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar Sesión</h1>
    <p class="text-2xl text-white text-center my-5">Si tienes una cuenta, inicia sesión.</p>

    <FormKit id="loginForm" type="form" :actions="false"
        incomplete-message="No se puede enviar, revisa las notificaciones" @submit="handleSubmit">

        <FormKit type="email" name="email" label="Correo electrónico" placeholder="Ingresa tu correo"
            validation="required|email" :validation-messages="{
                required: 'El correo electrónico es obligatorio',
                email: 'El correo electrónico no es valido'
            }" />

        <FormKit type="password" name="password" label="Contraseña" placeholder="Ingresa tu contraseña"
            validation="required" :validation-messages="{
                required: 'La contraseña es obligatoria.',
            }" />

        <FormKit type="submit">Iniciar Sesión</FormKit>

    </FormKit>
</template>