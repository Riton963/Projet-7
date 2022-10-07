<template>
  <div>
    <NavBar />
    <HeaderUser
      :allPosts="allPosts"
      :userData="userData"
      :origin="origin"
      @updateCoverImage="updateCoverImage"
      @updateProfileImage="updateProfileImage"
    />
    <h2>Mes posts</h2>
    <div class="content">
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
      @updatePost="updatePost"
      @deletePost="deletePost"
      />
  </div>
</template>
<script>
import NavBar from '../components/NavBar.vue';
import EditPostModal from '../components/EditPostModal.vue';
import HeaderUser from '../components/HeaderUser.vue';
import Posts from '../components/Posts.vue';
import Me from '../components/Me.vue';
import { ref, onBeforeMount, defineComponent } from '@vue/runtime-core';
import postsServices from '../services/posts';
import authServices from '../services/auth';

export default defineComponent({
  name: 'Profile',
  components: { NavBar, Posts, EditPostModal, Me, HeaderUser },
  setup() {
    const userId = ref(authServices.getUserId());
    const allPosts = ref();
    const post = ref();
    const user = ref();
    const userData = ref();
    const origin = ref('profile');



    // edit post modal
    const showEditPostModal = ref(false);

     const handleEditPostModal = (postSelected) => {
      showEditPostModal.value = !showEditPostModal.value;
      if (postSelected) {
        post.value = postSelected;
      }
    };

    const updatePost = () => {
      postsServices
        .getPostsById(userId.value)
        .then((res) => {
          allPosts.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const deletePost = () => {
      console.log('here');
      postsServices
        .getPostsById(userId.value)
        .then((res) => {
          allPosts.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const editProfile = () => {
      authServices
        .updateUserProfile(userData.value)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };


    const updateCoverImage = (data) => {
      userData.value.coverImgUrl = data;
    };

    const updateProfileImage = (data) => {
      userData.value.profileImgUrl = data;
    };

    onBeforeMount(() => {
      authServices
        .getUserById(userId.value)
        .then((res) => {
          userData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      postsServices
        .getPostsById(userId.value)
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
      userId,
      allPosts,
      userData,
      origin,
      showEditPostModal,
      handleEditPostModal,
      deletePost,
      updatePost,
      editProfile,
      updateCoverImage,
      updateProfileImage,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '../styles/main';
@media (max-width: 1250px) {
  .right-side {
    width: 30%;
    .me-component {
      width: 25%;
    }
  }
  .midle {
    width: 65%;
    margin-left: 5%;
  }
  .left-side {
    display: none;
  }
}
</style>
