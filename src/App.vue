<template>
  <navBar />
  <section id="background-img">
    <authModal />
  </section>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import navBar from './components/navBar.vue';
import authModal from './components/authModal.vue';

export default defineComponent({
  name: 'App',
  components: {
    navBar,
    authModal,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

#background-img {
  background-image: url('./assets/img/background.jpg');
  height: 100vh;
  width: 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
