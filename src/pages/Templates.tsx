import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Modal, Input, message } from 'antd'
import DefaultCover from 'assets/default-cover-img.jpg'
import { getMyTemplates, creatTemplate, removeTemplate, editTitle } from 'services/templates'
import { ListItem, SearchQuery, TemplateDetail } from 'types/template'
import { useNavigate } from 'react-router'

const { confirm } = Modal

let ajaxLock = false

export default function Templates () {
  const [list, setList] = useState<ListItem[]>([])
  const [query, setQuery] = useState<SearchQuery>({
    page: 1,
    pageSize: 10
  })
  const [isEnd, setIsEnd] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (ajaxLock) return
    ajaxLock = true
    getMyTemplates<SearchQuery, ListItem[]>(query).then(({ data }) => {
      setList(list => list.concat(data))
      if (data.length < query.pageSize) {
        setIsEnd(true)
      }
    }).finally(() => {
      ajaxLock = false
    })
  }, [query])

  // 加载更多
  const loadMore = () => {
    setQuery(q => Object.assign({}, q, {
      page: q.page + 1
    }))
  }

  // 新建
  const createTpl = async () => {
    const { data } = await creatTemplate<TemplateDetail>()
    navigate(`/detail/${data._id}`)
  }

  // 更新列表
  const remove = async (id: string) => {
    const idx = list.findIndex(i => i._id === id)
    if (idx > -1) {
      list.splice(idx, 1)
      setList(list.slice())
    }
  }

  return (
    <Wrapper>
      <Title>我的模板</Title>
      <List>
        <TemplateItem onClick={createTpl}>
          <CreateBtn>
            <PlusOutlined />
          </CreateBtn>
          <TemplateTitle>新建模板</TemplateTitle>
        </TemplateItem>
        {list.map(item => <Item key={item._id} info={item} onRemove={remove} />)}
      </List>
      {!isEnd && <Button style={{ display: 'block', width: 300, margin: '20px auto' }} onClick={loadMore}>加载更多</Button>}
    </Wrapper>
  )
}

function Item ({ info, onRemove }: { info: ListItem; onRemove: (id: string) => void; }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  let title = info.title

  // 去编辑
  const toEdit = () => {
    navigate(`/detail/${info._id}`)
  }

  // 文本框输入回调
  const onTitleChange = (e: any) => {
    title = e.target.value
  }

  // 重命名标题
  const rename = async () => {
    if (!title.length) {
      message.error('标题不能为空')
      return
    }
    await editTitle(info._id, {
      title
    })
    info.title = title
    setShowModal(false)
  }

  // 删除
  const remove = () => {
    confirm({
      content: '确定删除？',
      okText: '确定',
      cancelText: '取消',
      maskClosable: true,
      centered: true,
      async onOk () {
        await removeTemplate(info._id)
        onRemove(info._id)
      }
    })
  }

  // 改标题表单
  const Form = () => {
    return (
      <Modal
        title="修改标题"
        visible={showModal}
        onOk={rename}
        onCancel={() => {setShowModal(false)}}
        okText="确认"
        cancelText="取消"
        centered
      >
        <Input defaultValue={title} placeholder="请输入标题" onChange={onTitleChange} />
      </Modal>
    )
  }

  return (
    <TemplateItem>
      <TemplateCover>
        <Cover src={info.coverUrl || DefaultCover} />
        <div className='op-btn'>
          <Button type="primary" onClick={toEdit}>编辑</Button>
          <Button onClick={() => {setShowModal(true)}}>重命名</Button>
          <Button danger onClick={remove}>删除</Button>
        </div>
      </TemplateCover>
      <TemplateTitle>{ info.title }</TemplateTitle>
      <Form />
    </TemplateItem>
  )
}

const Wrapper = styled.div`
  padding: 20px 40px;
`

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: 700;
`

const TemplateItem = styled.div`
  width: 200px;
  margin: 0 20px 20px 0;
`

const TemplateCover = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  background-color: #fff;
  border: 2px solid #666;
  border-radius: 4px;
  overflow: hidden;
  user-select: none;

  &:after {
    content: '';
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent, #000);
    opacity: 0;
    transition: opacity 300ms;
  }

  &:hover {
    &:after {
      opacity: 0.7;
    }

    .op-btn {
      opacity: 1;
    }
  }

  .op-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 10px;
    opacity: 0;
    transition: opacity 300ms;

    button {
      margin-bottom: 6px;
    }
  }
`

const TemplateTitle = styled.p`
  width: 100%;
  margin: 10px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  text-align: center;
`

const CreateBtn = styled.div`
  width: 200px;
  height: 300px;
  background-color: #fff;
  border: 2px solid #666;
  text-align: center;
  line-height: 300px;
  font-size: 40px;
  color: #666;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 300ms, color 300ms;

  &:hover {
    border-color: #40a9ff;
    color: #40a9ff;
    box-shadow: 0 0 6px #ccc;
  }
`

const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`