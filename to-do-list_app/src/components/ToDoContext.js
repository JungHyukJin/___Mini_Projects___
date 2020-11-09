import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
  { id: 1, text: '프로젝트 생성', done: true },
  { id: 2, text: '컴포넌트 스타일링', done: true },
  { id: 3, text: 'Context 생성', done: false },
  { id: 4, text: '기능 구현', done: false },
];

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(
        // 모든 todo에대하여 변환을 해줄 것이다.
        (todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo)
      );
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const ToDoStateContext = createContext();
const ToDoDispatchContext = createContext();
const ToDoNextIdContext = createContext();

export function ToDoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <ToDoStateContext.Provider value={state}>
      <ToDoDispatchContext.Provider value={dispatch}>
        <ToDoNextIdContext.Provider value={nextId}>
          {children}
        </ToDoNextIdContext.Provider>
      </ToDoDispatchContext.Provider>
    </ToDoStateContext.Provider>
  );
}

export function useToDoState() {
  const context = useContext(ToDoStateContext);
  if (!context) {
    throw new Error('Cannot find ToDoProvider');
  }
  return context;
}

export function useToDoDispatch() {
  const context = useContext(ToDoDispatchContext);
  if (!context) {
    throw new Error('Cannot find ToDoProvider');
  }
  return context;
}

export function useToDoNextId() {
  const context = useContext(ToDoNextIdContext);
  if (!context) {
    throw new Error('Cannot find ToDoProvider');
  }
  return context;
}
