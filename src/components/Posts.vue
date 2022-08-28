<template class="post-content">
  <div class="post-content">
    <Card v-for="post in posts" class="post-item" :key="post.id">
      <template #header v-if="post.imageUrl">
        <div class="post-image">
          <img :src="post.imageUrl" />
        </div>
      </template>
      <template #title> John Doe </template>
      <template #content>
        {{ post.description }}
      </template>
      <template #footer>
        <div class="footer-post">
          <div>
            <font-awesome-icon
              icon="fa-solid fa-thumbs-up"
              size="2x"
              @click.once="like(post)"
            />{{ post.likes }}
          </div>
          <div>
            <font-awesome-icon icon="fa-regular fa-message" size="2x" />
            <font-awesome-icon
              icon="fa-solid fa-gear"
              v-if="profileMode"
              @click="editPost(post)"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
<script>
import { defineComponent, ref } from '@vue/runtime-core';
import Button from 'primevue/button';
import Image from 'primevue/image';
import postsServices from '../services/posts';

import Card from 'primevue/card';
export default defineComponent({
  name: 'Posts',
  components: { Card, Button, Image },
  props: {
    posts: Object,
    profileMode: Boolean,
  },
  emits: ['editPost'],

  setup(props, { emit }) {
    props.posts;

    const like = (post) => {
      const like = { like: 1, id: post._id, userId: null };

      postsServices
        .likePost(like)
        .then((res) => {
          post.likes++;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const editPost = (post) => {
      emit('editPost', post);
    };

    return {
      like,
      editPost,
    };
  },
});
</script>
<style lang="scss" scoped>
.post-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .post-item {
    width: 70%;
    margin: 35px 0;
  }
}

img {
  height: 250px;
  object-fit: contain;
}

.footer-post {
  display: flex;
  justify-content: space-between;
  svg {
    margin: 0 15px;
  }
}
</style>
