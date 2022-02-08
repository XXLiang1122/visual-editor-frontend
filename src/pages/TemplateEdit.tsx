import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import Sidebar from 'components/side-bar/Sidebar'
import Editor from 'components/Editor'
import { useParams } from 'react-router-dom'
import { getTemplateDetail } from 'services/templates'
import { TemplateDetail } from 'types/template'
import { initTemplate } from 'store/template'
import { Spin } from 'antd'

export default function Main () {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)

  // 获取模板详情
  useEffect(() => {
    if (id) {
      getTemplateDetail<TemplateDetail>(id).then(({ data }) => {
        initTemplate(data.template)
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [id])

  return <>
    {loading ? <Loading><Spin /></Loading> :
      <MainBody>
        <Sidebar />
        <Editor />
      </MainBody>
    }
  </>
}

const MainBody = styled.main`
  display: flex;
  height: calc(100vh - 56px);
  background-color: #eef2f8;
  overflow: hidden;
`

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,.6);
  z-index: 1;
`