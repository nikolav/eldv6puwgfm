<script setup lang="ts">
import { schemaEmail } from "@/schemas";

const emit = defineEmits<{
  (e: "emailSaved"): void;
}>();
const emailSaved$ = useLocalStorage(
  "vJzNqkL6W6V25vPeOJf",
  () => <Record<string, number>>{}
);
const { MAILING_LIST } = useTopics();
const { commit } = useDocs<{ email: string }>(MAILING_LIST);

const mailSave = async (emailsave: string | undefined) => {
  let email;
  let err;
  try {
    email = schemaEmail.parse(emailsave);
    if (!(email in emailSaved$.value)) {
      await commit({ email });
      // cache for duplicate saves
      emailSaved$.value[email] = 1;
    }
  } catch (error) {
    err = error;
  }
  if (!err) emit("emailSaved");
};
// @@eos
</script>
<template>
  <slot :save="mailSave" />
</template>
<style lang="scss" scoped></style>
