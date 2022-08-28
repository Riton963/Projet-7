<template>
  <header class="nav-bar">
    <nav>
      <a href="#" @click="handleFeedPage()"
        ><font-awesome-icon icon="fa-solid fa-house" size="2x"
      /></a>
      <a href="#" @click="handleProfilePage()"
        ><font-awesome-icon icon="fa-solid fa-user" size="2x"
      /></a>
    </nav>
    <div class="right-element">
      <font-awesome-icon icon="fa-solid fa-power-off" />
    </div>
  </header>
</template>

<script>
import { ref } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

export default {
  name: 'NavBar',
  components: {},
  props: {},
  setup() {
    const router = useRouter();

    const handleFeedPage = () => {
      router.push({ name: 'feed' });
    };

    const handleProfilePage = () => {
      router.push({ name: 'profile' });
    };
    return {
      handleFeedPage,
      handleProfilePage,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-bar {
  height: 62px;
  background-color: #4e5166;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  nav {
    a {
      text-decoration: none;
      color: white;
      margin: 15px;
    }
  }
}
</style>
