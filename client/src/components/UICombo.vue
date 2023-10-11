<template>
  <div class="custom-combobox">
    <label>{{ label }}</label>
    <select v-model="selectedOption">
      <option :value="null" disabled>-- Selecione uma opção --</option>
      <option v-for="option in options" :value="option.value" :key="option.key">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  value: {
    type: String || null,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
});

const selectedOption = ref(props.value);

const clearField = () => {
  selectedOption.value = null;
};

const populateField = (value) => {
  for (const option of props.options) {
    if (option.value === value) {
      selectedOption.value = option.value;
      break;
    }
  }
};

const emit = defineEmits();

watch(selectedOption, (newValue) => {
  emit('update', newValue);
});

defineExpose({
  clearField,
  populateField,
});

</script>

<style scoped lang="scss">
.custom-combobox {
  display: flex;
  flex-direction: column;

  label {
    font-size: 1.25rem;
  }

  select {
    width: 37.5vw;
    padding: 10px;
    border: 1px solid var(--light);
    border-radius: 4px;
    font-size: 1.5rem;
    background-color: var(--secondary);

    &:focus {
      border: 1px solid var(--accent);
    }
  }

  option {
    font-size: 1.5rem;
  }
}
</style>
