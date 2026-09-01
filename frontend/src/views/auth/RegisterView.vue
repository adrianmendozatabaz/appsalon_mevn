<script setup>
import AuthApi from '../../api/AuthAPI';
import { reset } from '@formkit/vue';
import { inject } from 'vue';

const toast = inject('toast');

const handleSubmit = async ({ password_confirm, ...formData }) => {
    try {
        const { data } = await AuthApi.register(formData);

        toast.open({
            message: data.msg,
            type: 'success'
        })
        reset('registerForm');
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type: 'success'
        })
    }
}
</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crea una cuenta</h1>
    <p class="text-2xl text-white text-center my-5">Crea una cuenta en AppSalon</p>

    <FormKit id="registerForm" type="form" :actions="false"
        incomplete-message="No se puede enviar, revisa las notificaciones" @submit="handleSubmit">
        <FormKit type="text" name="name" label="Nombre" placeholder="Ingresa tu nombre" validation="required|length:3"
            :validation-messages="{
                required: 'El nombre es obligatorio',
                length: 'El nombre es muy corto'
            }" />

        <FormKit type="email" name="email" label="Correo electrónico" placeholder="Ingresa tu correo"
            validation="required|email" :validation-messages="{
                required: 'El correo electrónico es obligatorio',
                email: 'El correo electrónico no es valido'
            }" />

        <FormKit type="password" name="password" label="Contraseña" placeholder="Ingresa tu contraseña"
            validation="required|length:8" :validation-messages="{
                required: 'La contraseña es obligatoria',
                length: 'La contraseña debe tener al menos 8 caracteres'
            }" />

        <FormKit type="password" name="password_confirm" label="Repite la contraseña" placeholder="Repite tu contraseña"
            validation="required|confirm" :validation-messages="{
                required: 'La contraseña es obligatoria',
                confirm: 'Las contraseñas no son iguales'
            }" />

        <FormKit type="submit">Crear Cuenta</FormKit>

    </FormKit>
</template>