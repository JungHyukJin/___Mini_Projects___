const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

function onAdd() {
  // 1.사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  }

  // 2. 새로운 아이템을 생성 ( 텍스트 + 삭제 버튼)
  const item = createItem(text);

  // 3. items 컨테이너안에 새로 생성된 아이템 추가
  items.appendChild(item);

  // 4. 새로 추가돈 아이템으로 스크롤링
  item.scrollIntoView({ block: 'center' });

  // 5. input 초기화.
  input.value = '';
  input.focus();
}

let id = 0; //UUID 라이브러리를 사용하는 것이 좋다.
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
    <div class="item">
      <span class="item__name">${text}</span>
      <button class="item__delete">
        <i class="fas fa-eraser" data-id="${id}"></i>
      </button>
      </div>
    <div class="item__divider"></div>`;
  id++;
  return itemRow;
}

addBtn.addEventListener('click', () => {
  onAdd();
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    onAdd();
  }
});

items.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
