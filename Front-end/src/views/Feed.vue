<template>
  <div>
    <NavBar />
    <h2>Fil d'actualités</h2>
    <div class="content">
      <div class="left-side">
        <Me :userData="userData" :origin="origin" />
      </div>
      <div class="midle">
        <AddPost
          @add-post="handleAddPost"
          :profileImgUrl="userData?.profileImgUrl"
        />
        <Posts
          :allPosts="allPosts"
          :origin="origin"
          @editPost="handleEditPostModal"
          :userData="userData"
        />
      </div>
      <div class="right-side"></div>
    </div>
    <EditPostModal
      :showEditPostModal="showEditPostModal"
      :post="post"
      @closeEditPostModal="handleEditPostModal"
    />
  </div>
</template>
<script>
import { ref, onBeforeMount, defineComponent } from '@vue/runtime-core';
import postsServices from '../services/posts';
import authServices from '../services/auth';

import NavBar from '../components/NavBar.vue';
import Posts from '../components/Posts.vue';
import AddPost from '../components/AddPost.vue';
import Me from '../components/Me.vue';
import EditPostModal from '../components/EditPostModal.vue';

export default defineComponent({
  name: 'Feed',
  components: { NavBar, Me, Posts, AddPost, EditPostModal },
  emits: ['addPost'],
  setup() {
    const origin = ref('feed');

    // Get user info and get all posts
    const allPosts = ref();
    const userData = ref();

    onBeforeMount(() => {
      authServices
        .getUserById(authServices.getUserId())
        .then((res) => {
          userData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      postsServices
        .getAllPosts()
        .then((res) => {
          allPosts.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const handleAddPost = () => {
      postsServices
        .getAllPosts()
        .then((res) => {
          allPosts.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // Edit admin modal
    const showEditPostModal = ref(false);
    const post = ref();

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

    return {
      handleAddPost,
      allPosts,
      origin,
      userData,
      showEditPostModal,
      post,
      handleEditPostModal,
      handleImportProfileImage,
    };
  },
});
</script>
<style lang="scss">
@import '../styles/main';
div {
  h2 {
    display: flex;
    justify-content: center;
    margin: 15px 0;
  }
}

@media (max-width: 1250px) {
  .left-side {
    width: 30%;
    .me-component {
      width: 25%;
    }
  }
  .midle {
    width: 65%;
  }
  .right-side {
    display: none;
  }
}
</style>
