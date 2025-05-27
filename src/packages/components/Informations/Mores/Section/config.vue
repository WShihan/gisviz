<template>
  <collapse-item name="属性" :expanded="true">
    <setting-item-box name="标题">
      <setting-item name="名称">
        <n-input v-model:value="props.optionData.name" size="small" placeholder="标题" />
      </setting-item>
      <setting-item name="字号">
        <n-input-number v-model:value="props.optionData.nameFontSize" size="small" :min="0" placeholder="标题字体" />
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker v-model:value="props.optionData.nameColor" size="small" placeholder="标题颜色" />
      </setting-item>
      <setting-item name="高度">
        <n-input-number v-model:value="props.optionData.nameHeight" size="small" :min="0" placeholder="标题高度" />
      </setting-item>
      <setting-item name="背景色">
        <n-color-picker v-model:value="optionData.nameBackgroundColor" placeholder="标题背景色" />
      </setting-item>
      <setting-item name="背景图片">
        <n-input v-model:value="optionData.nameBackgroundImage" placeholder="标题背景图片" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="内容区">
      <setting-item name="背景颜色">
        <n-color-picker v-model:value="optionData.bodyBackgroundColor" placeholder="主体背景颜色" />
      </setting-item>
      <setting-item name="背景图片">
        <n-input v-model:value="optionData.bodyBackgroundImage" placeholder="主体背景图片"></n-input>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

console.log('optionData', props.optionData)
</script>
