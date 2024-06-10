<template>
 <!--   <AutoForm
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
      <input type="hidden" name="form-name" value="contact" />
      <Button type="submit">Submit</Button>
    </AutoForm>
  <Toaster class="rounded-lg" /> -->
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
  contactReason: z.enum(["WWDC", "Work", "Fun"]),
  message: z.string().min(4, {
    message:
      "Hey! How can I help you?",
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

function onSubmit(values) {
  console.log(values);
  toast({
    title: "Thank you for contacting me. I'll be in touch soon!",
    description: JSON.stringify(values, null, 2),
  });

}

// Handle form submission
// function onSubmit(event: Event) {
//   event.preventDefault(); // Prevent default form submission

//   if (!contactForm.value) {
//     console.error("Contact form element is not found.");
//     return;
//   }

//   const formData = new FormData(contactForm.value);
//   console.log("Form data pre:", Object.fromEntries(formData));
//   formData.append("form-name", "contact"); // Add the form name to the form data

//   for (const [key, value] of Object.entries(formValues.value)) {
//     formData.append(key, value);
//   }

//   console.log("Form data post:", Object.fromEntries(formData));

//   // Form submission handling
//   fetch("/", {
//     method: "POST",
//     body: formData,
//   })
//     .then(() => {
//       toast({ title: "Thank you for contacting me. I'll be in touch soon!" });
//       contactForm.value?.reset();
//     })
//     .catch((error) => {
//       console.error("Form submission error:", error);
//       toast({ title: "Oops! Something went wrong. Please try again." });
//     });
// }
</script>
