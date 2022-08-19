<template class="post-content">
  <div class="post-content">
    <Card class="post-item">
      <template #header>
        <img src="../assets/img/background.jpg" />
      </template>
      <template #title> John Doe </template>
      <template #content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
      </template>
      <template #footer>
        <div class="footer-post">
          <div>
            <font-awesome-icon icon="fa-solid fa-thumbs-up" size="2x" />0
          </div>
          <div>
            0<font-awesome-icon icon="fa-regular fa-message" size="2x" />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from '@vue/runtime-core';
import Button from 'primevue/button';
import postsServices from '../services/posts';

import Card from 'primevue/card';
export default defineComponent({
  name: 'Posts',
  components: { Card, Button },
  setup() {
    const like = () => {
      console.log('test');
    };

    onMounted(() => {
      postsServices
        .getAllPosts()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      like,
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
.p-card-header {
  height: 380px;
  overflow: hidden;
}

.footer-post {
  display: flex;
  justify-content: space-between;
  svg {
    margin: 0 15px;
  }
}
</style>
