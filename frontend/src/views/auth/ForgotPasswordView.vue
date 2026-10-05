<script setup>
import { inject } from 'vue';
import { reset } from '@formkit/vue';
import AuthAPI from '@/api/AuthAPI';

const toast = inject('toast');

const handleSubmit = async ({ email }) => {
    try {
        const { data } = await AuthAPI.forgotPassword({ email });

        toast.open({
            message: data.msg,
            type: 'success',
        })

        reset('forgotPassword');
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type: 'error',
        })
    }
}
</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Olvide mi contraseña</h1>
    <p class="text-2xl text-white text-center my-5">Ingresa tu correo electrónico para restablecer tu contraseña.</p>

    <FormKit id="forgotPassword" type="form" :actions="false"
        incomplete-message="No se puede enviar, revisa las notificaciones" @submit="handleSubmit">

        <FormKit type="email" name="email" label="Correo electrónico" placeholder="Ingresa tu correo"
            validation="required|email" :validation-messages="{
                required: 'El correo electrónico es obligatorio',
                email: 'El correo electrónico no es valido'
            }" />

        <FormKit type="submit">Enviar instrucciones</FormKit>

    </FormKit>
</template>
