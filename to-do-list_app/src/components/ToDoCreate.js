import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useToDoNextId, useToDoDispatch } from './ToDoContext';

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  /* 다른 내용을 가리기 위해 설정 */
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  /* 위의 코드를 사용하지 않으면, 정 중앙으로 가지 않는다. 버튼의 크기 때문. */
  /* 위 코드를 사용함으로써 해당 버튼 크기의 50%만큼 좌/하단으로 움직여 정중앙에 맞춰준다. */

  font-size: 60px;
  color: white;
  border-radius: 40px;

  border: none;
  outline: none;

  /* 애니메이션 효과를 주기위해 트랜지션을 추가해줘야한다. */
  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg); ;
    `};
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  /* div에서 form으로 바꿔주자, 그러면 onSubmit 이벤트를 사용할 수 있다. */
  /* 하지만 HTML에서는 기본적으로 onSubmit이벤트가 발생하면 새로고침이 된다. */
  /* 새로고침이 되면서 초기화가 되는 것을 막기 위해서는 따로 작업을 해야한다. */
  /* 코드는 아래 onSubmit에서 볼 수 있다. */
  background: #f8f9fa;
  padding: 32px;
  padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  /* 박스사이징 보더박스를 설정하지 않으면 padding을 무시하고 적용된다. */
`;

function ToDoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useToDoDispatch();
  const nextId = useToDoNextId();

  const onToggle = () => setOpen(!open);
  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    // 원래 브라우저에서 해야하는 행동을 방지한다. 즉, 새로고침을 방지.
    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        text: value,
        done: false,
      },
    });
    setValue('');
    setOpen(false);
    nextId.current += 1;
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              onChange={onChange}
              value={value}
              placeholder="할 일을 입력 후, Enter 를 눌러주세요"
              autoFocus
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default React.memo(ToDoCreate);
