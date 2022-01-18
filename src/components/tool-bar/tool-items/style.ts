import styled from "@emotion/styled";

export const ToolItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;

  &.active {
    background-color: rgba(57,76,96,.15);
  }

  &:hover {
    background-color: rgba(64,87,109,.07);
  }

  .text {
    padding: 0 10px;
    font-size: 16px;
  }

  input[type="search"] {
    text-align: center;
  }
`

export const ColorItem = styled.div`
  width: 28px;
  height: 28px;
  border: 2px solid #666;
  border-radius: 4px;
`