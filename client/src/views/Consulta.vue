<template>
  <main class="consulta-page">
    <h1>Consulta</h1>
    <div class="form-group">
      <div class="placa-modelo">
        <div class="placa-consulta">
          <UIInput v-model="inputPlaca" type="text" placeholder="placa" ref="placa" label="Placa do veículo" />
        </div>
        <div class="modelo-consulta">
          <UICombo :options="comboBoxOptions" @update="handleUpdate" ref="modelo" label="Modelo do veículo" />
        </div>
      </div>

      <div class="datas">
        <div class="data-inicio">
          <UIInput v-model="inputDataInicio" type="date" ref="dataInicio" label="Data inicial" />
        </div>
        <div class="data-fim">
          <UIInput v-model="inputDataFim" type="date" ref="dataFim" label="Data final" />
        </div>
      </div>

      <div class="consulta">
        <UIButton buttonText="Consultar" @click="handleConsulta" />
        <UIButton buttonText="Limpar" @click="handleLimpar" />
      </div>
    </div>
    <ConsultaList :abastecimentos="abastecimentos" />
  </main>
</template>
<script setup>
import UIInput from '../components/UIInput.vue';
import UIButton from '../components/UIButton.vue';
import UICombo from '../components/UICombo.vue';
import ConsultaList from '../components/ConsultaList.vue';
import { cleanFields, cleanRefs } from '../utils/cleaners';
import { useToast } from 'vue-toastification';
import {
  getAbastecimentoByPlaca,
  getAbastecimentoByModelo,
  getAbastecimentoByData,
  getAbastecimentoByPlacaAndData,
  getAbastecimentoByModeloAndData,
  getAbastecimentoByPeriodo,
  getAbastecimentoByPlacaAndPeriodo,
  getAbastecimentoByModeloAndPeriodo,
  getModelos,
  getVeiculosById,
  getCombustiveisById
} from '../services/consultaService'

import { adjustDate } from '../utils/formatter';
import { ref, onMounted } from 'vue'

const toast = useToast();

const comboBoxOptions = ref([]);

const inputPlaca = ref("");
const inputDataInicio = ref("");
const inputDataFim = ref("");
const selectedModelo = ref("");
const abastecimentos = ref([]);

const placa = ref(null);
const modelo = ref(null);
const dataInicio = ref(null);
const dataFim = ref(null);

const handleLimpar = () => {
  cleanRefs([inputPlaca, inputDataInicio, inputDataFim, selectedModelo]);
  cleanFields([placa, modelo, dataInicio, dataFim]);
};

const handleConsulta = () => {

  const conditions = [
    {
      condition: !inputPlaca.value && !inputDataInicio.value && !inputDataFim.value && !selectedModelo.value,
      message: "Preencha algum campo"
    },
    {
      condition: inputPlaca.value && selectedModelo.value,
      message: "Não é possível consultar por placa e modelo ao mesmo tempo"
    },
    {
      condition: inputPlaca.value && inputDataInicio.value && inputDataFim.value,
      action: () => getAbastecimentoByPlacaAndPeriodo(inputPlaca.value, inputDataInicio.value, inputDataFim.value)
    },
    {
      condition: inputPlaca.value && inputDataInicio.value,
      action: () => getAbastecimentoByPlacaAndData(inputPlaca.value, inputDataInicio.value, "inicio")
    },
    {
      condition: inputPlaca.value && inputDataFim.value,
      action: () => getAbastecimentoByPlacaAndData(inputPlaca.value, inputDataFim.value, "fim")
    },
    {
      condition: inputPlaca.value,
      action: () => getAbastecimentoByPlaca(inputPlaca.value)
    },
    {
      condition: selectedModelo.value && inputDataInicio.value && inputDataFim.value,
      action: () => getAbastecimentoByModeloAndPeriodo(selectedModelo.value, inputDataInicio.value, inputDataFim.value)
    },
    {
      condition: selectedModelo.value && inputDataInicio.value,
      action: () => getAbastecimentoByModeloAndData(selectedModelo.value, inputDataInicio.value, "inicio")
    },
    {
      condition: selectedModelo.value && inputDataFim.value,
      action: () => getAbastecimentoByModeloAndData(selectedModelo.value, inputDataFim.value, "fim")
    },
    {
      condition: selectedModelo.value,
      action: () => getAbastecimentoByModelo(selectedModelo.value)
    },
    {
      condition: inputDataInicio.value && inputDataFim.value,
      action: () => getAbastecimentoByPeriodo(inputDataInicio.value, inputDataFim.value)
    },
    {
      condition: inputDataInicio.value,
      action: () => getAbastecimentoByData(inputDataInicio.value, "inicio")
    },
    {
      condition: inputDataFim.value,
      action: () => getAbastecimentoByData(inputDataFim.value, "fim")
    }
  ]

  const matchCondition = conditions.find((condition) => condition.condition);
  if (matchCondition) {
    if (matchCondition.action) {
      matchCondition.action().then((res) => {
        if (res.success) {
          const abastecimentosArr = res.abastecimentos;

          (async () => {
            for (const obj of abastecimentosArr) {
              obj.abasttotal = obj.abasttotal ? "Sim" : "Não";
              obj.tipocombustivel = (await getCombustiveisById(obj.tipocombustivel)).tipo;
              obj.modelo = (await getVeiculosById(obj.placa)).veiculo.modelo;
              obj.data = adjustDate(obj.data);
            }
            abastecimentos.value = abastecimentosArr;
            toast.success("Consulta realizada com sucesso");
          })();
        } else {
          toast.error("Nenhum resultado encontrado");
          abastecimentos.value = [];
        }
      });
    } else {
      toast.info(matchCondition.message);
    }
  }

}

const handleUpdate = (value) => {
  selectedModelo.value = value;
};

const optionsEntry = () => {
  getModelos().then((res) => {
    comboBoxOptions.value = res.modelos.map((modelo) => ({
      value: modelo.id,
      label: `${modelo.descricao} - ${modelo.capactanque}L`
    }));
  });
};

onMounted(() => {
  optionsEntry();
});

</script>
<style lang="scss">
.consulta-page {
  background-color: var(--primary);

  .form-group {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-top: 20px;

    .placa-modelo,
    .datas {
      display: flex;
      flex-direction: row;
      align-items: start;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 20px;
    }

    .placa-consulta,
    .data-inicio,
    .data-fim,
    .modelo-consulta {
      width: 100%;
      margin-bottom: 20px;
    }

    .consulta {
      width: 25vw;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }

  }
}
</style>