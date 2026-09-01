<script setup>

</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Olvide mi contraseña</h1>
    <p class="text-2xl text-white text-center my-5">Ingresa tu correo electrónico para restablecer tu contraseña.</p>

    <FormKit id="loginForm" type="form" :actions="false"
        incomplete-message="No se puede enviar, revisa las notificaciones" @submit="handleSubmit">

        <FormKit type="email" name="email" label="Correo electrónico" placeholder="Ingresa tu correo"
            validation="required|email" :validation-messages="{
                required: 'El correo electrónico es obligatorio',
                email: 'El correo electrónico no es valido'
            }" />

        <FormKit type="submit">Enviar instrucciones</FormKit>

    </FormKit>
</template>
