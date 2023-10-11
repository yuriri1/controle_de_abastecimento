<template>
  <Transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <Transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner" :style="{ '--modalHeight': modalHeight }">
          <span @click="close" class="material-icons">
            close
          </span>
          <slot />
        </div>
      </Transition>
    </div>
  </Transition>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits();

const close = () => {
  emit('update');
};

const props = defineProps({
  modalActive: Boolean,
  modalHeight: String
});

onMounted(() => {
});

</script>
<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: all 0.3s;
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-enter-to,
.modal-animation-leave-from {
  opacity: 1;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  .modal-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--primary);
    padding: 2rem;
    border-radius: 0.5rem;
    width: 50vw;
    height: var(--modalHeight);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    .material-icons {
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
    }
  }
}
</style>