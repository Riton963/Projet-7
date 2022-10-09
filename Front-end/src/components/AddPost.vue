<template>
  <div class="container">
    <Card class="add-post-item">
      <template #content>
        <div class="add-post-card-content">
          <div class="profile-image">
            <font-awesome-icon
              v-if="!profileImgUrl"
              icon="fa-solid fa-question"
            />
            <img v-if="profileImgUrl" :src="profileImgUrl" alt="" />
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
          <img v-if="url" :src="url" alt="" class="add-post-preview" />
          <label for="file" class="label-file">Choisir une image</label>
          <input
            type="file"
            id="file"
            class="input-file"
            accept="image/.jpg, .png, .jpeg"
            @change="handleImportPostImg"
          />
          <div class="alert-msg-file" v-if="alertMsgfile">
            {{alertMsgfile}}
          </div>
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
  props: {
    profileImgUrl: String,
  },
  setup(props, { emit }) {
    // Open/Close add post modal
    const showAddPostModal = ref(false);
    const handleAddPostModal = () => {
      url.value = '';
      file.value = '';
      postText.value = '';

      showAddPostModal.value = !showAddPostModal.value;
    };

    // Import image in add post modal
    const alertMsgfile = ref('');
    const url = ref('');
    const file = ref('');
    const handleImportPostImg = (data) => {
      alertMsgfile.value = '';
      if (data.target.files[0].size > 2097152) {
        alertMsgfile.value = 'Le fichier est trop gros !'
      } else {
        file.value = data.target.files[0];
        url.value = URL.createObjectURL(file.value);
      }
    };

    // Create post
    const postText = ref('');
    const postErrorMsg = ref('');
    
    const createPost = () => {
      const postObject = JSON.stringify({
        user: authServices.getUserId(),
        description: postText.value,
      });
      if (postText.value) {
        postsServices
          .createPost(postObject, file.value)
          .then((res) => {
            handleAddPostModal();
            emit('addPost', res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        postErrorMsg.value = 'Veuillez saisir du texte'
      }
    };

    return {
      showAddPostModal,
      postText,
      url,
      file,
      alertMsgfile,
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
  margin: 0 auto;
  .add-post-item {
    border-top: solid 3px firebrick;
    margin-bottom: 25px;
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
        overflow: hidden;
        img {
          width: 80px;
          height: 80px;
          object-fit: cover;
        }
      }
    }
  }
}

.add-post-preview {
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

.alert-msg-file {
  display: flex;
  justify-content: center;
  color: red;
}
</style>
