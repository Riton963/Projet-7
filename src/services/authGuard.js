import router from '@/router';
import VueJwtDecode from 'vue-jwt-decode';

export default (authGuard) => {
  let token = localStorage.getItem('token')
    ? VueJwtDecode.decode(localStorage.getItem('token'))
    : null;
  if (token) {
    return true;
  } else {
    router.push('/');
  }
};
