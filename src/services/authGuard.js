import router from '@/router';

export default (authGuard) => {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    return true;
  } else {
    router.push('/');
  }
};
