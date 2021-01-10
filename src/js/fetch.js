

export default {
  query: "",
  page: 1,
  perPage: 12,
  baseUrl: `https://pixabay.com/api/`,

  get queryValue() {
    return this.query;
  },
  
  set queryValue(val) {
    return (this.query = val);
  },

// Тебе интересны следующие свойства:
// webformatURL - ссылка на маленькое изображение для списка карточек
// largeImageURL - ссылка на большое изображение (смотри пункт 'дополнительно')
// likes - количество лайков
// views - количество просмотров
// comments - количество комментариев
// downloads - количество загрузок
  
//   var API_KEY = '19834065-125c9af840da0921b3970040a';
// var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });
  
//   const proxyurl = "https://cors-anywhere.herokuapp.com/";
// const url = "https://example.com"; // site that doesn’t send Access-Control-*
// fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
// .then(response => response.text())
// .then(contents => console.log(contents))
// .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

  getFetch(val = this.query, gallery) {
    let key = `19834065-125c9af840da0921b3970040a`;
    var API_KEY = '19834065-125c9af840da0921b3970040a';
    // полученное через параметры, значение из инпута сохраняет в свойство query через сеттер
    this.queryValue = val;

    // прописываем параметры запроса, согласно доков API
    // ДОБАВЛЯЕМ ПАРАМЕТР ДЛЯ СТРАНИЦ
    let params = `?key=${key}&image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}`;

//    https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

    // сливаем встроку запроса перед отправкой
    let url = this.baseUrl + params;
    console.log(url)
    // создаем объект опций для запроса, по докам API, для передачи ключа
    let options = {
      method: "GET",
      headers: {
        Authorization: key,

      },
    };

    // собственно запрос и обработка ответа на него
    return fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.photos;
      })
      .then((result) => {
        const items = template(result);
        gallery.insertAdjacentHTML("beforeend", items);
        setTimeout(() => {
          window.scrollTo({
            top: gallery.scrollHeight,
            behavior: "smooth",
          });
        }, 0);
        return gallery;
      });
  },

  // метод добавления страницы
  setPage() {
    this.page += 1;
    console.log("page: ", this.page);
    return this.page;
  },
  // метод сброса страниц
  resetPage() {
    this.page = 1;
    console.log("reset page", this.page);
    return this.page;
  },
};


