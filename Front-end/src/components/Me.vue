<template>
  <div class="me-component">
    <header>
      <div v-if="userData?.profileImgUrl" class="me-profile-img">
        <img :src="userData?.profileImgUrl" alt="" />
      </div>
    </header>
    <div class="me-content">
      <div class="name">
        {{ props.userData?.firstName }}
        {{ props.userData?.lastName }}
      </div>
      <div class="job">{{ userData?.job }}</div>
      <div class="edit-profile" v-if="origin == 'profile'">
        <font-awesome-icon
          icon="fa-solid fa-user-pen"
          size="3x"
          @click="handleEditProfileModal()"
        />
      </div>
      {{ userFollowed }}
      <div v-if="origin == 'userProfile'" class="follow-button">
        <Button label="Suivre" @click="followUser()"></Button>
        <Button label="Ne plus suivre" @click="unfollowUser()"></Button>
      </div>
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
import { ref, onBeforeMount } from '@vue/runtime-core';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import authServices from '../services/auth';

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
    let url = new URL(document.location.href);
    let userId = url.searchParams.get('userId');
    const userFollowed = ref([]);

    // modal edition profile
    const showEditProfileUserModal = ref(false);
    const handleEditProfileModal = () => {
      showEditProfileUserModal.value = !showEditProfileUserModal.value;
    };
    const editProfile = () => {
      emit('editProfile');
      handleEditProfileModal();
    };

    const followUser = () => {
      userFollowed.value.push(userId);
      let follow = {
        userId: userId,
        follow: 1,
      };
      authServices
        .followUser(follow)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };

    // Only in UserProfile Page
    const unfollowUser = () => {
      let follow = {
        userId: userId,
        follow: 0,
      };
      userFollowed.value = userFollowed.value.filter(
        (id) => id !== authServices.getUserId()
      );
      authServices
        .followUser(follow)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };

    onBeforeMount(() => {
      if (props.origin == 'userProfile') {
        authServices
          .getUserById(authServices.getUserId())
          .then((res) => {
            userFollowed.value = res.data.userFollowed;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    return {
      props,
      handleEditProfileModal,
      editProfile,
      followUser,
      unfollowUser,
      userFollowed,
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
  .me-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .name {
      margin: 60px auto 0 auto;
      font-size: 20px;
    }
    .job {
      color: grey;
      font-size: 16px;
    }
    .edit-profile {
      margin: 25px 0;

      svg {
        cursor: pointer;
      }
    }
    .follow-button {
      margin: 25px 0;
    }
  }
}
</style>
