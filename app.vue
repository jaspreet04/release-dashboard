<template>
  <div>
      {{data}}
  </div>
</template>

<script setup>
const { data } = await useFetch(() => `/api/jira/issues?version=app-5.17`)

</script>