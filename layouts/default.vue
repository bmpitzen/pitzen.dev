<script setup lang="ts">
import {
  Menubar,
} from "@/components/ui/menubar";
</script>

<template>
  <Menubar>
    <div class="logo">Brandon Pitzen</div>
    <div class="theme-switcher">
      <ThemeSwitcher />
    </div>
  </Menubar>
  <slot />
</template>

<style scoped>
.logo {
  flex: 1;
}

.theme-switcher {
  margin-left: auto;
}
</style>

