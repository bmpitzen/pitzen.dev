<script setup lang="ts">
import * as z from "zod";
import { ref, h } from "vue";
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

  contactReason: z
    .enum(["Job", "Fun", "Curiosity", "We met at WWDC"]),
    
  message: z.string().min(4, {
    message:
      "Please let me know a brief description of why you are reaching out.",
  }),
});

const formValues = ref({});

function onSubmit(event: Event) {
  event.preventDefault();
  const contactForm = ref<HTMLFormElement | null>(null);
  let formData = new FormData(contactForm.value);

  formData.append("form-name", "contact"); // Name of the form

  for (const [key, value] of Object.entries(formValues.value)) {
    formData.append(key, value as string);
  }
  console.log("Form data:", formData);

  fetch("/", {
    method: "POST",
    body: formData,
  })
    .then(() => {
      toast({
        title: "Thank you for contacting me. I'll be in touch soon!",
      });
      form.reset();
    })
    .catch((error) => {
      console.error("Form submission error:", error);
      toast({
        title: "Oops! Something went wrong. Please try again.",
      });
    });
}
</script>

<template>
  <form
    ref="contactForm"
    name="contact"
    method="POST"
    data-netlify="true"
    @submit="onSubmit"
  >
    <AutoForm
      class="w-2/3 space-y-6 form"
      :schema="schema"
      :field-config="{
        fullName: { label: 'Full Name' },
        email: { label: 'Email' },
        contactReason: { label: 'Contact Reason' },
        message: { label: 'Message' },
      }"
      v-model="formValues"
    >
      <input type="hidden" name="form-name" value="contact" />
      <Button @click="onSubmit" type="submit"> Submit </Button>
    </AutoForm>
  </form>
  <Toaster class="rounded-lg" />
</template>

<style scoped>
.form {
  margin: 5rem auto;
  max-width: 40rem;
}
</style>
