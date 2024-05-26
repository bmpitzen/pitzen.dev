<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{jobTitle}}</CardTitle>
      <CardDescription>{{ company }}</CardDescription>
      <CardDescription>{{ startDate }} - {{ endDate }}</CardDescription>
    </CardHeader>
    <CardContent>
      <slot name="description" />
      <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
        <slot name="responsibilities" />
      </ul>
      <slot name="footer"> 
      </slot>
    </CardContent>
  </Card>
</template>


<script lang="ts">
export default {
  props: {
    jobTitle: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
  }
}
</script>
