import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align'
import Prism from 'prismjs'
import type { App } from 'vue'

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
})
// emoji
VueMarkdownEditor.use(createEmojiPlugin())
// todo-list
VueMarkdownEditor.use(createTodoListPlugin())
// 内容定位
VueMarkdownEditor.use(createAlignPlugin())

export function setupMarkDown(app: App) {
  app.use(VueMarkdownEditor)
}
