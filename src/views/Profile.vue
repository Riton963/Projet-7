<template>
  <div>
    <NavBar />
    <div class="profile-header">
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
    </div>
    <div class="profile-content">
      <div class="left-side"></div>
      <div class="midle">
        <h2>posts</h2>
        <Posts
          :allPosts="allPosts"
          :userData="userData"
          :profileMode="profileMode"
          @editPost="handleEditPostModal"
        />
      </div>
      <div class="right-side"></div>
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
import { ref, onBeforeMount } from '@vue/runtime-core';
import postsServices from '../services/posts';
import authServices from '../services/auth';

export default {
  name: 'Profile',
  components: { NavBar, Posts, EditPostModal },
  setup() {
    const allPosts = ref();
    const profileMode = ref(true);
    const showEditPostModal = ref(false);
    const post = ref();
    const user = ref();
    const userData = ref();

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
    const fileProfileImage = ref('');
    const handleImportProfileImage = (data) => {
      fileProfileImage.value = data.target.files[0];
      urlProfileImage.value = URL.createObjectURL(fileProfileImage.value);
      authServices
        .addProfileImage(fileProfileImage.value)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };

    onBeforeMount(() => {
      postsServices
        .getPostsById()
        .then((res) => {
          allPosts.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      authServices
        .getUserById()
        .then((res) => {
          urlProfileImage.value = res.data.profileImgUrl;
          userData.value = res.data;
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
      profileMode,
      showEditPostModal,
      urlProfileImage,
      fileProfileImage,
      handleEditPostModal,
      handleImportProfileImage,
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
  background-image: url('../assets/img/profile-header.jpg');
  background-color: #ccc;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  height: 500px;
  width: 100%;
  display: flex;
  align-items: center;
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
