<template>
  <div class="go-aside-footer">
    <n-divider class="go-mt-0"></n-divider>
    <n-space justify="space-around" :vertical="collapsed">
      <n-tooltip v-if="collapsed" placement="right" trigger="hover">
        <template #trigger>
          <n-button class="go-ml-2" secondary @click="handleDoc">
            <template #icon>
              <n-icon size="18">
                <code-slash-icon></code-slash-icon>
              </n-icon>
            </template>
          </n-button>
        </template>
        <n-text>
          {{ $t('global.code_addr') }}
        </n-text>
      </n-tooltip>

      <n-button v-else secondary @click="handleCode">
        <template #icon>
          <n-icon size="18">
            <code-slash-icon></code-slash-icon>
          </n-icon>
        </template>
        <n-text v-show="!collapsed">{{ $t('global.code_addr') }}</n-text>
      </n-button>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import { openDoc, openGiteeSourceCode, openNewWindow } from '@/utils'

import { icon } from '@/plugins'
const { DocumentTextIcon, CodeSlashIcon, ChevronForwardIcon } = icon.ionicons5

const props = defineProps({
  collapsed: Boolean
})

const handleDoc = () => {
  openDoc()
}

const handleCode = () => {
  openGiteeSourceCode()
}
</script>

<style lang="scss" scoped>
@include go('aside-footer') {
  padding-bottom: 20px;
  .pointer-invest-btn {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    padding: 7px;
    cursor: pointer;
    background-color: #f1f1f1;
    border: 1px solid #e2e2ef;
    border-radius: 6px;
    overflow: hidden;
    .btn-left {
      display: flex;
      align-items: center;
      img.main-img {
        width: 32px;
        border-radius: 4px;
        overflow: hidden;
      }
      .btn-left-title {
        margin-left: 6px;
        row-gap: 4px;
        display: flex;
        flex-direction: column;
        .title-top,
        .title-bottom {
          font-size: 12px;
          line-height: 15px;
          font-weight: 400;
        }
        .title-top {
          color: #444444;
        }
        .title-bottom {
          color: #5e5e5e;
        }
      }
    }
    &.collapsed {
      padding: 3px;
      .btn-left {
      }
    }
    &::after {
      content: '';
      position: absolute;
      width: 140px;
      height: 26px;
      bottom: 14px;
      top: 0;
      left: -100px;
      background: linear-gradient(120deg, hsla(0, 0%, 100%, 0.05) 10%, hsla(0, 0%, 100%, 0.1) 126%);
      transform: rotate(-45deg);
      animation: blink-quick-3bcb41e9 3s ease-in 0s infinite;
    }
  }
}

@include dark() {
  @include go('aside-footer') {
    .pointer-invest-btn {
      background-color: #2a2a2e;
      border: 1px solid #3e3f43;
      .btn-left-title {
        .title-top {
          color: #c1c1c2;
        }
        .title-bottom {
          color: #959698;
        }
      }
    }
  }
}
</style>
