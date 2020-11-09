// 큰 그림을 먼저 그려보자.
// main.js가 실행되면 loadItems함수를 먼저 실행할 것이다.
// data.josn에 있는 데이터를 읽어와서 아이템을 전달해 줄 것이다.
// 동적으로 읽어와야 하니, 시간이 걸린다. 즉, promise를 리턴하게 만들어야 한다.

// Fetch the items from the JSON file
// 브라우저 API중 하나인 fetch를 사용하면 해당 파일 경로나 url을 작성하면
// 데이터를 간단하게 네트워크를 통해서 받아올 수 있다.
// fetch는 데이터를 성공적으로 받아오면 response라는 object를 전달해준다.
// console.log(response)로 출력해보면, 다양한 속성이있는데 body안 ReadableStream 이라는 곳에
// 우리가 받고자하는 데이터가 있다.
// 개발자모드 네트워크 창에서 보면 HTMl이 완료되고, JS가 실행되고, data.json파일이 불러와진 것을 확인할 수 있다.

function loadItems() {
  return (
    fetch('data/data.json')
      .then((response) => response.json())
      // response obj에 있는 json()이라는 API를 이용해서 response body를 json의 object로 변환한다.
      // .then((json) => console.log(json)) 으로 확인해보면 json파일 데이터를 확인 할 수 있다.
      .then((json) => json.items)
    // 그 후 json안에 있는 items를 반환한다.
  );
}

// 아이템 리스트 업데이트
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

// 데이터에서 가져온 아이템을 HTML태그로 생성
function createHTMLString(item) {
  const replacedImg = item.image.replace('../img', 'img');

  return `
  <li class="item">
  <img src="${replacedImg}" alt="${item.type}" class="item__thumbnail"/>
  <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
  `;
}

function onButtonClick(event, items) {
  // console.log(event, items);
  // console.log(event.target.dataset.key);
  // console.log(event.target.dataset.value);
  // 위처럼 콘솔을 찍어보면 HTML에서 작성한 data-key, data-value의 데이터를 볼 수 있다.
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    // 정보가 없다면 함수를 실행하지 않는다.
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', (e) => onButtonClick(e, items));
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
