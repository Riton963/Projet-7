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
          <div
            v-if="!post.usersLiked.includes(userId)"
            class="like-button"
            @click="like(post)"
          >
            <span>J'aime</span>
          </div>

          <div v-else class="like-button" @click="unLike(post)">
            <span>Je n'aime plus</span>
          </div>
          <div class="like-count">
            <font-awesome-icon icon="fa-solid fa-thumbs-up" class="like" />
            <div>
              {{ post.usersLiked.length }}
            </div>
            <font-awesome-icon
              v-if="origin == 'profile'"
              icon="fa-solid fa-pencil"
              class="edit-button"
              size="2x"
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
    const userId = ref(authServices.getUserId());

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
      userId,
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
  align-items: center;
  justify-content: space-between;

  .like-button {
    height: 30px;
    background-color: #0080ff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 0 10px;
    margin-right: 10px;
    color: white;
    font-weight: 500;
    cursor: pointer;

    > span {
      margin-right: 5px;
    }
  }
  .like {
    color: #0080ff;
  }

  .like-count {
    display: flex;
    align-items: center;
    font-weight: bold;
    svg {
      margin-right: 5px;
    }
  }
}

.edit-button {
  cursor: pointer;
}

.p-card .p-card-body {
  padding: 0 !important;
}

.admin-button {
  display: flex;
  justify-content: flex-end;
}

.p-image-preview-container {
  width: 100%;
}
</style>
