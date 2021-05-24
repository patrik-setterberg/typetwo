import React from 'react';
import styled from 'styled-components';
import g from '../../globals.js';

/* 
   ToggleSwitch component.
   Set id using prop "Id".
*/

const Wrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  opacity: 0;

  /*
  &:focus ~ label {
    outline: var(--default-outline); UNDEFINED
    outline-offset: 5px;
  }
  */

  &:checked + label::after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
`

const LABEL_LETTER_SPACING = 1.2; // px

const Label = styled.label`
  display: inline-block;
  height: 1.75rem;
  width: 3.5rem;
  border-radius: 1.75rem;
  margin: 1rem; // temp
  cursor: pointer;
  background-color: #fff;
  text-indent: calc(${props => props.text.length * -1}ch + (${props => props.text.length} * ${LABEL_LETTER_SPACING}px * -1) - 2ch);
  font-size: 0.875rem;
  line-height: 1.875;
  letter-spacing: ${LABEL_LETTER_SPACING}px;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
  position: absolute;
  right: 0.5rem;
  top: 0;
  box-shadow: none;
  transition: box-shadow 0.2s var(--default-timing);

  &::after {
    content: '';
    position: absolute;
    top: 0.125rem;
    left: 0.125rem;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
    background-color: #333;
    transition: all 0.12s var(--default-timing);
  }

  &:hover {
    box-shadow: 0 0 7px 2px rgba(255, 255, 255, 0.25);
  }

  @media ${g.atleastMedium} {
    height: 2rem;
    width: 4rem;
    line-height: 2.1;

    &::after {
      height: 1.75rem;
      width: 1.75rem;
    }
  }
`

const ToggleSwitch = ({Id, text, defaultChecked, onChangeFunc}) => {

  const handleChange = (e) => {
    let isChecked = e.target.checked;
    onChangeFunc(isChecked);
  }

  return (
    <Wrapper>
      <Input
        type="checkbox"
        id={Id || 'toggle_switch'}
        defaultChecked={defaultChecked}
        onChange={handleChange}
      />
      <Label htmlFor={Id || 'toggle_switch'} text={text || 'Toggle'}>
        {text || 'Toggle'}
      </Label>
    </Wrapper>
  );
}

export default ToggleSwitch;