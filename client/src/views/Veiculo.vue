<template>
  <main class="veiculo-page">
    <UIButton buttonText="Adicionar veículo" @click="toggleModalAdd" />
    <VeiculoList :veiculos="veiculos" @edit="handleEditVeiculo" @delete="handleDeleteVeiculo" />
  </main>
  <Modal @update="toggleModalAdd" modal-height="45vh" :modal-active="modalAdd">
    <div class="modal-content">
      <div class="placa-veiculo">
        <UIInput v-model="veiculoToStore.placa" type="text" placeholder="placa" ref="inputPlacaAdd"
          label="Placa do veículo" />
      </div>
      <div class="modelo-veiculo">
        <UICombo :options="optionsModelo" @update="handleSelectAdd" ref="selectModeloAdd" label="Modelo do veículo" />
      </div>
      <div class="obs-veiculo">
        <UIInput v-model="veiculoToStore.obs" type="text" placeholder="observações" ref="inputObsAdd"
          label="Observações" />
      </div>
      <UIButton button-text="Cadastrar" @click="handleAddVeiculo" />
    </div>
  </Modal>
  <Modal @update="toggleModalUpdate" modal-height="45vh" :modal-active="modalUpdate">
    <div class="modal-content">
      <div class="placa-veiculo">
        <UIInput v-model="veiculoToUpdate.placa" type="text" placeholder="placa" ref="inputPlacaUpdate"
          label="Placa do veículo" :disabled="true" />
      </div>
      <div class="modelo-veiculo">
        <UICombo :options="optionsModelo" @update="handleSelectUpdate" ref="selectModeloUpdate"
          label="Modelo do veículo" />
      </div>
      <div class="obs-veiculo">
        <UIInput v-model="veiculoToUpdate.obs" type="text" placeholder="observações" ref="inputObsUpdate"
          label="Observações" />
      </div>
      <UIButton button-text="Atualizar" @click="handleUpdateVeiculo" />
    </div>
  </Modal>
  <Modal @update="toggleModalDelete" modal-height="15vh" :modal-active="modalDelete">
    <div class="modal-content-confirm">
      <p>Tem certeza que deseja excluir este modelo?</p>
      <UIButton buttonText="Confirmar" @click="deleteVeiculo" />
    </div>
  </Modal>
</template>

<script setup>
import UIInput from '../components/UIInput.vue';
import UIButton from '../components/UIButton.vue';
import UICombo from '../components/UICombo.vue';
import VeiculoList from '../components/VeiculoList.vue';
import Modal from '../components/Modal.vue';
import { getAllVeiculo, getVeiculoById, storeVeiculo, getModelos, deleteVeiculoById, updateVeiculo } from '../services/veiculoService';
import { useToast } from 'vue-toastification';
import { cleanFields, cleanObjRefs, cleanRefs } from '../utils/cleaners';
import { ref, onMounted } from 'vue'

const toast = useToast();

const veiculos = ref([]);

const modalAdd = ref(false);
const modalUpdate = ref(false);
const modalDelete = ref(false);

const veiculoToStore = ref({
  placa: "",
  modelo: "",
  obs: "",
});

const veiculoToUpdate = ref({
  placa: "",
  modelo: "",
  obs: "",
});

const inputPlacaAdd = ref(null);
const inputPlacaUpdate = ref(null);

const selectModeloAdd = ref(null);
const selectModeloUpdate = ref(null);

const inputObsAdd = ref(null);
const inputObsUpdate = ref(null);

const placaToDelete = ref(null);

const optionsModelo = ref([]);

const handleSelectAdd = (value) => {
  veiculoToStore.value.modelo = value;
};

const handleSelectUpdate = (value) => {
  veiculoToUpdate.value.modelo = value;
};

const optionsEntry = async () => {
  const res = await getModelos()
  optionsModelo.value = res.modelos.map((modelo) => ({
    value: modelo.id,
    label: `${modelo.descricao} - ${modelo.capactanque}L`
  }));
};

const handleAddVeiculo = async () => {
  if (!veiculoToStore.value.placa || !veiculoToStore.value.modelo || !veiculoToStore.value.obs) {
    toast.info('Preencha todos os campos');
    return;
  }

  const veiculo = {
    placa: veiculoToStore.value.placa.toUpperCase(),
    modelo: veiculoToStore.value.modelo,
    obs: veiculoToStore.value.obs,
  };

  const res = await storeVeiculo(veiculo)
  if (res.success) {
    toast.success(res.message);
  } else {
    toast.error(res.message);
    return;
  }

  toggleModalAdd();

  await fetchVeiculos();

};

const handleEditVeiculo = async (placa_veic) => {
  const res = await getVeiculoById(placa_veic);
  if (res.success) {

    inputPlacaUpdate.value.populateField(res.veiculo.placa);
    veiculoToUpdate.value.placa = res.veiculo.placa;

    selectModeloUpdate.value.populateField(res.veiculo.modelo.id);
    veiculoToUpdate.value.modelo = res.veiculo.modelo.id;

    inputObsUpdate.value.populateField(res.veiculo.obs);
    veiculoToUpdate.value.obs = res.veiculo.obs;

    toggleModalUpdate();
  } else {
    toast.error(res.message);
  }
};

const handleUpdateVeiculo = async () => {
  if (!veiculoToUpdate.value.placa || !veiculoToUpdate.value.modelo || !veiculoToUpdate.value.obs) {
    toast.info('Preencha todos os campos');
    return;
  }

  const veiculo = {
    placa: veiculoToUpdate.value.placa.toUpperCase(),
    modelo: veiculoToUpdate.value.modelo,
    obs: veiculoToUpdate.value.obs,
  };

  const res = await updateVeiculo(veiculo)
  if (res.success) {
    toast.success(res.message);
  } else {
    toast.error(res.message);
    return;
  }

  toggleModalUpdate();
  cleanFields([inputPlacaUpdate, selectModeloUpdate, inputObsUpdate])
  cleanObjRefs(veiculoToUpdate)
  await fetchVeiculos();
};


const handleDeleteVeiculo = async (placa) => {
  placaToDelete.value = placa;
  toggleModalDelete();
};

const deleteVeiculo = async () => {
  const res = await deleteVeiculoById(placaToDelete.value);
  if (res.success) {
    toast.success(res.message);
  } else {
    toast.error(res.message);
    return;
  }

  toggleModalDelete();
  await fetchVeiculos();
};

const fetchVeiculos = async () => {
  const res = await getAllVeiculo();
  if (res.success) {
    veiculos.value = res.veiculos;
  } else {
    toast.error(res.message);
  }
};

const toggleModalDelete = () => {
  modalDelete.value = !modalDelete.value;
};

const toggleModalAdd = () => {
  modalAdd.value = !modalAdd.value;
  cleanFields([inputPlacaAdd, selectModeloAdd, inputObsAdd])
  cleanObjRefs(veiculoToStore)
};

const toggleModalUpdate = () => {
  modalUpdate.value = !modalUpdate.value;
};

onMounted(() => {
  optionsEntry();
  fetchVeiculos();
});

</script>
<style lang="scss">
.veiculo-page {
  background-color: var(--primary);
  display: flex;
  flex-direction: column;
  align-items: end;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1.5rem;

  .placa-veiculo,
  .modelo-veiculo,
  .obs-veiculo {
    margin: 15px;
  }

}
</style>