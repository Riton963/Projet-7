<template>
  <section id="background-img">
    <div class="auth-modal" v-if="isDisabled">
      <img class="logo-groupomania" src="../assets/img/logo-black.png" alt="" />
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
      >
        <template #header>
          <h2>Inscription</h2>
        </template>
        <div class="register-form">
          <div>
            <InputText type="text" v-model="firstName" placeholder="Prénom" />
            <p v-if="errorRegisterMsg.errorMsgFisrtName">
              {{ errorRegisterMsg.errorMsgFisrtName }}
            </p>
          </div>
          <div>
            <InputText type="text" v-model="lastName" placeholder="Nom" />
            <p v-if="errorRegisterMsg.errorMsgLastName">
              {{ errorRegisterMsg.errorMsgLastName }}
            </p>
          </div>
          <div>
            <InputText type="text" v-model="login" placeholder="Email" />
            <p v-if="errorRegisterMsg.errorMsgEmail">
              {{ errorRegisterMsg.errorMsgEmail }}
            </p>
          </div>
          <div>
            <Password
              v-model="password"
              :feedback="false"
              placeholder="Mot de passe"
            />
            <p v-if="errorRegisterMsg.errorMsgPwd">
              {{ errorRegisterMsg.errorMsgPwd }}
            </p>
          </div>
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
import { ref, onMounted, computed } from '@vue/runtime-core';
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
            localStorage.setItem('token', res.data.token);
            router.push({ name: 'feed' });
          }
        })
        .catch((err) => {
          dispalayLoginMsg.value = true;
          loginMsg.value = err.response.data;
        });
    };
    const errorRegisterMsg = ref({
      errorMsgFisrtName: '',
      errorMsgLastName: '',
      errorMsgEmail: '',
      errorMsgPwd: '',
    });

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
    const validateEmail = () => {
      if (login.value) {
        return emailRegex.test(login.value);
      } else {
        return false;
      }
    };
     const validatePassword = () => {
      if (password.value) {
        return passwordRegex.test(password.value);
      } else {
        return false;
      }
    };

    const registerUser = () => {
      errorRegisterMsg.value.errorMsgFisrtName = '';
      errorRegisterMsg.value.errorMsgLastName = '';
      errorRegisterMsg.value.errorMsgEmail = '';
      errorRegisterMsg.value.errorMsgPwd = '';

      if (!firstName.value) {
        errorRegisterMsg.value.errorMsgFisrtName = 'Veuillez saisir un prénom';
      }

      if (!lastName.value) {
        errorRegisterMsg.value.errorMsgLastName = 'Veuillez saisir un nom';
      }

      if (!validateEmail()) {
        errorRegisterMsg.value.errorMsgEmail = 'Veuillez saisir un mail valide';
      }

      if (!validatePassword()) {
        errorRegisterMsg.value.errorMsgPwd = 'Veuillez saisir un mot de passe valide 8 caractères min (Ab1!#$%&?)';
      }

      if (
        !errorRegisterMsg.value.errorMsgFisrtName &&
        !errorRegisterMsg.value.errorMsgLastName &&
        !errorRegisterMsg.value.errorMsgEmail &&
        !errorRegisterMsg.value.errorMsgPwd
      ) {
        authServices
          .signUp(firstName.value, lastName.value, login.value, password.value)
          .then(() => {
            loginIn();
          })
          .catch((err) => {
            if (err.response.status === 400) {
              errorRegisterMsg.value.errorMsgEmail = 'Email déja utillisé';
            }
          });
      }
    };

    const handleRegisterUserModal = () => {
      login.value = '';
      password.value = '';
      showRegisterUserModal.value = !showRegisterUserModal.value;
    };

    onMounted(() => {
      if (localStorage.getItem('token')) {
        router.push({ name: 'feed' });
      }
    });

    return {
      isDisabled,
      firstName,
      lastName,
      login,
      password,
      dispalayLoginMsg,
      loginMsg,
      showRegisterUserModal,
      errorRegisterMsg,
      validateEmail,
      validatePassword,
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
  position: relative;
  .p-inputtext {
    margin-bottom: 25px;
  }
  .p-button {
    margin-bottom: 25px;
    background-color: #fd2d01;
    border: 1px solid #ffd7d7;
  }
  .logo-groupomania {
    height: auto;
    width: 250px;
    position: absolute;
    top: -40px;
  }
}

.register-form {
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin: 5px 0;
    }
  }
}
</style>
