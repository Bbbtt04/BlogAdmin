export interface BasicTableColumnProps {
  // normal: 普通列; selection: 多选框; option: 操作列; tag: 标签列; expand: 展开列
  type?: 'normal' | 'selection' | 'option' | 'tag' | 'expand' | string
  label: string
  prop: string
  width?: string
  align?: 'left' | 'center' | 'right'
  // 自定义 render
  render?: (scope: any) => JSX.Element
  fixed?: 'left' | 'right'
  api?: any
}
