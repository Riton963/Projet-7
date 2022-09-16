<template>
  <header class="nav-bar">
    <nav>
      <div></div>
      <div>
        <a href="#" @click="handleFeedPage()"
          ><font-awesome-icon icon="fa-solid fa-house" size="2x"
        /></a>
        <a href="#" @click="handleProfilePage()"
          ><font-awesome-icon icon="fa-solid fa-user" size="2x"
        /></a>
      </div>
      <div>
        <font-awesome-icon
          icon="fa-solid fa-power-off"
          size="2x"
          @click="disconnect()"
        />
      </div>
    </nav>
  </header>
</template>

<script>
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

    const disconnect = () => {
      localStorage.removeItem('token');
      location.reload();
    };

    return {
      handleFeedPage,
      handleProfilePage,
      disconnect,
    };
  },
};
</script>

<style scoped lang="scss">
.nav-bar {
  height: 62px;
  background-color: firebrick;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 95%;
    margin: 0 auto;
    a {
      text-decoration: none;
      color: white;
      margin: 15px;
    }
  }
}
</style>
