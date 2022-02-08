import styled from '@emotion/styled'
import { templateStore } from 'store/template'
import { Button } from 'antd'
import { observer } from 'mobx-react'
import { createImage } from 'utils/createNewLayer'
import { upload } from 'services/upload'

export default observer(() => {
  const { template, layers, addLayer, resetSelectStatus } = templateStore

  // 选择图片
  const uploadImage = (e: any) => {
    // const reader = new FileReader()
    // reader.readAsDataURL(e.target.files[0])
    // reader.onload = el => {
    //   const url = el.target?.result
    //   if (typeof url === 'string') {
    //     const img = new Image()
    //     img.src = url
    //     img.onload = () => {
    //       onUseImage(img.width, img.height, url)
    //     }
    //   }
    // }
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    upload<{url: string}>(formData).then(({ data }) => {
      const img = new Image()
      img.src = data.url
      img.onload = () => {
        onUseImage(img.width, img.height, data.url)
      }
    })
  }

  // 使用图片
  const onUseImage = (width: number, height: number, url: string) => {
    const position = {
      x: (template.global.width - width) / 2,
      y: (template.global.height - height) / 2
    }
    const zIndex = layers.length ? layers[layers.length - 1].zIndex + 1 : 1
    const newLayer = createImage(width, height, url, position, zIndex)

    resetSelectStatus()
    addLayer(newLayer)
  }

  return <>
    <UploadButton htmlFor="uploadImage">
      <Button size="large">
        选择本地图片
      </Button>
    </UploadButton>
    <input type="file" id="uploadImage" accept="image/*" style={{ display: 'none' }} onChange={uploadImage} />
  </>
})

const UploadButton = styled.label`
  display: block;
  width: 100%;
  margin-bottom: 16px;
  cursor: pointer;

  button {
    width: 100%;
    pointer-events: none;
  }
`