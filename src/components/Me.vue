<template>
  <div class="me-component">
    <header>
      <div v-if="userData?.profileImgUrl" class="me-profile-img">
        <img :src="userData?.profileImgUrl" alt="" />
      </div>
    </header>
    <div class="me-name">
      {{ userData?.firstName }}
      {{ userData?.lastName }}
    </div>
    <div class="me-job">{{ userData?.job }}</div>
    <div class="edit-profile" v-if="origin == 'profile'">
      <font-awesome-icon
        icon="fa-solid fa-user-pen"
        size="3x"
        @click="handleEditProfileModal()"
      />
    </div>

    <Dialog
      :visible="showEditProfileUserModal"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
      :closable="false"
      class="register-user-modal"
    >
      <template #header>
        <h2>Gérer mon profile</h2>
      </template>
      <div></div>
      <div>
        <InputText
          type="text"
          v-model="props.userData.firstName"
          placeholder="Prénom"
        />
      </div>
      <div>
        <InputText
          type="text"
          v-model="props.userData.lastName"
          placeholder="Nom"
        />
      </div>
      <div>
        <InputText
          type="text"
          v-model="props.userData.job"
          placeholder="Poste occupé"
        />
      </div>

      <template #footer>
        <Button
          label="Annuler"
          class="p-button-raised"
          @click="handleEditProfileModal()"
        />
        <Button
          label="Editer mon profile"
          class="p-button-raised"
          @click="editProfile()"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { onBeforeMount, ref } from '@vue/runtime-core';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
export default {
  name: 'Me',
  components: {
    InputText,
    Button,
  },
  props: {
    userData: Object,
    origin: String,
  },
  emits: ['editProfile'],

  setup(props, { emit }) {
    props.userData;
    // modal edition profile
    const showEditProfileUserModal = ref(false);
    const handleEditProfileModal = () => {
      showEditProfileUserModal.value = !showEditProfileUserModal.value;
    };
    const editProfile = () => {
      emit('editProfile');
      handleEditProfileModal();
    };

    return {
      props,
      handleEditProfileModal,
      editProfile,
      showEditProfileUserModal,
    };
  },
};
</script>

<style scoped lang="scss">
.me-component {
  height: 350px;
  width: 250px;
  margin: 0 45px;
  background-color: white;
  position: fixed;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  border-radius: 4px;
  header {
    height: 80px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    background-color: firebrick;
    .me-profile-img {
      height: 100px;
      width: 100px;
      background-color: white;
      position: relative;
      bottom: -30px;
      left: 75px;
      border-radius: 100%;
      border: 3px solid firebrick;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
  .me-name {
    margin: 60px auto 0 auto;
    display: flex;
    justify-content: center;
    font-size: 20px;
  }
  .me-job {
    display: flex;
    justify-content: center;
    color: grey;
    font-size: 16px;
  }
  .edit-profile {
    margin: 25px 0;
    display: flex;
    justify-content: center;
    svg {
      cursor: pointer;
    }
  }
}
</style>
