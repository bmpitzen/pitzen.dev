<script setup lang="ts">
import { MenubarTrigger, type MenubarTriggerProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<MenubarTriggerProps & { class?: string }>()
</script>

<template>
  <MenubarTrigger
    v-bind="props"
    :class="
      cn(
        'flex cursor-pointer select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent hover:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-primary',
        props.class,
      )
    "
  >
    <slot />
  </MenubarTrigger>
</template>
