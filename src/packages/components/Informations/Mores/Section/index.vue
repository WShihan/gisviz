<template>
  <div class="section">
    <div class="section-head" :style="headStyle">
      <div class="title">
        <span>{{ props.chartConfig.option.name }}</span>
      </div>
    </div>
    <div class="section-body" :style="bodyStyle">
      <div class="section-body-inner"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { option } from './config'
import { computed } from 'vue'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const opt = props.chartConfig.option as typeof option

const headStyle = computed(() => {
  return {
    height: `${opt.nameHeight}px`,
    color: opt.nameColor,
    fontSize: `${opt.nameFontSize}px`,
    backgroundColor: opt.nameBackgroundColor,
    backgroundImage: `url('${opt.nameBackgroundImage}') `,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%'
  }
})

const bodyStyle = computed(() => {
  return {
    backgroundColor: opt.bodyBackgroundColor,
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url('${opt.bodyBackgroundImage}')`
  }
})
</script>

<style scoped lang="scss">
.section {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  .section-head {
    display: flex;
    .title {
      display: flex;
      align-items: center;
      justify-items: center;
      padding: 0.5em 2em;
    }
  }

  .section-body {
    flex: 1;
    padding: 1em;
    padding-top: 0em;
    .section-body-inner {
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
    }
  }
}
</style>
