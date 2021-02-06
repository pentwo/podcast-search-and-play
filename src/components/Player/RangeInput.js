import styled from 'styled-components';

export const CustomInput = styled.input`
  height: 26px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;

  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 14px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px var(--dark);
    background: var(--dark);
    border-radius: 14px;
    border: 0px solid #000000;
  }
  &::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 20px;
    width: 40px;
    border-radius: 12px;
    background: var(--primary);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -3px;
  }
  &:focus::-webkit-slider-runnable-track {
    background: var(--dark);
  }
  &::-moz-range-track {
    width: 100%;
    height: 14px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px var(--dark);
    background: var(--dark);
    border-radius: 14px;
    border: 0px solid #000000;
  }
  &::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 20px;
    width: 40px;
    border-radius: 12px;
    background: var(--primary);
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 14px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: var(--dark);
    border: 0px solid #000000;
    border-radius: 28px;
    box-shadow: 1px 1px 1px var(--dark);
  }
  &::-ms-fill-upper {
    background: var(--dark);
    border: 0px solid #000000;
    border-radius: 28px;
    box-shadow: 1px 1px 1px var(--dark);
  }
  &::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 20px;
    width: 40px;
    border-radius: 12px;
    background: var(--primary);
    cursor: pointer;
  }
  &:focus::-ms-fill-lower {
    background: var(--dark);
  }
  &:focus::-ms-fill-upper {
    background: var(--dark);
  }
`;
