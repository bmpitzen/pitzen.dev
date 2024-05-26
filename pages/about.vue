<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
</script>

<template>
  <div class="container grid grid-cols-3 mt-10">
    <div class="col-span-2"">
      <h1>About</h1>
      <p class="scroll-m-20 text-lg font-medium text-gray-500 lg:text-xl">
        I am a software engineer with a passion for creating and building
        things. I have experience in full-stack development, with a focus on
        front-end technologies. I am always looking for new opportunities to
        learn and grow.
      </p>
    </div>

    <div class="col-start-3 flex items-center gap-2 justify-center">
      <Avatar size="xl" shape="square">
        <AvatarImage 
          src="https://bmpitzen-portfolio.s3.us-east-2.amazonaws.com/Brandon_Hat_Sage_v2.png"
          alt="Brandon Pitzen"
        />
        <AvatarFallback>BP</AvatarFallback>
      </Avatar>
    </div>
  </div>
</template>
