import { unref } from 'vue'
import * as echarts from 'echarts/core'
import { BarChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  PieChart,
])

export function useECharts(elRef: any) {
  let chartInstance: any

  function initEcharts() {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }
    chartInstance = echarts.init(el)
    chartInstance.style = ''
  }

  function setOptions(option: any) {
    initEcharts()
    chartInstance?.setOption(option)
  }

  function resize() {
    chartInstance?.resize()
  }
  onMounted(() => {
    window.addEventListener('resize', resize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', resize)
  })

  return {
    setOptions,
    chartInstance,
  }
}
