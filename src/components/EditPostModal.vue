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
          <div v-if="!url" class="add-image">
            <font-awesome-icon icon="fa-solid fa-image" />
          </div>
          <img v-if="url" :src="url" alt="" />
          <Textarea v-model="postText" :autoResize="true" rows="5" />
        </div>
      </template>

      <template #footer>
        <Button
          label="Annuler"
          class="p-button-raised"
          @click="closeEditPostModal()"
        />
        <Button label="Publier" class="p-button-raised" @click="createPost()" />
        <label for="file" class="label-file">Choisir une image</label>
        <input
          type="file"
          id="file"
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
        url.value = props.post.imageUrl;
      }
      return props.showEditPostModal;
    });
    const postSelected = computed(() => {
      console.log(props.post);
      return props.post;
    });
    const token = JSON.parse(localStorage.getItem('token'));
    const postText = ref('');

    // Open/Close edit post modal
    const closeEditPostModal = () => {
      emit('closeEditPostModal');
      url.value = props.post.imageUrl;
    };

    // Import image in add post modal
    const url = ref();
    const file = ref('');
    const handleImportPostImg = (data) => {
      file.value = data.target.files[0];
      url.value = URL.createObjectURL(file.value);
    };

    return {
      postSelected,
      postText,
      url,
      file,
      showDialog,
      handleImportPostImg,
      closeEditPostModal,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '../styles/main.scss';
</style>
