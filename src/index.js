import css from "./css/styles.css";
// import fetchObject from "./js/fetch.js";
import newCard from './js/apiService.js';
import pagination from './js/pagination.js';
import renderItems from './js/render.js';
import refs  from "./js/refs.js";

refs.form.addEventListener('submit', galleryOnSubmit);
refs.paginationRef.addEventListener('click', onPaginationsBtnClick);

function galleryOnSubmit(e) {
  e.preventDefault();
  pagination.setTotalItems(newCard.totalItems);

  const form = e.currentTarget;
  newCard.query = form.elements.query.value;

  refs.gallery.innerHTML = '';
  pagination.movePageTo(1);
  form.reset();
  newCard.reset();
  renderItems();
  refs.paginationRef.style.display = 'block';
}

function onPaginationsBtnClick() {
  refs.gallery.innerHTML = '';

  getCurrentPage();
  renderItems();
}

function getCurrentPage() {
  const currentTarget = pagination.getCurrentPage();
  newCard.newPage = currentTarget;
}