<template>
  <main class="abastecimento-page">
    <UIButton buttonText="Cadastrar abastecimento" @click="toggleModalAdd" />
    <AbastecimentoList :abastecimentos="abastecimentos" @edit="handleEditAbastecimento"
      @delete="handleDeleteAbastecimento" />
    <div class="page">
      <Pagination :currentPage="currentPage" :totalPages="totalPages" @update="setCurrentPage" />
    </div>
  </main>
  <Modal :modalActive="modalAdd" @update="toggleModalAdd" modalHeight="75vh">
    <div class="placa-abast">
      <UIInput v-model="abastecimentoToStore.placa" type="text" placeholder="placa" ref="inputPlacaAdd"
        label="Placa do veículo" />
    </div>

    <div class="data-abast">
      <UIInput v-model="abastecimentoToStore.data" type="datetime-local" ref="inputDataAdd"
        label="Data do abastecimento" />
    </div>

    <div class="combustivel-abast">
      <UICombo :options="optionsCombustivel" @update="handleSelectAdd" ref="selectCombustivelAdd"
        label="Tipo do combustível" />
    </div>

    <div class="abast-total">
      <UIInput v-model="abastecimentoToStore.abasttotal" type="checkbox" ref="inputAbastTotalAdd"
        label="O abastecimento foi total?" />
    </div>

    <div class="litros-abast">
      <UIInput v-model="abastecimentoToStore.quantidade" type="number" placeholder="litros" ref="inputLitrosAdd"
        label="Quatidade de combustível(L)" />
    </div>

    <div class="valor-abast">
      <UIInput v-model="abastecimentoToStore.valortotal" type="number" placeholder="R$" ref="inputValorAdd"
        label="Valor total do abastecimento" />
    </div>

    <div class="km-atual">
      <UIInput v-model="abastecimentoToStore.kmatual" type="number" placeholder="km" ref="inputKmAtualAdd"
        label="Quilometragem atual do veículo" />
    </div>

    <UIButton buttonText="Cadastrar" @click="handleAddAbastecimento" />
  </Modal>

  <Modal :modalActive="modalUpdate" @update="toggleModalUpdate" modalHeight="75vh">
    <div class="placa-abast">
      <UIInput v-model="abastecimentoToUpdate.placa" type="text" placeholder="placa" ref="inputPlacaUpdate"
        label="Placa do veículo" />
    </div>

    <div class="data-abast">
      <UIInput v-model="abastecimentoToUpdate.data" type="datetime-local" ref="inputDataUpdate"
        label="Data do abastecimento" />
    </div>

    <div class="combustivel-abast">
      <UICombo :options="optionsCombustivel" @update="handleSelectUpdate" ref="selectCombustivelUpdate"
        label="Tipo do combustível" />
    </div>

    <div class="abast-total">
      <UIInput v-model="abastecimentoToUpdate.abasttotal" type="checkbox" ref="inputAbastTotalUpdate"
        label="O abastecimento foi total?" />
    </div>

    <div class="litros-abast">
      <UIInput v-model="abastecimentoToUpdate.quantidade" type="number" placeholder="litros" ref="inputLitrosUpdate"
        label="Quatidade de combustível(L)" />
    </div>

    <div class="valor-abast">
      <UIInput v-model="abastecimentoToUpdate.valortotal" type="number" placeholder="R$" ref="inputValorUpdate"
        label="Valor total do abastecimento" />
    </div>
    <div class="km-atual">
      <UIInput v-model="abastecimentoToUpdate.kmatual" type="number" placeholder="km" ref="inputKmAtualUpdate"
        label="Quilometragem atual do veículo" />
    </div>

    <UIButton buttonText="Atualizar" @click="handleUpdateAbastecimento" />
  </Modal>

  <Modal @update="toggleModalDelete" modal-height="15vh" :modal-active="modalDelete">
    <div class="modal-content-confirm">
      <p>Tem certeza que deseja excluir este modelo?</p>
      <UIButton buttonText="Confirmar" @click="deleteAbastecimento" />
    </div>
  </Modal>
</template>
<script setup>
import UIInput from '../components/UIInput.vue';
import UIButton from '../components/UIButton.vue';
import UICombo from '../components/UICombo.vue';
import Modal from '../components/Modal.vue';
import AbastecimentoList from '../components/AbastecimentoList.vue';
import Pagination from '../components/Pagination.vue';
import { cleanFields, cleanObjRefs, cleanRefs } from '../utils/cleaners';
import { useToast } from 'vue-toastification';
import {
  storeAbastecimento,
  getAbastecimentoById,
  getAbastecimentoByPage,
  getVeiculosById,
  getCombustiveis,
  getCombustiveisById,
  getAllAbastecimento,
  deleteAbastecimentoById,
  updateAbastecimento
} from '../services/abastecimentoService';
import { adjustDate } from '../utils/formatter';
import { ref, onMounted, onUpdated } from 'vue'

const toast = useToast();

const abastecimentos = ref([]);

const modalAdd = ref(false);
const modalUpdate = ref(false);
const modalDelete = ref(false);

const abastecimentoToStore = ref({
  placa: "",
  data: "",
  tipocombustivel: "",
  abasttotal: false,
  quantidade: "",
  valortotal: "",
  kmatual: "",
});

const abastecimentoToUpdate = ref({
  placa: "",
  data: "",
  tipocombustivel: "",
  abasttotal: false,
  quantidade: "",
  valortotal: "",
  kmatual: "",
});

const inputPlacaAdd = ref(null);
const inputDataAdd = ref(null);
const selectCombustivelAdd = ref(null);
const inputAbastTotalAdd = ref(null);
const inputLitrosAdd = ref(null);
const inputValorAdd = ref(null);
const inputKmAtualAdd = ref(null);

const inputPlacaUpdate = ref(null);
const inputDataUpdate = ref(null);
const selectCombustivelUpdate = ref(null);
const inputAbastTotalUpdate = ref(null);
const inputLitrosUpdate = ref(null);
const inputValorUpdate = ref(null);
const inputKmAtualUpdate = ref(null);

const idAbastecimento = ref("");

const optionsCombustivel = ref([]);

const currentPage = ref(1);
const totalPages = ref(1);
const pageTofetch = ref(0);

const setCurrentPage = (page) => {
  currentPage.value = page;
  pageTofetch.value = (page - 1) * 10;
  fetchAbastecimentos();
}

const handleSelectAdd = (value) => {
  abastecimentoToStore.value.tipocombustivel = value;
};

const handleSelectUpdate = (value) => {
  abastecimentoToUpdate.value.tipocombustivel = value;
};

const handleAddAbastecimento = async () => {
  if (!abastecimentoToStore.value.placa ||
    !abastecimentoToStore.value.data ||
    !abastecimentoToStore.value.tipocombustivel ||
    !abastecimentoToStore.value.quantidade ||
    !abastecimentoToStore.value.valortotal ||
    !abastecimentoToStore.value.kmatual) {
    toast.info('Preencha todos os campos');
    return;
  }

  const abastecimento = {
    placa: abastecimentoToStore.value.placa.toUpperCase(),
    data: abastecimentoToStore.value.data,
    tipocombustivel: abastecimentoToStore.value.tipocombustivel,
    abasttotal: abastecimentoToStore.value.abasttotal,
    quantidade: abastecimentoToStore.value.quantidade,
    valortotal: abastecimentoToStore.value.valortotal,
    kmatual: abastecimentoToStore.value.kmatual,
  };

  const res = await storeAbastecimento(abastecimento)
  if (!res.success) {
    toast.error(res.message);
    return;
  }
  toast.success('Abastecimento cadastrado com sucesso!');

  toggleModalAdd();

  await fetchAbastecimentos();

};

const handleEditAbastecimento = async (id) => {
  const res = await getAbastecimentoById(id);
  if (res.success) {

    idAbastecimento.value = res.abastecimento.id;

    abastecimentoToUpdate.value.placa = res.abastecimento.placa;
    inputPlacaUpdate.value.populateField(res.abastecimento.placa);

    abastecimentoToUpdate.value.data = res.abastecimento.data.split('.0')[0];
    inputDataUpdate.value.populateField(res.abastecimento.data.split('.0')[0]);

    abastecimentoToUpdate.value.tipocombustivel = res.abastecimento.tipocombustivel;
    selectCombustivelUpdate.value.populateField(res.abastecimento.tipocombustivel)

    abastecimentoToUpdate.value.abasttotal = res.abastecimento.abasttotal;
    inputAbastTotalUpdate.value.populateField(res.abastecimento.abasttotal);

    abastecimentoToUpdate.value.quantidade = res.abastecimento.quantidade;
    inputLitrosUpdate.value.populateField(res.abastecimento.quantidade);

    abastecimentoToUpdate.value.valortotal = parseFloat(res.abastecimento.valortotal.split('R$')[1]);
    inputValorUpdate.value.populateField(parseFloat(res.abastecimento.valortotal.split('R$')[1]));

    abastecimentoToUpdate.value.kmatual = res.abastecimento.kmatual;
    inputKmAtualUpdate.value.populateField(res.abastecimento.kmatual);

    toggleModalUpdate();
  } else {
    toast.error(res.message);
  }

};

const handleUpdateAbastecimento = async () => {
  if (
    !abastecimentoToUpdate.value.placa ||
    !abastecimentoToUpdate.value.data ||
    !abastecimentoToUpdate.value.tipocombustivel ||
    !abastecimentoToUpdate.value.quantidade ||
    !abastecimentoToUpdate.value.valortotal ||
    !abastecimentoToUpdate.value.kmatual
  ) {
    toast.info('Preencha todos os campos');
    return;
  }

  const abastecimento = {
    placa: abastecimentoToUpdate.value.placa.toUpperCase(),
    data: abastecimentoToUpdate.value.data,
    tipocombustivel: abastecimentoToUpdate.value.tipocombustivel,
    abasttotal: abastecimentoToUpdate.value.abasttotal,
    quantidade: abastecimentoToUpdate.value.quantidade,
    valortotal: abastecimentoToUpdate.value.valortotal,
    kmatual: abastecimentoToUpdate.value.kmatual,
  };

  const res = await updateAbastecimento(idAbastecimento.value, abastecimento)
  if (res.success) {
    toast.success(res.message);
    idAbastecimento.value = null;
  } else {
    toast.error(res.message);
    return;
  }

  toggleModalUpdate();
  cleanFields([inputPlacaUpdate,
    inputDataUpdate,
    selectCombustivelUpdate,
    inputLitrosUpdate,
    inputValorUpdate,
    inputKmAtualUpdate])
  cleanObjRefs(abastecimentoToUpdate);
  await fetchAbastecimentos();

}

const handleDeleteAbastecimento = async (id) => {
  idAbastecimento.value = id;
  toggleModalDelete();
}

const deleteAbastecimento = async () => {
  const res = await deleteAbastecimentoById(idAbastecimento.value);
  if (res.success) {
    toast.success(res.message);
    idAbastecimento.value = null;
  } else {
    toast.error(res.message);
  }

  toggleModalDelete();
  await fetchAbastecimentos();
}

const optionsEntry = async () => {
  const res = await getCombustiveis()
  optionsCombustivel.value = res.map((combustivel) => ({
    value: combustivel.id,
    label: `${combustivel.tipo}`
  }));
}

const fetchAbastecimentos = async () => {
  const res = await getAbastecimentoByPage(pageTofetch.value);
  if (res.success) {
    const abastecimentosArr = res.abastecimento;

    (async () => {
      for (const obj of abastecimentosArr) {
        obj.abasttotal = obj.abasttotal ? "Sim" : "Não";
        obj.tipocombustivel = (await getCombustiveisById(obj.tipocombustivel)).tipo;
        obj.modelo = (await getVeiculosById(obj.placa)).veiculo.modelo;
        obj.data = adjustDate(obj.data);
      }
      abastecimentos.value = abastecimentosArr;

      totalPages.value = Math.ceil(res.total / 10)
    })();
  } else {
    toast.error(res.message);
  }
};

const toggleModalAdd = () => {
  modalAdd.value = !modalAdd.value;
  cleanFields([inputPlacaAdd,
    inputDataAdd,
    selectCombustivelAdd,
    inputLitrosAdd,
    inputValorAdd,
    inputKmAtualAdd])
  cleanObjRefs(abastecimentoToStore);
};

const toggleModalUpdate = () => {
  modalUpdate.value = !modalUpdate.value;
};

const toggleModalDelete = () => {
  modalDelete.value = !modalDelete.value;
}

onMounted(() => {
  optionsEntry();
  fetchAbastecimentos();
});

</script>
<style lang="scss">
.abastecimento-page {
  background-color: var(--primary);
  display: flex;
  flex-direction: column;
  align-items: end;
}

.page {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1.5rem;
}
</style>