<script setup lang="ts">
import * as z from "zod";
import { h } from "vue";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { AutoForm, AutoFormField } from "@/components/ui/auto-form";

const schema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),

  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(2, {
      message: "Password must be at least 2 characters.",
    }),
});

function onSubmit(values) {
  console.log(values);
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
}
</script>

<template>
  <AutoForm
    class="w-2/3 space-y-6"
    :schema="schema"
    :field-config="{
      password: {
        label: 'Your secure password',
        inputProps: {
          type: 'password',
          placeholder: '••••••••',
        },
      },
    }"
    @submit="onSubmit"
  >
    <Button type="submit"> Submit </Button>
  </AutoForm>
</template>
