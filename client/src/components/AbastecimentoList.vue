<template>
  <div class="list-section">
    <h2>Abastecimentos</h2>
    <div class="header">
      <span class="placa">Placa</span>
      <span class="modelo">Modelo</span>
      <span class="tanque">C. tanque</span>
      <span class="kmatual">KM atual</span>
      <span class="combustivel">Combustível</span>
      <span class="abast-total">Abast. total</span>
      <span class="litros">Litros</span>
      <span class="valor">Valor</span>
      <span class="data">Data</span>
      <span class="opcoes">Opções</span>
    </div>
    <pulse-loader :loading="!loading" :color="`var(--accent)`" :size="`30px`" />
    <div class="abastecimento-list">
      <div v-for="abastecimento in abastecimentos" :key="abastecimento.id" class="abastecimento-item">
        <span class="placa">{{ abastecimento.placa }}</span>
        <span class="modelo">{{ abastecimento.modelo.descricao }}</span>
        <span class="tanque">{{ abastecimento.modelo.capactanque }}</span>
        <span class="kmatual">{{ abastecimento.kmatual }}</span>
        <span class="combustivel">{{ abastecimento.tipocombustivel }}</span>
        <span class="abast-total">{{ abastecimento.abasttotal }}</span>
        <span class="litros">{{ abastecimento.quantidade }}</span>
        <span class="valor">{{ abastecimento.valortotal }}</span>
        <span class="data">{{ abastecimento.data }}</span>
        <div class="opcoes">
          <span class="material-icons" style="margin-right: 10px;"
            @click="editAbastecimento(abastecimento.id)">edit</span>
          <span class="material-icons" style="margin-left: 10px;"
            @click="deleteAbastecimento(abastecimento.id)">delete</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onUpdated } from 'vue';

const loading = ref(false);

const props = defineProps({
  abastecimentos: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete']);

const editAbastecimento = (id) => {
  emit('edit', id);
}

const deleteAbastecimento = (id) => {
  emit('delete', id);
}

onUpdated(() => {
  loading.value = true;
});

</script>
<style lang="scss">
h2 {
  color: var(--accent);
  font-size: 2.5vw;
  margin: 1vw;
  text-align: center;
}

.list-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;


  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid var(--accent);
    padding-bottom: 10px;
    font-weight: bold;
    font-size: 1.25rem;

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }

    .placa {
      width: 8%;
    }

    .modelo {
      width: 9%;
    }

    .tanque {
      width: 7%;
    }

    .kmatual {
      width: 9%;
    }

    .combustivel {
      width: 13%;
    }

    .abast-total {
      width: 7%;
    }

    .litros {
      width: 4%;
    }

    .valor {
      width: 7%;
    }

    .data {
      width: 10%;
    }

    .opcoes {
      width: 7%;
    }
  }

  .abastecimento-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    .abastecimento-item {
      width: 100%;
      height: 50px;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-around;
      border-bottom: 1px solid var(--accent);
      padding-bottom: 10px;

      span {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }

      .placa {
        width: 8%;
      }

      .modelo {
        width: 9%;
      }

      .tanque {
        width: 7%;
      }

      .kmatual {
        width: 9%;
      }

      .combustivel {
        width: 13%;
      }

      .abast-total {
        width: 7%;
      }

      .litros {
        width: 4%;
      }

      .valor {
        width: 7%;
      }

      .data {
        width: 10%;
      }

      .opcoes {
        width: 7%;
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
