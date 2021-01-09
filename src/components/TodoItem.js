import React from 'react';
import styled, { css } from 'styled-components';    /*여러줄을 작성해야하므로 css를 불러옴 */
import { MdDone, MdDelete } from 'react-icons/md';  /* 체크, 휴지통 아이콘 */
import { useTodoDispatch } from '../TodoContext';

/*쓰레기통 나타나게 하는 컴포넌트*/
const Remove = styled.div`  
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c7cdd4;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #ff6b6b;     /*빨강*/
  }
`;

/*왼쪽에 있는 체크를 나타내는 컴포넌트*/
const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;      /*회색*/
  font-size: 24px;      /*아이콘 크기*/
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>props.done && css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

/*텍스트를 보여주는 컴포넌트*/
const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>props.done && css`
      color: #ced4da;
    `}
`;


/*위의 세개의 컴포넌트를 담고있는?! 컴포넌트*/
const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;     /*component Selector 기능 - 특정기능에만 사용할때사용!!!*/
    }
  }
`;


function TodoItem({ id, done, text }) {
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({ type: 'TOGGLE', id });
    const onRemove = () => dispatch({ type: 'REMOVE', id });
    return (
        <TodoItemBlock>
        <CheckCircle done={done} onClick={onToggle}>
            {done && <MdDone></MdDone>}
        </CheckCircle>
        <Text done={done}>{text}</Text>
        <Remove onClick={onRemove}>
            <MdDelete></MdDelete>
        </Remove>
        </TodoItemBlock>
  );
}

export default React.memo(TodoItem);    //컴포넌트 최적화