<template>
  <div class="profile-header">
    <img
      v-if="props.userData?.coverImgUrl"
      :src="props.userData?.coverImgUrl"
      alt="cover-image"
      class="cover-image"
    />
    <div class="profile-image-container">
      <div class="profile-image">
        <label for="editProfileImage" class="label-file">
          <font-awesome-icon
            v-if="!props.userData?.profileImgUrl"
            icon="fa-solid fa-image"
          />
          <img
            v-if="props.userData?.profileImgUrl"
            :src="props.userData?.profileImgUrl"
            alt="profile-image"
          />
        </label>

        <input
          type="file"
          id="editProfileImage"
          class="input-file"
          accept="image/*"
          @change="handleImportProfileImage"
        />
      </div>
    </div>
    <div v-if="props?.origin == 'profile'" class="edit-cover-img">
      <label for="editCoverImage" class="label-file">
        <font-awesome-icon icon="fa-solid fa-image" size="2x" />
      </label>

      <input
        type="file"
        id="editCoverImage"
        class="input-file"
        accept="image/*"
        @change="handleImportCoverImage"
      />
    </div>
  </div>
</template>

<script>
import authServices from '../services/auth';
import { defineComponent, ref } from '@vue/runtime-core';

export default defineComponent({
  name: 'HeaderUser',
  components: {},
  props: {
    userData: Object,
    allPosts: Object,
    origin: String,
  },
  emits: ['updateCoverImage', 'updateProfileImage'],

  setup(props, { emit }) {
    const userData = ref();
    // profile image import
    const urlProfileImage = ref(props.userData?.urlProfileImage);
    const fileProfileImage = ref();
    const handleImportProfileImage = (data) => {
      fileProfileImage.value = data.target.files[0];
      urlProfileImage.value = URL.createObjectURL(fileProfileImage.value);
      emit('updateProfileImage', urlProfileImage.value);

      authServices
        .addProfileImage(fileProfileImage.value)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };

    // cover image import
    const urlCoverImage = ref();
    const fileCoverImage = ref();
    const handleImportCoverImage = (data) => {
      fileCoverImage.value = data.target.files[0];
      urlCoverImage.value = URL.createObjectURL(fileCoverImage.value);
      emit('updateCoverImage', urlCoverImage.value);
      authServices
        .addCoverImage(fileCoverImage.value)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };
    return {
      props,
      userData,
      urlProfileImage,
      fileProfileImage,
      urlCoverImage,
      fileCoverImage,
      handleImportProfileImage,
      handleImportCoverImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.profile-image {
  .label-file {
    height: 100%;
    font-size: 30px;
    cursor: pointer;
    color: #00b1ca;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 200px;
      height: 200px;
      object-fit: cover;
    }
  }
  .label-file:hover {
    color: #25a5c4;
  }
}
.input-file {
  display: none;
}

.profile-header {
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  .cover-image {
    width: 100%;
    height: 300px;
    position: absolute;
    z-index: -1;
    object-fit: cover;
  }
  .edit-cover-img {
    margin-top: 200px;
    display: flex;
    width: 100px;
    height: 100px;
    background-color: #fafbfc;
    border-top-left-radius: 100%;
    border-left: firebrick 3px solid;
    border-top: firebrick 3px solid;
    .label-file {
      cursor: pointer;
      margin: auto;
    }
    .label-file:hover {
      color: #25a5c4;
    }
  }
  .profile-image-container {
    width: 70%;
    margin: 0 auto;
    .profile-image {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      width: 200px;
      background-color: white;
      border-radius: 100%;
      border: firebrick 3px solid;
      overflow: hidden;
    }
  }
}
</style>
