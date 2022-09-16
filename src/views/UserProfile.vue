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
    <h2>Posts de {{ userData.firstName }}</h2>
    <div class="content">
      <div class="left-side"></div>
      <div class="midle">
        <Posts :allPosts="allPosts" :userData="userData" :origin="origin" />
      </div>
      <div class="right-side"></div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, defineComponent } from '@vue/runtime-core';
import HeaderUser from '../components/HeaderUser.vue';

import NavBar from '../components/NavBar.vue';
import Posts from '../components/Posts.vue';

import postsServices from '../services/posts';
import authServices from '../services/auth';

export default {
  name: 'UserProfile',
  components: {
    NavBar,
    HeaderUser,
    Posts,
  },

  setup(props) {
    const origin = ref('userProfile');
    const userData = ref();
    const allPosts = ref();

    onBeforeMount(() => {
      let url = new URL(document.location.href);
      let userId = url.searchParams.get('userId');
      authServices
        .getUserById(userId)
        .then((res) => {
          userData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      postsServices
        .getPostsById(userId)
        .then((res) => {
          allPosts.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      origin,
      userData,
      allPosts,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/main';
</style>
