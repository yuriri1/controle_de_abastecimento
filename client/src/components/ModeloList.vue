<template>
  <div class="list-section">
    <h2>Modelos</h2>
    <div class="header">
      <span class="desc">Descricão</span>
      <span class="capac">Capacidade do tanque</span>
      <span class="opcoes">Opções</span>
    </div>
    <pulse-loader :loading="!loading" :color="`var(--accent)`" :size="`30px`" />
    <div class="modelo-list" v-show="loading">
      <div class="modelo-item" v-for="modelo in modelos" :key="modelo.id">
        <span class="desc">{{ modelo.descricao }}</span>
        <span class="capac">{{ modelo.capactanque }} L</span>
        <div class="opcoes">
          <span class="material-icons" style="margin-right: 10px;" @click="editModelo(modelo.id)">
            edit
          </span>
          <span class="material-icons" style="margin-left: 10px;" @click="deleteModelo(modelo.id)">
            delete
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onUpdated } from 'vue';

const loading = ref(false);

const props = defineProps({
  modelos: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['delete', 'edit']);

const editModelo = (id) => {
  emit('edit', id);
};

const deleteModelo = (id) => {
  emit('delete', id);
};

onUpdated(() => {
  loading.value = true;
});

</script>
<style lang="scss">
.list-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;


  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--accent);
    font-weight: bold;
    font-size: 1.25rem;

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }

    .desc {
      width: 40%;
    }

    .capac {
      width: 30%;
    }

    .opcoes {
      width: 30%;
    }
  }

  .modelo-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 1.25rem;

    .modelo-item {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
      height: 50px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--accent);

      span {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }

      .desc {
        width: 40%;
      }

      .capac {
        width: 30%;
      }

      .opcoes {
        width: 30%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        cursor: pointer;

        span {
          &:hover {
            transform: scale(1.5);
            color: var(--accent);
            border-radius: 50%;
            background-color: var(--primary);
          }
        }
      }

      &:hover {
        background-color: var(--accent);
        color: var(--primary);
      }
    }
  }
}
</style>