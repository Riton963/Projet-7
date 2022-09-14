<template>
  <div>
    <NavBar />
    <div class="profile-header">
      <img :src="urlCoverImage" alt="cover-image" class="cover-image" />
      <div class="profile-image-container">
        <div class="profile-image">
          <label for="editProfileImage" class="label-file">
            <font-awesome-icon
              v-if="!urlProfileImage"
              icon="fa-solid fa-image"
            />
            <img v-if="urlProfileImage" :src="urlProfileImage" alt="" />
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
      <div class="edit-cover-img">
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
    <h2>Mes posts</h2>
    <div class="profile-content">
      <div class="left-side"></div>
      <div class="midle">
        <Posts
          :allPosts="allPosts"
          :userData="userData"
          :origin="origin"
          @editPost="handleEditPostModal"
        />
      </div>
      <div class="right-side">
        <Me
          :userData="userData"
          :origin="origin"
          @editProfile="editProfile()"
        />
      </div>
    </div>
    <div class="profile-posts"></div>
    <EditPostModal
      :showEditPostModal="showEditPostModal"
      :post="post"
      @closeEditPostModal="handleEditPostModal"
    />
  </div>
</template>
<script>
import NavBar from '../components/NavBar.vue';
import EditPostModal from '../components/EditPostModal.vue';
import Posts from '../components/Posts.vue';
import Me from '../components/Me.vue';

import { ref, onBeforeMount } from '@vue/runtime-core';
import postsServices from '../services/posts';
import authServices from '../services/auth';

export default {
  name: 'Profile',
  components: { NavBar, Posts, EditPostModal, Me },
  setup() {
    const allPosts = ref();
    const showEditPostModal = ref(false);
    const post = ref();
    const user = ref();
    const userData = ref();
    const origin = ref('profile');

    const handleEditPostModal = (data) => {
      if (data) {
        post.value = data;
      }
      postsServices
        .getPostsById()
        .then((res) => {
          allPosts.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      showEditPostModal.value = !showEditPostModal.value;
    };

    const urlProfileImage = ref();
    const fileProfileImage = ref();
    const handleImportProfileImage = (data) => {
      fileProfileImage.value = data.target.files[0];
      urlProfileImage.value = URL.createObjectURL(fileProfileImage.value);
      userData.value.profileImgUrl = urlProfileImage.value;
      authServices
        .addProfileImage(fileProfileImage.value)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };

    const urlCoverImage = ref();
    const fileCoverImage = ref();
    const handleImportCoverImage = (data) => {
      console.log('tests');
      fileCoverImage.value = data.target.files[0];
      urlCoverImage.value = URL.createObjectURL(fileCoverImage.value);
      userData.value.coverImgUrl = urlCoverImage.value;
      authServices
        .addCoverImage(fileCoverImage.value)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };

    const editProfile = () => {
      authServices
        .updateUserProfile(userData.value)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };

    onBeforeMount(() => {
      authServices
        .getUserById()
        .then((res) => {
          urlProfileImage.value = res.data.profileImgUrl;
          urlCoverImage.value = res.data.coverImgUrl;
          userData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      postsServices
        .getPostsById()
        .then((res) => {
          allPosts.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      post,
      user,
      allPosts,
      userData,
      origin,
      showEditPostModal,
      urlProfileImage,
      fileProfileImage,
      urlCoverImage,
      fileCoverImage,
      handleEditPostModal,
      handleImportProfileImage,
      handleImportCoverImage,
      editProfile,
    };
  },
};
</script>
<style lang="scss" scoped>
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

.input-file {
  display: none;
}

.profile-header {
  height: 500px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  .cover-image {
    width: 100%;
    height: 500px;
    position: absolute;
    z-index: -1;
    object-fit: cover;
  }
  .edit-cover-img {
    margin-top: 400px;
    display: flex;
    width: 100px;
    height: 100px;
    background-color: #fafbfc;
    border-top-left-radius: 100%;
    svg {
      margin: auto;
      cursor: pointer;
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
      overflow: hidden;
    }
  }
}

.profile-content {
  width: 100%;
  display: flex;
}
</style>
