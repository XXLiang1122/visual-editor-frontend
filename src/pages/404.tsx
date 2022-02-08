import { Empty, Button } from 'antd'

export default function Page404 () {
  return (
    <Empty style={{ transform: 'translateY(calc(50vh - 50%))' }} description="页面 404">
      <a href="/"><Button type="primary">返回首页</Button></a>
    </Empty>
  )
}