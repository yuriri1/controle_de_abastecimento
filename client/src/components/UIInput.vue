<template>
  <div class="custom-input">
    <label>{{ label }}</label>
    <input v-bind="$attrs" v-model="inputValue" :type="type" :placeholder="placeholder" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  limitedChars: {
    type: Number,
    default: 255,
  },
});

const { type, placeholder, value, label } = props;
const inputValue = ref(value);

const clearField = () => {
  inputValue.value = "";
}

const populateField = (value) => {
  inputValue.value = value;
}

defineExpose({
  clearField,
  populateField,
})

</script>

<style scoped lang="scss">
.custom-input {
  display: flex;
  flex-direction: column;
  align-items: start;

  label {
    font-size: 1.25rem;
  }

  input {
    background-color: var(--secondary);
    padding: 10px;
    border: 1px solid var(--light);
    border-radius: 4px;
    font-size: 1.5rem;
    width: 37.5vw;
  }

  input:focus {
    outline: none;
    border: 1px solid var(--accent);
    box-shadow: 0 0 0 1px var(--accent);
  }
}
</style>
