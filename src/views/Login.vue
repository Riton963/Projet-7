<template>
  <section id="background-img">
    <div class="auth-modal" v-if="isDisabled">
      <h2>Connexion</h2>
      <InputText type="text" v-model="login" placeholder="Email" />
      <Password
        v-model="password"
        :feedback="false"
        placeholder="Mot de passe"
      />
      <div v-if="dispalayLoginMsg">{{ loginMsg.message }}</div>
      <Button label="Connexion" class="p-button-raised" @click="loginIn()" />

      <p>Pas encore inscrit ?</p>
      <Button label="Créer un compte" @click="handleRegisterUserModal"></Button>
    </div>
    <div class="register-modal">
      <Dialog
        :visible="showRegisterUserModal"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }"
        :modal="true"
        :closable="false"
        class="register-user-modal"
      >
        <template #header>
          <h2>Inscription</h2>
        </template>
        <div>
          <InputText type="text" v-model="firstName" placeholder="Prénom" />
        </div>
        <div>
          <InputText type="text" v-model="lastName" placeholder="Nom" />
        </div>
        <div>
          <InputText type="text" v-model="login" placeholder="Email" />
        </div>
        <div>
          <InputText
            type="text"
            v-model="password"
            placeholder="Mot de passe"
          />
        </div>

        <template #footer>
          <Button
            label="Annuler"
            class="p-button-raised"
            @click="handleRegisterUserModal()"
          />
          <Button
            label="M'inscrire"
            class="p-button-raised"
            @click="registerUser()"
          />
        </template>
      </Dialog>
    </div>
  </section>
</template>

<script>
import { ref } from '@vue/runtime-core';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import authServices from '../services/auth';

export default {
  name: 'Login',
  components: {
    InputText,
    Button,
    Password,
    Dialog,
  },
  setup() {
    const isDisabled = true;
    const firstName = ref('');
    const lastName = ref('');
    const login = ref('');
    const password = ref('');
    const router = useRouter();
    const dispalayLoginMsg = ref(false);
    const loginMsg = ref({});
    const showRegisterUserModal = ref(false);

    const loginIn = () => {
      authServices
        .login(login.value, password.value)
        .then((res) => {
          if (res.status === 200) {
            const token = {
              token: res.data.token,
              userId: res.data.userId,
            };
            localStorage.setItem('token', JSON.stringify(token));
            router.push({ name: 'feed' });
          }
        })
        .catch((err) => {
          dispalayLoginMsg.value = true;
          loginMsg.value = err.response.data;
        });
    };
    const registerUser = () => {
      authServices
        .signUp(firstName.value, lastName.value, login.value, password.value)
        .then((res) => {
          loginIn();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const handleRegisterUserModal = () => {
      showRegisterUserModal.value = !showRegisterUserModal.value;
    };

    return {
      isDisabled,
      firstName,
      lastName,
      login,
      password,
      dispalayLoginMsg,
      loginMsg,
      showRegisterUserModal,
      handleRegisterUserModal,
      loginIn,
      registerUser,
    };
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

.register-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .p-inputtext {
    margin-bottom: 25px;
  }
  .p-button {
    margin-bottom: 25px;
    background-color: #fd2d01;
    border: 1px solid #ffd7d7;
  }
}
.p-dialog-header {
  border-bottom: none !important;
  display: flex;
  justify-content: center;
}
.p-dialog-content {
  div {
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
  }
}
.p-dialog-footer {
  border-top: none !important;
  display: flex;
  justify-content: center;
}

#background-img {
  background-image: url('./../assets/img/background.jpg');
  height: 100vh;
  width: 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

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
  .p-button {
    margin-bottom: 25px;
    background-color: #fd2d01;
    border: 1px solid #ffd7d7;
  }
}
</style>
