import React from 'react';
import styled from 'styled-components';
import ToDoItem from './ToDoItem';
import { useToDoState } from './ToDoContext';

const ToDoListBlock = styled.div`
  flex: 1;
  /* ToDoTemplate에서 display: flex와 flex-direction: column을 설정했기 때문에,*/
  /* fleX:1을 주면 자신이 차지할 수 있는 공간을 전부 차지한다. */
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  /* 항목이 많아지면 스크롤바를 보여줄 것임 */
`;

function ToDoList() {
  const todos = useToDoState();
  // ToDoContext에서 만든 커스텀 훅을 이렇게 간단히 사용할 수 있다.

  return (
    <ToDoListBlock>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        />
      ))}
    </ToDoListBlock>
  );
}

export default ToDoList;
