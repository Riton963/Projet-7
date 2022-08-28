<template>
  <div>
    <NavBar />
    <div class="profile-header">
      <img src="../assets/img/profile-header.jpg" alt="" />
    </div>
    <div class="posts">
      <h2>posts</h2>
      <Posts
        :posts="posts"
        :profileMode="profileMode"
        @editPost="handleEditPostModal"
      />
    </div>
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
import { defineComponent, ref, onMounted } from '@vue/runtime-core';
import postsServices from '../services/posts';

export default {
  name: 'Profile',
  components: { NavBar, Posts, EditPostModal },
  setup() {
    const posts = ref();
    const profileMode = ref(true);
    const showEditPostModal = ref(false);
    const post = ref();

    const handleEditPostModal = (data) => {
      if (data) {
        console.log(data);
        post.value = data;
      }
      showEditPostModal.value = !showEditPostModal.value;
    };

    onMounted(() => {
      postsServices
        .getPostsById()
        .then((res) => {
          posts.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      post,
      posts,
      profileMode,
      showEditPostModal,
      handleEditPostModal,
    };
  },
};
</script>
<style lang="scss" scoped>
div {
  h2 {
    display: flex;
    justify-content: center;
  }
}

.profile-header {
  img {
    height: 500px;
    width: 100%;
    object-fit: cover;
  }
}
</style>
