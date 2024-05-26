<script setup lang="ts">
import * as z from "zod";
import { h } from "vue";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import type { Config } from "@/components/ui/auto-form";
import { AutoForm, AutoFormField } from "@/components/ui/auto-form";

const schema = z.object({
  fullName: z
    .string({
      required_error: "Full name is required.",
    })
    .min(2),

  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Email must be valid.",
    }),

  contactReason: z.enum(["Job", "Fun", "Curiosity"]).optional(),

  message: z.string().min(10, {
    message:
      "Please let me know a a brief description why you are reaching out.",
  }),
});

function onSubmit(values: Record<string, any>) {
  console.log(values);
  toast({
    title: "Thank you for contacting me. I'll be in touch soon!",
  });
}
</script>

<template>
  <AutoForm
    class="w-2/3 space-y-6 form"
    :schema="schema"
    :field-config="{
      fullName: { label: 'Full Name' },
      email: { label: 'Email' },
      contactReason: { label: 'Contact Reason' },
      message: { label: 'Message' },
    }"
    @submit="onSubmit"
  >
    <Button type="submit"> Submit </Button>
  </AutoForm>
  <Toaster class="rounded-lg"/>
</template>

<style scoped>
.form {
  margin: 5rem auto;
  max-width: 40rem;
}
</style>
