<template class="post-content">
  <div class="post-content">
    <Card v-for="post in allPosts" class="post-item" :key="post.id">
      <template #header v-if="post.imageUrl">
        <div class="post-image">
          <Image :src="post.imageUrl" alt="Image" preview />
        </div>
      </template>
      <template #title>
        <div class="post-title-content">
          <div v-if="post.user.profileImgUrl" class="post-profile-img">
            <img :src="post.user.profileImgUrl" alt="" />
          </div>
          <div
            @click="handleProfileUserPage(post.user._id)"
            class="post-user-name"
          >
            {{ post.user.firstName }}
            {{ post.user.lastName }}
          </div>
        </div>
        <div
          v-if="props.userData?.role == 'admin' && props.origin == 'feed'"
          class="admin-button"
          @click="editPost(post)"
        >
          <font-awesome-icon icon="fa-sharp fa-solid fa-gear" />
        </div>
      </template>
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
              icon="fa-solid fa-pencil"
              size="2x"
              v-if="origin == 'profile'"
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
import { useRouter } from 'vue-router';

import Card from 'primevue/card';
export default defineComponent({
  name: 'Posts',
  components: { Card, Button, Image },
  props: {
    allPosts: Object,
    userData: Object,
    origin: String,
  },
  emits: ['editPost'],

  setup(props, { emit }) {
    const router = useRouter();
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

    const handleProfileUserPage = (userId) => {
      router.push({
        name: 'userProfile',
        params: { userId: userId },
      });
    };

    return {
      props,
      router,
      like,
      unLike,
      editPost,
      getUserLike,
      alreadyLiked,
      handleProfileUserPage,
    };
  },
});
</script>
<style lang="scss" scoped>
.post-user-name {
  cursor: pointer;
}
.post-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .post-item {
    margin-bottom: 25px;
    width: 100%;
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
  max-height: 380px;
  width: 100%;
  overflow: hidden;
}
.post-title-content {
  display: flex;
  align-items: center;
  .post-profile-img {
    height: 80px;
    width: 80px;
    overflow: hidden;
    border-radius: 100%;
    margin-right: 25px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}

.footer-post {
  display: flex;
  justify-content: space-between;
}

.p-card .p-card-body {
  padding: 0 !important;
}

.admin-button {
  display: flex;
  justify-content: flex-end;
}

svg {
  cursor: pointer;
}

.p-image-preview-container {
  width: 100%;
}
</style>
