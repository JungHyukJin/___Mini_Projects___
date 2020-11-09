import React from 'react';
import styled from 'styled-components';
import { useToDoState } from './ToDoContext';

const ToDoHeadBlock = styled.div`
  /* 내부에는 현재 날짜, 요일, 항목리스트가 있다. */
  /* const DateText = styeld.h1 이런식으로 작성하지 않고 아래방식처럼 nested CSS문법을 사용한다. */
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;

  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }

  .day {
    margin-top: 4px;
    color: #868396;
    font-size: 21px;
  }

  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

function ToDoHead() {
  const todos = useToDoState();
  const undoneTasks = todos.filter((todo) => !todo.done);

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayName = today.toLocaleDateString('ko-KR', {
    weekday: 'long',
  });

  return (
    <ToDoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 {undoneTasks.length} 남음</div>
    </ToDoHeadBlock>
  );
}

export default ToDoHead;
