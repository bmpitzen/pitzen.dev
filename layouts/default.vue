<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
</script>

<template>
  <Menubar class="menubar p-2">
    <NuxtLink class="logo w-[2rem]" to="/"
      ><img src="assets/spruce.svg"
    /></NuxtLink>
    <div class="right">
     <!--  <MenubarMenu>
        <MenubarTrigger>Menu</MenubarTrigger>
        <MenubarContent>
          <NuxtLink to="/"><MenubarItem>Home</MenubarItem></NuxtLink>
          <MenubarSeparator />
          <NuxtLink to="experience"
            ><MenubarItem>Experience</MenubarItem></NuxtLink
          >
          <MenubarSeparator />
          <NuxtLink to="about"><MenubarItem>About</MenubarItem></NuxtLink>
          <MenubarSeparator />
          <NuxtLink to="contact"><MenubarItem>Contact</MenubarItem></NuxtLink>
          <NuxtLink to="contactTest"><MenubarItem>Contact Test</MenubarItem></NuxtLink>
          <MenubarSeparator />
          <a href=""><MenubarItem>Resume</MenubarItem></a>
        </MenubarContent>
      </MenubarMenu> -->
      <ThemeSwitcher />
    </div>
  </Menubar>
  <slot />
</template>

<style scoped>
.logo img {
  flex: 1;
  max-height: 2rem;
  background-color: var(--natural);
  border-radius: 4px;
}

.right {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
}

.menubar {
  background-color: var(--menu-background);
  border: none;
  border-radius: 0 0 6px 6px;
  margin: 0 14px;
  height: 3rem;
  display: flex;
  justify-content: space-between;

  button {
    background-color: var(--natural);
    border-radius: 4px;
    color: var(--charcoal);
  }
}
</style>
