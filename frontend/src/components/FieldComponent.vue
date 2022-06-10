<template>
  <div class="mb-3 form-floating">
    <input
      :type="field.type"
      class="form-control"
      :id="field.id"
      v-bind:class="{ 'is-invalid': response.username }"
      placeholder="name@example.com"
    />
    <label :for="field.label">{{ field.label }}</label>
    <div id="validationServerUsernameFeedback" class="invalid-feedback">
      {{ response[field.id] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FieldComponent",
  props: {
    field: Object,
    response: Object,
  },
};
</script>

<style lang="scss"></style>
