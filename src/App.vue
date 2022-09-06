<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  components: {},
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Roboto:wght@100;300;400;500;700;900&family=Shrikhand&display=swap');
#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.p-button {
  background-color: firebrick !important;
  border: 1px solid firebrick !important;
}

.p-button:enabled:hover {
  background: firebrick !important;
  color: #ffffff !important;
  border-color: firebrick !important;
}

.p-button:enabled:active {
  background: firebrick !important;
  color: #ffffff !important;
  border-color: firebrick !important;
}

.p-button:focus {
  box-shadow: none !important ;
}
body {
  background-color: #fafbfc;
}
</style>
