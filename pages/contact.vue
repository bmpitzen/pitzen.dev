<template>
  <form name="contact" netlify netlify-honeypot="bot-field" hidden>
    <input type="text" name="fullName" />
    <input type="email" name="email" />
    <select name="contactReason">
      <option value="Job">Job</option>
      <option value="Fun">Fun</option>
      <option value="Curiosity">Curiosity</option>
      <option value="We met at WWDC">We met at WWDC</option>
    </select>
    <textarea name="message"></textarea>
  </form>
  <form
    ref="contactForm"
    name="contact"
    method="POST"
    data-netlify="true"
    @submit.prevent="onSubmit"
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
      v-bind="$attrs"
    >
      <input type="hidden" name="form-name" value="contact" />
      <Button type="submit">Submit</Button>
      <!-- Ensure the button does not directly handle click event -->
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

<script setup lang="ts">
import * as z from "zod";
import { ref, onMounted } from "vue"; // Import onMounted to check ref initialization
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { AutoForm } from "@/components/ui/auto-form";

// Define schema
const schema = z.object({
  fullName: z.string({ required_error: "Full name is required." }).min(2),
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Email must be valid." }),
  contactReason: z.enum(["Job", "Fun", "Curiosity", "We met at WWDC"]),
  message: z.string().min(4, {
    message:
      "Please let me know a brief description of why you are reaching out.",
  }),
});

const formValues = ref<{ [key: string]: string }>({});
const contactForm = ref<HTMLFormElement | null>(null);

// Check if contactForm is correctly bound
onMounted(() => {
  if (!contactForm.value) {
    console.error("Contact form ref is not correctly bound.");
  }
});

// Handle form submission
function onSubmit(event: Event) {
  event.preventDefault(); // Prevent default form submission

  if (!contactForm.value) {
    console.error("Contact form element is not found.");
    return;
  }

  const formData = new FormData(contactForm.value);
  formData.append("form-name", "contact"); // Add the form name to the form data

  for (const [key, value] of Object.entries(formValues.value)) {
    formData.append(key, value);
  }

  console.log("Form data:", Object.fromEntries(formData));

  // Form submission handling
  fetch("/", {
    method: "POST",
    body: formData,
  })
    .then(() => {
      toast({ title: "Thank you for contacting me. I'll be in touch soon!" });
      contactForm.value?.reset();
    })
    .catch((error) => {
      console.error("Form submission error:", error);
      toast({ title: "Oops! Something went wrong. Please try again." });
    });
}
</script>
