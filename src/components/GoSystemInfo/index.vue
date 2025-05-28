<template>
  <n-modal v-model:show="modelShowRef" @afterLeave="closeHandle">
    <n-list bordered class="go-system-info">
      <template #header>
        <n-space justify="space-between">
          <n-h3 class="go-mb-0">关于我们</n-h3>
          <n-icon size="20" class="go-cursor-pointer" @click="closeHandle">
            <close-icon></close-icon>
          </n-icon>
        </n-space>
      </template>

      <n-list-item>
        <n-space class="go-my-2" :size="20">
          <n-text class="item-left">版权声明：</n-text>
          <n-text>
            GoView 版权属于
            <n-a href="https://gitee.com/MTrun/go-view" target="_blank">https://gitee.com/MTrun/go-view</n-a> 项目作者
          </n-text>
        </n-space>
      </n-list-item>
      <n-list-item>
        <n-space class="go-my-2" :size="20">
          <n-text class="item-left">版权声明：</n-text>
          <n-text>
            GISViz 版权属于
            <n-a href="https://gitee.com/MTrun/go-view" target="_blank">https://github.com/WShihan/gisviz.git</n-a>
            项目作者
          </n-text>
        </n-space>
      </n-list-item>
    </n-list>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { icon } from '@/plugins'

const props = defineProps({
  modelShow: Boolean
})

const emit = defineEmits(['update:modelShow'])
const { HelpOutlineIcon, CloseIcon } = icon.ionicons5
const modelShowRef = ref(false)

watch(
  () => props.modelShow,
  newValue => {
    modelShowRef.value = newValue
  }
)

const closeHandle = () => {
  emit('update:modelShow', false)
}
</script>

<style lang="scss" scoped>
@include go('system-info') {
  @extend .go-background-filter;
  min-width: 100px;
  max-width: 60vw;
  padding-bottom: 20px;
  .item-left {
    width: 200px;
  }
  @include deep() {
    .n-list-item:not(:last-child) {
      border-bottom: 0;
    }
  }
}
</style>
