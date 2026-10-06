<script setup>
import { onMounted, inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import AuthAPI from '@/api/AuthAPI';

const toast = inject('toast');
const route = useRoute();
const { token } = route.params;
const validToken = ref(false);

onMounted(async () => {
    try {
        validToken.value = true;
        const { data } = await AuthAPI.verifyPasswordResetToken(token);

        console.log(validToken);
        
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type: 'error'
        })
    }
});

const handleSubmit = async({password}) => {
    console.log(password);
    
}

</script>

<template>
    <div v-if="validToken">
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
    </div>
    <p v-else class="text-2xl text-white text-center my-5 font-black">Token no válido o expirado.</p>
</template>