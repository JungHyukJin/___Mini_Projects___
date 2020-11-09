const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

document.addEventListener('mousemove', (event) => {
  // 마우스를 움직 일 때 항상 event가 발생, 항상 event가 발생하고, 오브젝트가 전달되기 때문에 param에 받아준다.
  // console.log('move');
  // console.log(`${event.clientX} ${event.clientY}`);
  // 로그를 찍어서 정상적으로 작동하는지 개발자모드로 확인 후 개발을 하자.
  const x = event.clientX;
  const y = event.clientY;
  console.log(`${x} ${y}`);

  vertical.style.left = `${x}px`;
  horizontal.style.top = `${y}px`;
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  tag.style.left = `${x}px`;
  tag.style.top = `${y}px`;
  tag.innerHTML = `(${x}px, ${y}px)`;
});
