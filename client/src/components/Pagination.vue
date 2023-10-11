<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    default: 1
  },
  totalPages: {
    type: Number,
    required: true,
  }
});

const emit = defineEmits(['update']);

const currentPage = ref(props.currentPage);

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    emit('update', currentPage.value);
  }
}

const nextPage = () => {
  if (currentPage.value < props.totalPages) {
    currentPage.value++;
    emit('update', currentPage.value);
  }
}

</script>
<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;

  span {
    margin: 0 1rem;
  }
}
</style>