<template>
  <div>
    <NavBar />
    <h2>Fil d'actualités</h2>
    <AddPost @add-post="handleAddPost" />
    <Posts :posts="posts" />
  </div>
</template>
<script>
import { ref, onMounted, defineComponent } from '@vue/runtime-core';
import postsServices from '../services/posts';
import NavBar from '../components/NavBar.vue';
import Posts from '../components/Posts.vue';
import AddPost from '../components/AddPost.vue';

export default defineComponent({
  name: 'Feed',
  components: { NavBar, Posts, AddPost },
  emits: ['addPost'],
  setup() {
    const posts = ref();
    onMounted(() => {
      postsServices
        .getAllPosts()
        .then((res) => {
          posts.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const handleAddPost = () => {
      postsServices
        .getAllPosts()
        .then((res) => {
          posts.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      handleAddPost,
      posts,
    };
  },
});
</script>
<style lang="scss" scoped>
div {
  h2 {
    display: flex;
    justify-content: center;
  }
}
</style>
