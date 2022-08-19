<template>
  <div>
    <NavBar />
    <h2>Fil d'actualités</h2>
    <AddPost />
    <Posts />
  </div>
</template>
<script>
import { ref } from '@vue/runtime-core';
import NavBar from '../components/NavBar.vue';
import Posts from '../components/Posts.vue';
import AddPost from '../components/AddPost.vue';

export default {
  name: 'Feed',
  components: { NavBar, Posts, AddPost },
  setup() {},
};
</script>
<style lang="scss" scoped>
div {
  h2 {
    display: flex;
    justify-content: center;
  }
}
</style>
