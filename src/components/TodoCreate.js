import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md'; // + (더하기 모양 아이콘)
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const CircleButton = styled.button `
  background: #38d9a9;  /*초록*/
  &:hover {
    background: #63e6be;    /*밝초*/
  }
  &:active {
    background: #20c997;    
  }

  z-index: 5;   /*다른내용 가리기 위해*/
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;


  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);  /*가운데 정렬하기위해서 사용*/

  font-size: 60px;
  color: white;
  border-radius: 40px;

  border: none;
  outline: none;

//   align-items: center;

  transition: 0.125s all ease-in;   /*애니메이션 효과*/
  ${props => props.open && css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
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
`;

function TodoCreate() {
    const [open, setOpen] = useState(false);
    /*const onToggle = () => setOpen(!open);    기존의 값을 반전*/
    const [value, setValue] = useState('');
  
    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();
  
    const onToggle = () => setOpen(!open);
    const onChange = e => setValue(e.target.value);
    const onSubmit = e => {
      e.preventDefault();    // 새로고침 방지
      dispatch({
        type: 'CREATE',
        todo: {
          id: nextId.current,
          text: value,
          done: false
        }
      });
      setValue('');
      setOpen(false);
      nextId.current += 1;  //현재값에 1더해줌으로 가장 아래에 추가
    };   
   
   
    return (
        <>
          {open && (
            <InsertFormPositioner>
              <InsertForm onSubmit={onSubmit}>
                <Input
                  autoFocus
                  placeholder="할 일을 입력 후, Enter 를 누르세요"
                  onChange={onChange}
                  value={value}
                />
              </InsertForm>
            </InsertFormPositioner>
          )}
          <CircleButton onClick={onToggle} open={open}>
            <MdAdd></MdAdd>
          </CircleButton>
        </>
      );
    }
    
    export default React.memo(TodoCreate);  //성능 최적화