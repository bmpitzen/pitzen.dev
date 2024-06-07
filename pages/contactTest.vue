<template>
  <form
    @submit.prevent="handleSubmit"
    action="/"
    method="POST"
    data-netlify="true"
    name="contactForm"
  >
    <input type="hidden" name="form-name" value="contactForm" />
    <p class="hidden">
      <label
        >Don’t fill this out if you're human: <input name="bot-field"
      /></label>
    </p>
    <!-- Your form fields here -->
    <div style="width: 33%; display: flex; flex-direction: column; gap: 2rem">
      <input
        type="text"
        name="name"
        v-model="formFields.name"
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        v-model="formFields.email"
        placeholder="Email"
      />
      <textarea
        name="message"
        v-model="formFields.message"
        placeholder="Message"
      ></textarea>
      <button type="submit">Submit</button>
    </div>
  </form>
  <Toaster class="rounded-lg" />
</template>

<script>
import { ref } from "vue";
import { toast } from "@/components/ui/toast";

export default {
  setup() {
    const formFields = ref({
      name: "",
      email: "",
      message: "",
    });

    const handleSubmit = () => {
      const form = document.querySelector("form");
      const formData = new FormData(form);
      formData.append("form-name", "contactForm");

      console.log("Form data:", Object.fromEntries(formData));

      fetch("/", {
        method: "POST",
        body: formData,
      })
        .then(() => {
          toast({
            title: "Thank you for contacting me. I'll be in touch soon!",
          });
          contactForm.value?.reset();
        })
        .catch((error) => {
          console.error("Form submission error:", error);
          toast({ title: "Oops! Something went wrong. Please try again." });
        });
    };

    return {
      formFields,
      handleSubmit,
    };
  },
};
</script>
