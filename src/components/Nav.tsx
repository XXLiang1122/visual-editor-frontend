import styled from "@emotion/styled";

export default function Nav () {
  return <Header>
    <Img src="/logo.png" />
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
  width: 48px;
  height: 48px;
  object-fit: cover;
`