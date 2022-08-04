const apiUrl = 'http://localhost:3000/api/auth/signup';

const signUp = (payload) => {
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

export default { signUp };
