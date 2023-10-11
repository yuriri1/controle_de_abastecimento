<template>
  <button class="custom-button" @click="handleClick">
    {{ buttonText }}
  </button>
</template>

<script setup>
import { } from 'vue';

const props = defineProps(['buttonText']);
const emit = defineEmits();

const handleClick = () => {
  emit('clickado');
};

</script>

<style scoped lang="scss">
.custom-button {
  padding: 10px 20px;
  font-size: 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: var(--accent);
  color: var(--primary);
  box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.3)
}

.custom-button:hover {
  background-color: var(--accent-hover);
}

.custom-button:active {
  transform: translateY(2px);
}
</style>
