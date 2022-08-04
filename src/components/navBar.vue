<template>
  <header class="nav-bar">
    <div class="container">
      <img src="./../assets/logo/logo-left.png" alt="" class="logo" />
      <nav>
        <a href="#" @click="handleConnexion()">Connexion</a>
        <a href="#" @click="handleInscription()">Inscription</a>
      </nav>
    </div>
  </header>
</template>

<script>
import { defineComponent, ref } from '@vue/runtime-core';

export default defineComponent({
  name: 'navBar',
  components: {},
  props: {},
  setup() {
    const handleConnexion = () => {};

    const handleInscription = () => {};
    return {
      handleConnexion,
      handleInscription,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-bar {
  height: 62px;
  background-color: #4e5166;
  margin: 0;
  padding: 0;

  .container {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 260px;
    }
  }
  nav {
    width: 260px;
    a {
      padding: 30px 25px;
      text-decoration: none;
      color: white;
    }
  }
}
</style>
