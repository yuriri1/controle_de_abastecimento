<template>
  <div class="list-section">
    <h2>Veículos</h2>
    <div class="header">
      <span class="placa">Placa</span>
      <span class="modelo">Modelo</span>
      <span class="obs">Observações</span>
      <span class="opcoes">Opções</span>
    </div>
    <pulse-loader :loading="!loading" :color="`var(--accent)`" :size="`30px`" />
    <div class="veiculo-list" v-show="loading">
      <div class="veiculo-item" v-for="veiculo in veiculos" :key="veiculo.placa">
        <span class="placa">{{ veiculo.placa }}</span>
        <span class="modelo">{{ veiculo.modelo.descricao }}</span>
        <span class="obs">{{ veiculo.obs }}</span>
        <div class="opcoes">
          <span class="material-icons" style="margin-right: 10px;" @click="editVeiculo(veiculo.placa)">
            edit
          </span>
          <span class="material-icons" style="margin-left: 10px;" @click="deleteVeiculo(veiculo.placa)">
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
  veiculos: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['delete', 'edit']);

const editVeiculo = (placa) => {
  emit('edit', placa);
};

const deleteVeiculo = (placa) => {
  emit('delete', placa);
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

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .placa {
      width: 20%;
    }

    .modelo {
      width: 20%;
    }

    .obs {
      width: 40%;
    }

    .opcoes {
      width: 20%;
    }
  }

  .veiculo-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 1.25rem;

    .veiculo-item {
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

      .placa {
        width: 20%;
      }

      .modelo {
        width: 20%;
      }

      .obs {
        width: 40%;
      }

      .opcoes {
        width: 20%;
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