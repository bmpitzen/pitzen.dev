<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Experience is sourced from resume.md (single source of truth) via a server
// route that reads + parses the file at build time. Editing the résumé updates
// this page. Per-position site-only prose comes from `<!-- site: ... -->`
// blocks in that file (which the PDF build strips).
const { data: resume } = await useAsyncData("resume", () => $fetch("/api/resume"));
const positions = computed(() => resume.value?.positions ?? []);
const earlier = computed(() => resume.value?.earlier ?? []);
</script>

<template>
  <div>
    <div class="container grid grid-cols-1 mt-10 mb-10 lg:grid-cols-3">
      <div
        class="lg:col-start-3 flex items-center gap-2 lg:justify-end justify-center lg:row-start-1 mb-10"
      >
        <Avatar size="xl" shape="square">
          <AvatarImage
            src="https://bmpitzen-portfolio.s3.us-east-2.amazonaws.com/Brandon_Hat_Sage_v2.png"
            alt="Brandon Pitzen"
          />
          <AvatarFallback>BP</AvatarFallback>
        </Avatar>
      </div>
      <div class="col-span-3 lg:col-span-2 lg:row-start-1">
        <h1>Hi! I'm Brandon</h1>
        <p class="scroll-m-20 text-lg lg:text-xl my-4">
          I am a front-end engineer and design systems specialist who is
          passionate about crafting interfaces that are accessible, performant,
          and a joy to build on. Currently, I'm a Senior Software Engineer,
          Front End at Healthie, where I own front-end architecture and build
          the React, TypeScript, and GraphQL components and design systems that
          power the experiences providers and patients rely on every day. I lead
          front-end initiatives, set best practices, and obsess over the details
          - from load times to motion curves - that turn "good" into
          "outstanding."
        </p>
        <p class="scroll-m-20 text-lg lg:text-xl my-4">
          Before Healthie, I spent over three years as a UX Engineer at Jamf
          building and scaling a cross-framework design system - shipping custom
          Web Components, design tokens, and theming consumed across Angular,
          Vue, and React products, and leading a full redesign of the flagship
          Jamf Pro application. Earlier, at McKesson (later Ontada), I served as
          a Scrum Leader and front-end specialist, helping build a
          corporation-wide design system with React, Chakra, and Storybook and
          rebranding our flagship application, Clear Value Plus.
        </p>
        <p class="scroll-m-20 text-lg lg:text-xl my-4">
          Outside of work, I am an avid ultra-marathon runner, hiker, dad, and
          film photography enthusiast. I am always seeking new opportunities to
          learn, grow, and take on new challenges.
        </p>
        <p class="scroll-m-20 text-lg lg:text-xl my-4">
          If you want to connect, feel free to drop me a line at <a href="mailto:brandon@pitzen.dev" style="text-decoration: underline;">brandon@pitzen.dev</a> or find me on <a href="https://mastodon.social/@bmpitzen" style="text-decoration: underline;">Mastodon</a>.
        </p>
      </div>
    </div>
    <div class="experience-page container grid grid-cols-3 mt-10 mb-20">
      <div class="col-span-3">
        <h1 class="my-4">Experience</h1>
        <div class="experience-cards">
          <job-info
            v-for="job in positions"
            :key="job.company"
            :jobTitle="job.title"
            :company="job.company"
            :startDate="job.start"
            :endDate="job.end"
          >
            <template v-slot:description>
              <p v-html="job.introHtml" />
              <div v-if="job.siteHtml" class="site-extra" v-html="job.siteHtml" />
            </template>
            <template v-slot:responsibilities>
              <li v-for="(bullet, i) in job.bulletsHtml" :key="i" v-html="bullet" />
            </template>
          </job-info>

          <div v-if="earlier.length" class="earlier">
            <h2 class="text-2xl font-semibold mt-8 mb-3">Earlier Experience</h2>
            <ul class="list-disc ml-6 [&>li]:mt-2">
              <li v-for="(role, i) in earlier" :key="i" v-html="role.html" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.experience-page {
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 2rem;
  margin-right: auto;
}
.experience-cards {
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 1rem;
  margin: auto;
}

.site-extra {
  margin-top: 0.75rem;
  color: var(--natural);
  opacity: 0.9;
}
.site-extra :deep(p) {
  margin-top: 0.5rem;
}
</style>
