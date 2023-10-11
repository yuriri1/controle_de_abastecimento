<template>
  <h2>Abastecimentos</h2>
  <div class="consulta-list">
    <div class="header">
      <span class="placa">Placa</span>
      <span class="modelo">Modelo</span>
      <span class="tanque">C. tanque</span>
      <span class="combustivel">Combustível</span>
      <span class="abast-total">Abast. total</span>
      <span class="litros">Litros</span>
      <span class="valor">Valor</span>
      <span class="data">Data</span>
    </div>
    <div v-if="abastecimentos.length == 0">
      <span class="material-icons" style="font-size: 3rem;">filter_alt_off</span>
    </div>
    <div v-else v-for="abastecimento in abastecimentos" class="card">
      <span class="placa">{{ abastecimento.placa }}</span>
      <span class="modelo">{{ abastecimento.modelo.descricao }}</span>
      <span class="tanque">{{ abastecimento.modelo.capactanque }}</span>
      <span class="combustivel">{{ abastecimento.tipocombustivel }}</span>
      <span class="abast-total">{{ abastecimento.abasttotal }}</span>
      <span class="litros">{{ abastecimento.quantidade }}</span>
      <span class="valor">{{ abastecimento.valortotal }}</span>
      <span class="data">{{ abastecimento.data }}</span>
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  abastecimentos: {
    type: Array,
    required: true
  }
});


</script>
<style lang="scss">
h2 {
  color: var(--accent);
  font-size: 2.5vw;
  margin: 1vw;
  text-align: center;
}

.consulta-list {
  margin: 1vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid var(--accent);
    padding-bottom: 10px;
    margin-bottom: 10px;
    font-weight: bold;

    span {
      width: 100%;
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

    .combustivel {
      width: 13%;
    }

    .abast-total {
      width: 9%;
    }

    .litros {
      width: 9%;
    }

    .valor {
      width: 10%;
    }

    .data {
      width: 14%;
    }
  }

  .card {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid var(--accent);
    padding-bottom: 10px;
    margin-bottom: 10px;

    span {
      width: 100%;
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

    .combustivel {
      width: 13%;
    }

    .abast-total {
      width: 9%;
    }

    .litros {
      width: 9%;
    }

    .valor {
      width: 10%;
    }

    .data {
      width: 14%;
    }
  }


}
</style>
