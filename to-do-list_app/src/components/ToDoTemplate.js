import React from 'react';
import styled from 'styled-components';

const ToDoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  position: relative;
  /* 해당 속성은 이후에 초록색 플러스 버튼을 투두템플릿 내부의 최하단에 */
  /* 렌더링을 해야하는데, 그 때 필요하다. */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);

  margin: 0 auto;
  /* 페이지 중앙 설정 */
  margin-top: 96px;
  margin-bottom: 32px;

  display: flex;
  flex-direction: column;
`;

function ToDoTemplate({ children }) {
  return <ToDoTemplateBlock>{children}</ToDoTemplateBlock>;
}

export default ToDoTemplate;
