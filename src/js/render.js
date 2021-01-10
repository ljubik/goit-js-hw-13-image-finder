import newCard from './apiService.js';
import refs from './refs.js';
import paganation from './pagination.js';
import templates from "../templates/item.hbs";

function render() {
  newCard.fetchCard().then(({ hits, page }) => {
    function getCurrentPages() {
      paganation.movePageTo(page);
    }

    paganation.setTotalItems(newCard.totalItems);
    getCurrentPages();
    refs.gallery.insertAdjacentHTML('afterbegin', markup(hits));
  });
}

function markup(cards) {
  return templates(cards);
}

export default render;