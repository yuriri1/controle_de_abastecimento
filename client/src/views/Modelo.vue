<template>
  <main class="modelo-page">
    <UIButton buttonText="Adicionar modelo" @click="toggleModalAdd" />
    <ModeloList :modelos="modelos" @edit="handleEditModelo" @delete="handleDeleteModelo" />
  </main>
  <Modal @update="toggleModalAdd" modal-height="35vh" :modal-active="modalAdd">
    <div class="modal-content">
      <div class="desc-modelo">
        <UIInput v-model="modeloToStore.descricao" type="text" placeholder="modelo" ref="inputAddDesc"
          label="Descrição do modelo" />
      </div>
      <div class="capac-modelo">
        <UIInput v-model="modeloToStore.capactanque" type="number" placeholder="capacidade" ref="inputAddCapac"
          label="Capacidade para combustivel" />
      </div>
      <UIButton buttonText="Cadastrar" @click="handleAddModelo" />
    </div>
  </Modal>
  <Modal @update="toggleModalUpdate" modal-height="35vh" :modal-active="modalUpdate">
    <div class="modal-content">
      <div class="desc-modelo">
        <UIInput v-model="modeloToUpdate.descricao" type="text" placeholder="modelo" ref="inputUpdateDesc"
          label="Descrição do modelo" />
      </div>
      <div class="capac-modelo">
        <UIInput v-model="modeloToUpdate.capactanque" type="number" placeholder="capacidade" ref="inputUpdateCapac"
          label="Capacidade para combustivel" />
      </div>
      <UIButton buttonText="Atualizar" @click="handleUpdateModelo" />
    </div>
  </Modal>
  <Modal @update="toggleModalDelete" modal-height="15vh" :modal-active="modalDelete">
    <div class="modal-content-confirm">
      <p>Tem certeza que deseja excluir este modelo?</p>
      <UIButton buttonText="Confirmar" @click="deleteModelo" />
    </div>
  </Modal>
</template>

<script setup>
import UIInput from '../components/UIInput.vue';
import UIButton from '../components/UIButton.vue';
import ModeloList from '../components/ModeloList.vue';
import Modal from '../components/Modal.vue';
import { cleanFields, cleanRefs, cleanObjRefs } from '../utils/cleaners';
import { storeModelo, getAllModelo, deleteModeloById, updateModelo, getModeloById } from '../services/modeloService';
import { useToast } from 'vue-toastification';
import { ref, onMounted } from 'vue'

const toast = useToast();

const isLoading = ref(false);

const idModelo = ref(null);

const idToDelete = ref(null);

const modeloToStore = ref({
  descricao: '',
  capactanque: '',
});

const modeloToUpdate = ref({
  descricao: '',
  capactanque: '',
});

const inputAddDesc = ref(null);
const inputAddCapac = ref(null);
const inputUpdateDesc = ref(null);
const inputUpdateCapac = ref(null);

const modelos = ref([]);

const modalAdd = ref(false);
const modalUpdate = ref(false);
const modalDelete = ref(false);



const handleAddModelo = async () => {
  if (modeloToStore.value.descricao == '' || modeloToStore.value.capactanque == '') {
    toast.info('Preencha todos os campos');
    return;
  }

  const modelo = {
    descricao: modeloToStore.value.descricao,
    capactanque: modeloToStore.value.capactanque,
  };

  const res = await storeModelo(modelo)
  if (res.success) {
    toast.success(res.message);
  } else {
    toast.error(res.message);
    return;
  }

  await fetchModelos();

  toggleModalAdd();
};

const handleEditModelo = async (id) => {
  const res = await getModeloById(id);

  if (res.success) {
    inputUpdateDesc.value.populateField(res.modelo.descricao);
    modeloToUpdate.value.descricao = res.modelo.descricao;

    inputUpdateCapac.value.populateField(res.modelo.capactanque);
    modeloToUpdate.value.capactanque = res.modelo.capactanque;

    idModelo.value = res.modelo.id;
  } else {
    toast.error(res.message);
  }

  toggleModalUpdate();
};

const handleUpdateModelo = async () => {
  if (modeloToUpdate.value.descricao == '' || modeloToUpdate.value.capactanque == '') {
    toast.info('Preencha todos os campos');
    return;
  }

  const modelo = {
    descricao: modeloToUpdate.value.descricao,
    capactanque: modeloToUpdate.value.capactanque,
  };

  const res = await updateModelo(idModelo.value, modelo)
  if (res.success) {
    toast.success(res.message);
  } else {
    toast.error(res.message);
    return;
  }

  await fetchModelos();

  cleanFields([inputUpdateDesc, inputUpdateCapac]);
  cleanObjRefs(modeloToUpdate);

  toggleModalUpdate();
};

const handleDeleteModelo = async (id) => {
  idToDelete.value = id;
  toggleModalDelete();
};

const deleteModelo = async () => {
  const id = idToDelete.value;
  const res = await deleteModeloById(id)
  if (res.success) {
    toast.success(res.message);
  } else {
    toast.error(res.message);
  }
  idToDelete.value = null;

  await fetchModelos();

  toggleModalDelete();
};

const fetchModelos = async () => {
  const res = await getAllModelo();
  if (res.success) {
    modelos.value = res.modelos;
  } else {
    toast.error(res.message);
  }
};

const toggleModalAdd = () => {
  cleanObjRefs(modeloToStore);
  cleanFields([inputAddDesc, inputAddCapac]);
  modalAdd.value = !modalAdd.value;
};

const toggleModalUpdate = () => {
  modalUpdate.value = !modalUpdate.value;
};

const toggleModalDelete = () => {
  modalDelete.value = !modalDelete.value;
};

onMounted(async () => {
  await fetchModelos();
});

</script>
<style lang="scss">
.modelo-page {
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

  .desc-modelo,
  .capac-modelo {
    margin: 15px;
  }
}

.modal-content-confirm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1.5rem;

  p {
    margin: 15px;
  }
}
</style>