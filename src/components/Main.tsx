import React from "react";
import styled from "@emotion/styled";
import Sidebar from "./side-bar/Sidebar";
import Editor from "./Editor";

export default function Main () {
  return <MainBody>
    <Sidebar />
    <Editor />
  </MainBody>
}

const MainBody = styled.main`
  display: flex;
  height: calc(100vh - 56px);
  background-color: #eef2f8;
  overflow: hidden;
`
