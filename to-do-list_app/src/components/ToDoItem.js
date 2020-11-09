import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useToDoDispatch } from './ToDoContext';

const Remove = styled.div`
  opacity: 0;
  /* ToDoItemBlock에 커서를 올렸을 때만 보여지게 만든다. */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;

  /* 만약 done이 존재한다면 색상을 바꿔줄 것이기 때문에, 여러줄의 스타일이 필요하다. */
  /* 상단에서 css를 불러오자. */
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
      /* done값이 있다면 테두리와 색상값을 바꾼다. */
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const ToDoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      /* 이런식으로 컴포넌트를 바로 선택해서 속성을 줄 수 있다. */
      opacity: 1;
    }
  }
`;

function ToDoItem({ id, done, text }) {
  //
  const dispatch = useToDoDispatch();
  const onToggle = () =>
    dispatch({
      type: 'TOGGLE',
      id,
    });
  const onRemove = () => {
    dispatch({
      type: 'REMOVE',
      id,
    });
  };

  return (
    <ToDoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </ToDoItemBlock>
  );
}

export default React.memo(ToDoItem);
// 이런식으로 컴포넌트 최적화가 가능하다.
