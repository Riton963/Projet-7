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
    <h2>Posts de {{ userData?.firstName }}</h2>
    <div class="content">
      <div class="left-side"></div>
      <div class="midle">
        <Posts :allPosts="allPosts" :userData="userData" :origin="origin" />
      </div>
      <div class="right-side">
        <Me :userData="userData" :origin="origin" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from '@vue/runtime-core';
import HeaderUser from '../components/HeaderUser.vue';

import NavBar from '../components/NavBar.vue';
import Posts from '../components/Posts.vue';
import Me from '../components/Me.vue';

import postsServices from '../services/posts';
import authServices from '../services/auth';
import { useRoute } from 'vue-router';

export default {
  name: 'UserProfile',
  components: {
    NavBar,
    HeaderUser,
    Posts,
    Me,
  },

  setup(props) {
    const origin = ref('userProfile');
    const userData = ref();
    const userFollowed = ref();
    const allPosts = ref();
    const router = useRoute();
    let userId = router.params.userId;

    onBeforeMount(() => {
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
      userFollowed,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/main';
</style>
