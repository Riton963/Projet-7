<template>
  <div class="auth-modal" v-if="isDisabled">
    <h2>Inscription</h2>

    <InputText type="text" v-model="login" placeholder="Email" />
    <InputText type="text" v-model="password" placeholder="Mot de passe" />

    <Button label="Submit" class="p-button-raised" @click="signUp()" />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/runtime-core';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
export default defineComponent({
  name: 'authModal',
  components: {
    InputText,
    Button,
  },
  props: {},
  setup() {
    const isDisabled = true;
    const login = ref('');
    const password = ref('');

    return {
      isDisabled,
      login,
      password,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.auth-modal {
  height: 620px;
  width: 820px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .p-inputtext {
    margin-bottom: 25px;
  }
}
</style>
