<template>
  <div class="container">
    <Card class="post-item">
      <template #header> </template>
      <template #content>
        <div>img</div>
        <div>
          <Button @click="handleAddPostModal()" />
        </div>
      </template>
      <template #footer> </template>
    </Card>
    <Dialog
      :visible="showAddPostModal"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
      :closable="false"
    >
      <template #header>
        <img :src="url" alt="" />
        <Editor v-model="value2" editorStyle="height: 320px">
          <template v-slot:toolbar>
            <span class="ql-formats">
              <button class="ql-bold" v-tooltip.bottom="'Bold'"></button>
              <button class="ql-italic" v-tooltip.bottom="'Italic'"></button>
              <button
                class="ql-underline"
                v-tooltip.bottom="'Underline'"
              ></button>
            </span>
          </template>
        </Editor>
      </template>

      <template #footer>
        <Button
          label="Annuler"
          class="p-button-raised"
          @click="handleAddPostModal()"
        />
        <Button label="Publier" class="p-button-raised" @click="createPost()" />
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
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
import Editor from 'primevue/editor';
import { ref } from '@vue/runtime-core';

export default {
  name: 'AddPost',
  components: { Card, Button, Dialog, Editor },
  setup() {
    const showAddPostModal = ref(false);
    const value2 = ref('');
    const token = JSON.parse(localStorage.getItem('token'));
    const url = ref('');

    const handleAddPostModal = () => {
      showAddPostModal.value = !showAddPostModal.value;
    };
    const createPost = () => {
      const postObject = {
        userId: token.uid,
        description: value2.value,
      };
      console.log(postObject);
    };

    const handleImportPostImg = (data) => {
      const file = data.target.files[0];
      url.value = URL.createObjectURL(file);
      console.log(url.value);
    };

    return {
      showAddPostModal,
      value2,
      url,
      createPost,
      handleAddPostModal,
      handleImportPostImg,
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 70%;
  margin: 0 auto;
  .p-card {
    width: 100%;
  }
}
</style>
