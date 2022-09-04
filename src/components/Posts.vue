<template class="post-content">
  <div class="post-content">
    <pre></pre>
    <Card v-for="post in allPosts" class="post-item" :key="post.id">
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
              v-if="getUserLike(post.usersLiked)"
              icon="fa-solid fa-thumbs-up"
              size="2x"
              class="unlike"
              @click="unLike(post)"
            />
            <font-awesome-icon
              v-if="!getUserLike(post.usersLiked)"
              icon="fa-solid fa-thumbs-up"
              size="2x"
              class="like"
              @click="like(post)"
            />{{ post.usersLiked.length }}
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
import authServices from '../services/auth';

import Card from 'primevue/card';
export default defineComponent({
  name: 'Posts',
  components: { Card, Button, Image },
  props: {
    allPosts: Object,
    profileMode: Boolean,
  },
  emits: ['editPost'],

  setup(props, { emit }) {
    props.allPosts;
    console.log(authServices.getUserId());

    const alreadyLiked = ref(true);

    const getUserLike = (usersLiked) => {
      return usersLiked.includes(authServices.getUserId());
    };

    const like = (post) => {
      const like = { like: 1, id: post._id };

      postsServices
        .likePost(like)
        .then((res) => {
          post.usersLiked.push(authServices.getUserId());
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const unLike = (post) => {
      const like = { like: -1, id: post._id };

      postsServices
        .likePost(like)
        .then((res) => {
          post.usersLiked = post.usersLiked.filter(
            (userId) => userId !== authServices.getUserId()
          );
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
      unLike,
      editPost,
      alreadyLiked,
      getUserLike,
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
    width: 50%;
    margin: 35px 0;
  }
}
.unlike {
  color: red;
  cursor: pointer;
}

.like {
  color: blue;
  cursor: pointer;
}

.post-image {
  height: 280px;
  overflow: hidden;
}
img {
  width: 100%;
  object-fit: contain;
  position: relative;
  top: -100px;
}

.footer-post {
  display: flex;
  justify-content: space-between;
  svg {
    margin: 0 15px;
  }
}
</style>
