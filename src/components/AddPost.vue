<template>
  <div class="container">
    <Card class="post-item">
      <template #content>
        <div class="add-post-card-content">
          <div class="profile-image">
            <font-awesome-icon icon="fa-solid fa-question" />
          </div>
          <div>
            <Button label="Ajouter un post" @click="handleAddPostModal()" />
          </div>
        </div>
      </template>
    </Card>

    <Dialog
      :visible="showAddPostModal"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
      :closable="false"
      :draggable="false"
    >
      <template #header>
        <div class="add-post-modal-container">
          <div v-if="!url" class="add-image">
            <font-awesome-icon icon="fa-solid fa-image" />
          </div>
          <img v-if="url" :src="url" alt="" />
          <label for="file" class="label-file">Choisir une image</label>
          <input
            type="file"
            id="file"
            class="input-file"
            accept="image/*"
            @change="handleImportPostImg"
          />
          <Textarea v-model="postText" :autoResize="true" rows="5" />
        </div>
      </template>

      <template #footer>
        <Button
          label="Annuler"
          class="p-button-raised"
          @click="handleAddPostModal()"
        />
        <Button label="Publier" class="p-button-raised" @click="createPost()" />
      </template>
    </Dialog>
  </div>
</template>
<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import postsServices from '../services/posts';
import authServices from '../services/auth';

import Textarea from 'primevue/textarea';

import { ref, defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'AddPost',
  components: { Card, Button, Dialog, Textarea },
  emits: ['addPost'],
  setup(props, { emit }) {
    // Open/Close add post modal
    const showAddPostModal = ref(false);
    const handleAddPostModal = () => {
      showAddPostModal.value = !showAddPostModal.value;
    };

    // Import image in add post modal
    const url = ref('');
    const file = ref('');
    const handleImportPostImg = (data) => {
      file.value = data.target.files[0];
      url.value = URL.createObjectURL(file.value);
    };

    // Create post
    const postText = ref('');
    const createPost = () => {
      const postObject = JSON.stringify({
        userId: authServices.getUserId(),
        description: postText.value,
      });
      postsServices
        .createPost(postObject, file.value)
        .then((res) => {
          handleAddPostModal();
          emit('addPost', res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      showAddPostModal,
      postText,
      url,
      file,
      createPost,
      handleAddPostModal,
      handleImportPostImg,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '../styles/main.scss';
.label-file {
  height: 35px;
  cursor: pointer;
  color: #00b1ca;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
.label-file:hover {
  color: #25a5c4;
}

.input-file {
  display: none;
}

.container {
  width: 50%;
  margin: 0 auto;
  .post-item {
    .add-post-card-content {
      padding: 0 20%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .profile-image {
        background-color: grey;
        height: 80px;
        width: 80px;
        border-radius: 100%;
        @include display-center;
      }
    }
  }
}

img {
  height: 250px;
  object-fit: contain;
  margin-bottom: 30px;
}

.add-post-modal-container {
  display: flex;
  flex-direction: column;
  width: 75%;
  .add-image {
    @include display-center;
    background-color: grey;
    height: 300px;
    margin-bottom: 30px;
    border-radius: 3px;
  }
}
</style>
