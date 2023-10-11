const express = require("express");

const {
  AbastecimentoController,
} = require("../controllers/AbastecimentoController");
const { ModeloController } = require("../controllers/ModeloController");
const { VeiculoController } = require("../controllers/VeiculoController");
const {
  CombustivelController,
} = require("../controllers/CombustivelController");

const { ConsultaController } = require("../controllers/ConsultaController");

const router = express.Router();

const abastecimento = new AbastecimentoController();
const modelo = new ModeloController();
const veiculo = new VeiculoController();
const combustivel = new CombustivelController();
const consulta = new ConsultaController();

router.get("/modelo", modelo.getAll);
router.get("/modelo/:id", modelo.getById);
router.post("/modelo", modelo.store);
router.delete("/modelo/:id", modelo.delete);
router.put("/modelo/:id", modelo.update);

router.get("/veiculo", veiculo.getAll);
router.get("/veiculo/:id", veiculo.getById);
router.post("/veiculo", veiculo.store);
router.delete("/veiculo/:id", veiculo.delete);
router.put("/veiculo", veiculo.update);

router.get("/abastecimento", abastecimento.getAll);
router.get("/abastecimento/id/:id", abastecimento.getById);
router.get("/abastecimento/page", abastecimento.getByPage);
router.post("/abastecimento", abastecimento.store);
router.delete("/abastecimento/:id", abastecimento.delete);
router.put("/abastecimento/:id", abastecimento.update);

router.get("/combustivel", combustivel.getAll);
router.get("/combustivel/:id", combustivel.getById);

router.get("/consulta/placa/:placa", consulta.getByPlaca);
router.get("/consulta/modelo/:modelo", consulta.getByModelo);
router.get("/consulta/data/:periodo/:data", consulta.getByData);
router.get("/consulta/periodo/:dataInicio/:dataFim", consulta.getByPeriodo);
router.get(
  "/consulta/placa/inicio/fim/:dataInicial/:dataFinal/:placa",
  consulta.getByPeriodoAndPlaca
);
router.get(
  "/consulta/modelo/inicio/fim/:dataInicial/:dataFinal/:modelo",
  consulta.getByPeriodoAndModelo
);
router.get(
  "/consulta/modelo/periodo/:periodo/:data/:modelo",
  consulta.getByDataAndModelo
);
router.get(
  "/consulta/placa/periodo/:periodo/:data/:placa",
  consulta.getByDataAndPlaca
);

module.exports = { router };
