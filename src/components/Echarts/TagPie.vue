<template>
  <div id="mainChart" ref="chartRef" style="height: 300px"></div>
</template>

<script setup lang="ts">
import { getRelation } from '@/api/modules/tags'

const chartRef = ref(null)
const { setOptions } = useECharts(chartRef)

onMounted(async () => {
  const { data } = await getRelation()
  setOptions({
    series: [
      {
        type: 'pie',
        radius: '50%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
  })
})
</script>

<style scoped></style>
