export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.tokenSession) {
    return { Authorization: 'Bearer ' + user.tokenSession};
    //return { "x-auth-token": user.tokenSession };
  } else {
    return {};
  }
}