const url = 'https://pixabay.com/api/';
const apiKey = '19834065-125c9af840da0921b3970040a';
let params = `?key=${apiKey}`;
let authUrl = url + params
const proxyurl = "https://cors-anywhere.herokuapp.com/";
// const url = "https://example.com"; // site that doesn’t send Access-Control-*
fetch(proxyurl + authUrl) // https://cors-anywhere.herokuapp.com/https://example.com
.then(response => response.text())
.then(contents => console.log(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

export default {
  searchQuery: '',
  page: 1,
  perPage: 12,
  totalItems: 0,
  fetchCard() {
    const search = `${url}?image_type=photo&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&orientation=horizontal&key=${apiKey}`;

    return fetch(search)
      .then(res => res.json())
      .then(({ hits, totalHits }) => {
        this.totalItems = totalHits;
        if (hits.length === 0) {
          throw new Error('Error feching data');
        }
        return { hits, page: this.page };
      })
      .catch(error => {
        console.log(
          'Nothing was found for your request. Enter the correct request',
        );
        return error;
      });
  },

  reset() {
    this.page = 1;
  },

  get newPage() {
    return this.page;
  },

  set newPage(value) {
    this.page = value;
  },

  get query() {
    return this.searchQuery;
  },

  set query(value) {
    this.searchQuery = value;
  },
};

