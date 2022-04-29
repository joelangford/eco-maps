const buildUserTemplate = (firstname, surname, jobTitle, avatarUrl) => {
  return `
    <img class="user-profile__avatar" src="${avatarUrl}" alt="${firstname} ${surname}'s avatar" />
    <h1 class="user-profile__name">${firstname} ${surname}</h1>
    <h2 class="user-profile__job">${jobTitle}</h2>
    `;
}

const initSidebar = () => {
  const userEl = document.getElementById('user');
  const firstname = localStorage.getItem('firstname');
  const surname = localStorage.getItem('surname');
  const avatarUrl = localStorage.getItem('avatarUrl');
  const jobTitle = localStorage.getItem('jobTitle');

  const userTemplate = buildUserTemplate(firstname, surname, jobTitle, avatarUrl);
  userEl.innerHTML = userTemplate;

  const logoutBtn = document.getElementById('logout');
  logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
  });
};

export default initSidebar;