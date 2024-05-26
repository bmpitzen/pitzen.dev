<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
</script>

<template>
  <Menubar class="menubar p-2">
    <NuxtLink class="logo" to="/">Brandon Pitzen</NuxtLink>
    <div class="right">
      <MenubarMenu>
        <MenubarTrigger>Menu</MenubarTrigger>
        <MenubarContent>
          <MenubarItem><NuxtLink to="experience">Experience</NuxtLink></MenubarItem>
          <MenubarSeparator />
          <MenubarItem><NuxtLink to="about">About</NuxtLink></MenubarItem>
          <MenubarSeparator />
          <MenubarItem><NuxtLink to="contact">Contact</NuxtLink></MenubarItem>
          <MenubarSeparator />
          <MenubarItem><a href="">Resume</a></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <ThemeSwitcher />
    </div>
  </Menubar>
  <slot />
</template>

<style scoped>
.logo {
  flex: 1;
}

.right {
  display: flex;
  gap: 1rem;
  margin-left: auto;
}

.menubar {
  background-color: var(--spruce);
  border: none;
  border-radius: 0 0 6px 6px;
  margin: 0 14px;
  height: 3rem;
}
</style>
