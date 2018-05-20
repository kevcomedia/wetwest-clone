const collapseToggler = document.querySelector('.navbar__collapse-toggler');
const list = document.querySelector('.navbar__list');

collapseToggler.addEventListener('click', function() {
  list.classList.toggle('navbar__list_active');
});
