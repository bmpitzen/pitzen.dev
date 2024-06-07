<template>
  <form
    @submit.prevent="handleSubmit"
    action="/"
    method="POST"
    data-netlify="true"
    name="my-form"
  >
    <input type="hidden" name="form-name" value="my-form" />
    <p class="hidden">
      <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
    </p>
    <!-- Your form fields here -->
    <div style="width: 33%; display: flex; flex-direction: column; gap: 2rem;">
      <input type="text" name="name" v-model="formFields.name" placeholder="Name" />
      <input type="email" name="email" v-model="formFields.email" placeholder="Email" />
      <textarea name="message" v-model="formFields.message" placeholder="Message"></textarea>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const formFields = ref({
      name: '',
      email: '',
      message: ''
    })

    const handleSubmit = () => {
      const form = document.querySelector('form')
      const formData = new FormData(form)
      formData.append('form-name', 'my-form')

      console.log('Form data:', Object.fromEntries(formData))

      fetch('/', {
        // Your fetch options here
      })
      // Handle the fetch response here
    }

    return {
      formFields,
      handleSubmit
    }
  }
}
</script>
