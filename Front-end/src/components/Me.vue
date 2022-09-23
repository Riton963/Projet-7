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
      <div v-if="origin == 'feed'" class="follow-info">
        <div>
          <p>
            Following
          </p>
          <p class="nb-follow">
           {{ props.userData?.userFollowed.length }}
          </p>
        </div>
        <div>
          <p>
            Followers
          </p>
          <p class="nb-follow">
           {{ props.userData?.followers.length }}
          </p>
        </div>
      </div>
      <div v-if="origin == 'userProfile'" class="user-profile-info">
        <div class="follow-button">
          <Button v-if="!showFollowButton" label="Suivre" @click="followUser()"></Button>
          <Button v-else label="Ne plus suivre" @click="unfollowUser()"></Button>
        </div>
        <div class="follow-info">
         <div>
           <p>
             Followers
           </p>
           <p class="nb-follow">
            {{ followers.length }}
           </p>
         </div>
        </div>
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
import { ref, onBeforeMount, computed } from '@vue/runtime-core';
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
  

    // Only in Profile page // modal edition profile

    const showEditProfileUserModal = ref(false);
    const handleEditProfileModal = () => {
      showEditProfileUserModal.value = !showEditProfileUserModal.value;
    };
    const editProfile = () => {
      emit('editProfile');
      handleEditProfileModal();
    };

    // Only in UserProfile Page // follow unfollow user

    const followers = ref([]);
    const showFollowButton = computed(() =>{
      return followers.value.includes(authServices.getUserId())
    });
    const followUser = () => {
      followers.value.push(authServices.getUserId());
      let follow = {
        userId: userId,
        follow: 1,
        ownerId: authServices.getUserId(),
      };
      authServices
        .followUser(follow)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };

    const unfollowUser = () => {
      let follow = {
        userId: userId,
        follow: 0,
        ownerId: authServices.getUserId(),
      };
      followers.value = followers.value.filter(
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
          .getUserById(userId)
          .then((res) => {
            followers.value = res.data.followers;
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
      followers,
      showFollowButton,
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
    height: 270px;
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
    .user-profile-info {
      width: 100%;
     height: 100%;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     .follow-button {
      margin-top: 25px
     }
    }
    .follow-info {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: end;
      width: 100%;
      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-top: 1px solid lightgray;
        height: 65px;
        > p {
          margin: 0;
        }
        > .nb-follow {
          font-weight: 900;
        }
      }
    }
  }
}
</style>
