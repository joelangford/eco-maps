import users from '../data/users.json';

const storeUser = (user) => {
  for (let key in user) {
    localStorage.setItem(key, user[key]);
  }
}

const validateUser = (username, password) => {
  const user = users.users.find(user => user.username === username);
  storeUser(user);
  return user.password === password;
}

const handleValidLogin = (callbacks) => {
  const login = document.getElementById('login');
  const mapPage = document.getElementById('map-page');
  login.style.display = 'none';
  mapPage.style.display = 'flex';
  callbacks();
};

const checkForExistingUser = () => {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  if (username && password) {
    return validateUser(username,password);
  } else {
    return false;
  }
};

const login = (callbacks) => {
  const existingUser = checkForExistingUser();
  if (existingUser) {
    handleValidLogin(callbacks);
  }

  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    const validUser = validateUser(formProps.username, formProps.password);

    if (validUser) {
      handleValidLogin(callbacks);
    } else {

    }
  });
}

export default login;