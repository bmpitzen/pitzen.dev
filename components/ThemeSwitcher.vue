<script setup lang="ts">
import { useColorMode, useCycleList } from '@vueuse/core'
import { watchEffect } from 'vue-demi'

const mode = useColorMode({
  emitAuto: true,
})

const { state, next } = useCycleList(['dark', 'light', 'auto'], { initialValue: mode })

watchEffect(() => mode.value = state.value as any)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="inline-block px-4 py-2 text-white bg-blue-600 rounded">
      Theme
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="state= 'auto'">
        System
      </DropdownMenuItem>
      <DropdownMenuItem @click="state= 'light'">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="state= 'dark'">
        Dark
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style>
</style>
