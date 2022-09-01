<template>
  <div class="container">
    <Dialog
      :visible="showDialog"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
      :closable="false"
      :draggable="false"
    >
      <template #header>
        <div class="add-post-modal-container">
          <div v-if="!urlEditPostImage" class="add-image">
            <font-awesome-icon icon="fa-solid fa-image" />
          </div>
          <img v-if="urlEditPostImage" :src="urlEditPostImage" alt="" />
          <Textarea v-model="postText" :autoResize="true" rows="5" />
        </div>
      </template>

      <template #footer>
        <Button
          label="Supprimer"
          class="p-button-raised"
          @click="deletePost(postSelected._id)"
        />
        <Button
          label="Annuler"
          class="p-button-raised"
          @click="closeEditPostModal()"
        />
        <Button label="Publier" class="p-button-raised" @click="editPost()" />
        <label for="editPostImage" class="label-file">Choisir une image</label>
        <input
          type="file"
          id="editPostImage"
          class="input-file"
          accept="image/*"
          @change="handleImportPostImg"
        />
      </template>
    </Dialog>
  </div>
</template>
<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import postsServices from '../services/posts';
import Textarea from 'primevue/textarea';
import { ref, defineComponent, computed } from '@vue/runtime-core';

export default defineComponent({
  name: 'EditPostModal',
  components: { Card, Button, Dialog, Textarea },
  props: {
    showEditPostModal: Boolean,
    post: Object,
  },
  emits: ['addPost'],
  setup(props, { emit }) {
    const showDialog = computed(() => {
      if (props.post) {
        urlEditPostImage.value = props.post.imageUrl;
      }
      return props.showEditPostModal;
    });
    const postSelected = computed(() => {
      return props.post;
    });
    const token = JSON.parse(localStorage.getItem('token'));

    // Open/Close edit post modal
    const closeEditPostModal = () => {
      emit('closeEditPostModal');
      urlEditPostImage.value = props.post.imageUrl;
    };

    // Import image in edit post modal
    const urlEditPostImage = ref();
    const fileEditPostImage = ref('');
    const handleImportPostImg = (data) => {
      fileEditPostImage.value = data.target.files[0];
      urlEditPostImage.value = URL.createObjectURL(fileEditPostImage.value);
      console.log(urlEditPostImage.value);
    };

    // Update post
    const postText = ref('');

    const editPost = () => {
      const postObject = {
        userId: token.userId,
        description: postText.value,
        postId: props.post._id,
      };
      postsServices
        .updatePost(postObject, fileEditPostImage.value)
        .then((res) => {
          emit('closeEditPostModal');
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // delete post

    const deletePost = (id) => {
      postsServices
        .deletePost(id)
        .then((res) => {
          emit('closeEditPostModal');
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return {
      postSelected,
      postText,
      urlEditPostImage,
      fileEditPostImage,
      showDialog,
      handleImportPostImg,
      closeEditPostModal,
      editPost,
      deletePost,
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
