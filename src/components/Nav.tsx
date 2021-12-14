import styled from "@emotion/styled";

export default function Nav () {
  return <Header>
    <Img />
  </Header>
}

const Header = styled.header`
  height: 56px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`

const Img = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
`