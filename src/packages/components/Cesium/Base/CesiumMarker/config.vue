<template>
  <collapse-item name="基础配置" :expanded="true" key="baseSetting">
    <CesiumBasicOptionEdit :basic-option="optionState" @update="onUpdate" />
    <SettingItemBox name="图标">
      <SettingItem>
        <n-input-number v-model:value="optionState.markerSize" placeholder="尺寸" />
      </SettingItem>
    </SettingItemBox>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, reactive, nextTick, ref, computed, watch } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import cloneDeep from 'lodash/cloneDeep'
import { cesiumBasicOption } from '../../index.d'
import CesiumBasicOptionEdit from '../../components/CesiumBasicOptionEdit.vue'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const cloneViewOpts = cloneDeep(props.optionData.viewOptions)
const optionState = reactive(cloneViewOpts)

const onUpdate = (val: typeof cesiumBasicOption) => {
  Object.assign(optionState, val)
}

watch(
  () => optionState,
  val => {
    props.optionData.viewOptions = Object.assign(props.optionData.viewOptions, optionState)
  },
  {
    deep: true
  }
)
</script>
