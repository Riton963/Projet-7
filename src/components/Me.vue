<template>
  <div class="me-component">
    <header>
      <div v-if="userData?.profileImgUrl" class="me-profile-img">
        <img :src="userData?.profileImgUrl" alt="" />
      </div>
    </header>
    <div class="me-name">
      {{ userData?.firstName }}
      {{ userData?.lastName }}
    </div>
    <div class="me-job">Developper Front-End</div>
  </div>
</template>

<script>
export default {
  name: 'Me',
  components: {},
  props: {
    userData: Object,
  },
  setup(props, { emits }) {
    return {
      props,
    };
  },
};
</script>

<style scoped lang="scss">
.me-component {
  height: 350px;
  width: 250px;
  margin: 60px 45px;
  background-color: white;
  position: fixed;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  border-radius: 4px;
  header {
    height: 80px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    background-color: firebrick;
    .me-profile-img {
      height: 100px;
      width: 100px;
      background-color: white;
      position: relative;
      bottom: -30px;
      left: 75px;
      border-radius: 100%;
      border: 4px solid firebrick;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
  .me-name {
    margin: 60px auto 0 auto;
    display: flex;
    justify-content: center;
    font-size: 20px;
  }
  .me-job {
    display: flex;
    justify-content: center;
    color: grey;
    font-size: 16px;
  }
}
</style>
