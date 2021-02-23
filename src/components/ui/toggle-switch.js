import React from 'react';
import styled from 'styled-components';
import g from '../../globals.js';

/* 
   ToggleSwitch
   Set id using prop "Id"
*/

const Input = styled.input`
  opacity: 0;

  &:focus ~ label {
    /*outline: var(--default-outline);*/
    outline-offset: 5px;
  }

  &:checked + label::after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
`

const Label = styled.label`
  display: block;
  height: 28px;
  width: 56px;
  border-radius: 28px;
  cursor: pointer;
  background: #fff;
  text-indent: -80px;
  font-size: 1rem;
  line-height: 1.875;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
  position: absolute;
  right: 0.5rem;
  top: 0;
  transition: box-shadow 1s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: white;
    transition: left 0.2s var(--default-timing), transform 0.2s var(--default-timing);
  }

  &:hover {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.3);
  }

  @media ${g.atleastMedium} {
    height: 32px;
    width: 64px;
    line-height: 2.1;

    &::after {
      height: 28px;
      width: 28px;
    }
  }
`

const ToggleSwitch = ({Id, text}) => {
  return (
    <div>
      <Input type="checkbox" id={Id || 'toggle_switch'} />
      <Label htmlFor={Id || 'toggle_switch'}>
        {text || 'Toggle'}
      </Label>
  </div>
  );
}

export default ToggleSwitch;