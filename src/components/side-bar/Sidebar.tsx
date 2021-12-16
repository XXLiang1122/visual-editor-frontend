import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { ImageItem as ImageInfo, SearchQuery } from "types/image";
import { getImages } from "services/common";
import { Collapse } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { Popover, Input, Button } from 'antd';
import ImageItem from './ImageItem'
import TextItem from './TextItem'

const { Panel } = Collapse
const { Search } = Input

let ajaxLock = false
let isLoadMore = false

export default function Sidebar () {
  // 图片列表
  const [list, setList] = useState<ImageInfo[]>([])
  // 图片查询参数
  const [query, setQuery] = useState<Partial<SearchQuery>>({
    page: 1,
    per_page: 20,
    image_type: 'all',
    q: '',
    orientation: 'all',
    safesearch: true
  })

  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    getImages(query).then((data: any) => {
      if (isLoadMore) {
        setList(list => list.concat(data.hits))
      } else {
        setList(data.hits)
      }
    }).finally(() => {
      ajaxLock = false
    })
  }, [query])

  // 加载更多图片
  const onLoadMore = () => {
    if (ajaxLock) return
    ajaxLock = true
    const page = query.page
    isLoadMore = true
    setQuery(Object.assign({}, query, {
      page: page ? page + 1 : 1
    }))
  }

  // 图片筛选面板
  const FilterPanel = () => {
    const onSearch = (val: string) => {
      if (val) {
        isLoadMore = false
        setQuery(Object.assign({}, query, {
          q: val,
          page: 1
        }))
        setShowFilter(false)
      }
    }

    const Content = () => {
      return <>
        <Search placeholder="搜索" onSearch={onSearch} style={{ width: 200 }} />
      </>
    }

    return <Popover
      content={Content}
      title="筛选"
      trigger="click"
      visible={showFilter}
      onVisibleChange={visible => setShowFilter(visible)}
    >
      <FilterOutlined onClick={(e) => { e.stopPropagation(); setShowFilter(true) }} />
    </Popover>
  }

  return <Side>
    <Collapse defaultActiveKey={['1']} collapsible="header">
      <Panel header={<div style={{ width: '300px' }}>图片</div>} key="1" extra={FilterPanel()}>
        <ListContent>
          {list.map(image => <ImageItem key={image.id} image={image} />)}
          <Button style={{ width: '100%', marginTop: '20px' }} onClick={onLoadMore}>加载更多</Button>
      </ListContent>
      </Panel>
      <Panel header={<div style={{ width: '300px' }}>文字</div>} key="2">
        <ListContent>
          <TextItem />
        </ListContent>
      </Panel>
    </Collapse>
  </Side>
}

const Side = styled.aside`
  flex: none;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #ddd;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 8px;
    background: #fff;

    &:horizontal {
      height: 8px;
    }
  }

  ::-webkit-scrollbar-track {
    background: #fff;
  }

  ::-webkit-scrollbar-corner {
    background: #fff;
  }

  ::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border: 8px solid rgba(0, 0, 0, 0);
    border-radius: 9999px;

    &:hover {
      background: #adadad;
    }
  }

  .ant-collapse {
    border: 0;
    background-color: #fff;
  }
`

const ListContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
  user-select: none;

  &:after {
    content: '';
    display: block;
    flex-grow: 99999;
  }
`
