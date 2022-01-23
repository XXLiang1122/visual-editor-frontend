# 可视化编辑器 demo

> 基于 `react` + `mobx`  
> 接口仓库地址：https://github.com/XXLiang1122/visual-editor-backend

&nbsp;
### [<b>👉 预览静态demo</b>](https://xxliang1122.github.io/visual-editor-frontend/build)  

&nbsp;

**已实现功能点**
- 画布 
  - 画布尺寸
  - 画布自适应
  - 画布自由缩放
  - 清空画布内容
- 背景
  - 背景颜色
- 图层
  - 位置拖拽
  - 改变大小
  - 旋转
  - 层级调整
  - 透明度
  - 锁定图层
  - 删除图层
  - 辅助线吸附对齐
- 图片
  - 添加网络图片、本地图片
  - 拖拽添加图片
  - 图片缩放模式
  - 图片翻转
  - 图片裁剪（旋转后的拖拽裁剪待优化）
- 文字
  - 添加文字
  - 文字编辑
  - 文本框高度自适应
  - 文字样式（颜色、字体、大小、粗体、下划线、对齐）
- 形状
  - 矩形、圆形
  - 填充、边框颜色、边框样式、边框粗细
- 撤销重做
- 导出图片
- 快捷键
  - 图层删除（backspace/delete)
  - 图层复制粘贴（command/ctrl + c、command/ctrl + v）
  - 撤销重做（command/ctrl + z、command/ctrl + shift + z）

**待实现**
- 画布缩放焦点不变
- 图层组合/拆分
  
&nbsp;  
# Development

```bash
git clone git@github.com:XXLiang1122/visual-editor-frontend.git
npm install
npm run start
```
