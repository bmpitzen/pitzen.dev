<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

// Password protection
const isAuthenticated = ref(false)
const passwordInput = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

// Files available for download
// Use local paths (/downloads/file.pdf) or external URLs (https://...)
const files = [
  {
    name: 'Setup_Info.zip',
    description: 'Setup information for new Macs',
    path: 'https://drop.ui.com/35205f7e-a02f-4d2d-9a1b-e47e2f2dae00'
  },
]

const checkPassword = async () => {
  if (!passwordInput.value) {
    errorMessage.value = 'Please enter a password'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch('/api/verify-password', {
      method: 'POST',
      body: {
        password: passwordInput.value
      }
    })

    if (response.success) {
      isAuthenticated.value = true
      errorMessage.value = ''
      passwordInput.value = ''
    } else {
      errorMessage.value = 'Incorrect password'
      passwordInput.value = ''
    }
  } catch (error) {
    errorMessage.value = 'Incorrect password'
    passwordInput.value = ''
  } finally {
    isLoading.value = false
  }
}

// SEO: Block search engines and AI crawlers
useHead({
  title: 'Downloads',
  meta: [
    { name: 'robots', content: 'noindex, nofollow, noarchive, nosnippet' },
    { name: 'googlebot', content: 'noindex, nofollow' },
    { name: 'bingbot', content: 'noindex, nofollow' },
    { name: 'AdsBot-Google', content: 'noindex, nofollow' },
    { name: 'robots', content: 'noimageindex' },
  ]
})
</script>

<template>
  <div class="container max-w-2xl mx-auto mt-20 mb-20">
    <!-- Password Entry Form -->
    <Card v-if="!isAuthenticated" class="w-full">
      <CardHeader>
        <CardTitle>Access Required</CardTitle>
        <CardDescription>Please enter the password to access downloads</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="checkPassword" class="space-y-4">
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              v-model="passwordInput"
              placeholder="Enter password"
              autocomplete="off"
            />
            <p v-if="errorMessage" class="text-sm" style="color: var(--destructive)">
              {{ errorMessage }}
            </p>
          </div>
          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? 'Verifying...' : 'Submit' }}
          </Button>
        </form>
      </CardContent>
    </Card>

    <!-- Downloads List -->
    <div v-else class="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Available Downloads</CardTitle>
          <CardDescription>Click any file to download</CardDescription>
        </CardHeader>
      </Card>

      <Card v-for="file in files" :key="file.path" class="cursor-pointer hover:bg-accent transition-colors">
        <a :href="file.path" :download="file.name" class="block">
          <CardHeader>
            <CardTitle class="text-lg">{{ file.name }}</CardTitle>
            <CardDescription>{{ file.description }}</CardDescription>
          </CardHeader>
        </a>
      </Card>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
