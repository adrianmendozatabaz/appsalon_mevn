<script setup>

</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Nueva Contraseña</h1>
    <p class="text-2xl text-white text-center my-5">Ingresa tu nueva contraseña.</p>

    <FormKit id="newPassword" type="form" :actions="false"
        incomplete-message="No se puede enviar, revisa las notificaciones" @submit="handleSubmit">

        <FormKit type="password" name="password" label="Contraseña" placeholder="Ingresa tu contraseña"
            validation="required|length:8" :validation-messages="{
                required: 'La contraseña es obligatoria',
                length: 'La contraseña debe tener al menos 8 caracteres'
            }" />

        <FormKit type="submit">Guardar nueva contraseña</FormKit>

    </FormKit>
</template>