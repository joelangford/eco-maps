import users from '../data/users.json'

const storeUser = (user) => {
  for (const key in user) {
    localStorage.setItem(key, user[key])
  }
}

const validateUser = (username, password) => {
  // Searches the users json to check the submited refrences to the username and password are correct
  const user = users.users.find(user => user.username === username)
  if (user && user.password && user.password === password) {
    // adds the users details to local storage
    storeUser(user)
    return true
  }
  return false
}

const handleValidLogin = (callbacks) => {
  // Changes the styles on the page to reveal the map and calls the call back functions, initalising the map and the local user sidebar.
  const login = document.getElementById('login')
  const mapPage = document.getElementById('map-page')
  login.style.display = 'none'
  mapPage.style.display = 'flex'
  callbacks()
}

const handleInvalidLogin = (form) => {
  const invalidLoginMessage = document.createElement('div')
  invalidLoginMessage.className = 'login-form__error'
  invalidLoginMessage.innerText = 'Invalid username and/or password'
  form.children[0].appendChild(invalidLoginMessage)
}

const checkForExistingUser = () => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  if (username && password) {
    return validateUser(username, password)
  } else {
    return false
  }
}

const login = (callbacks) => {
  // Check localstorage for existing login session
  const existingUser = checkForExistingUser()
  if (existingUser) {
    handleValidLogin(callbacks)
  }

  // Handles the login from the login form
  const loginForm = document.getElementById('login-form')
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)
    const validUser = validateUser(formProps.username, formProps.password)

    if (validUser) {
      handleValidLogin(callbacks)
    } else {
      handleInvalidLogin(e.target)
    }
  })
}

export default login
