const { Veiculo } = require("../models/Veiculo");
const {
  insert,
  select,
  selectById,
  deleteById,
  updateById,
} = require("../services/veiculoScripts");
const { createModelo } = require("../utils/objectCreator");

class VeiculoController {
  async getAll(req, res) {
    try {
      const result = await select();
      if (!result.rowCount) {
        res.status(202).json({
          success: result.rowCount,
          message: "Nenhum veiculo encontrado",
          veiculos: [],
        });
        return;
      }

      const veiculosPromises = result.rows.map(
        async (item) =>
          new Veiculo(item.placa, await createModelo(item.id_modelo), item.obs)
      );

      const veiculos = await Promise.all(veiculosPromises);

      res.status(200).json({
        success: 1,
        message: "Veiculos encontrados",
        veiculos,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter os veículos",
      });
    }
  }

  async getById(req, res) {
    const id = req.params.id;
    try {
      const result = await selectById(id);
      if (!result.rowCount) {
        res.status(202).json({
          success: 0,
          message: "Veiculo não encontrado",
        });
        return;
      }

      const veiculo = new Veiculo(
        result.rows[0].placa,
        await createModelo(result.rows[0].id_modelo),
        result.rows[0].obs
      );

      res.status(200).json({
        success: 1,
        veiculo,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter o veículo",
      });
    }
  }

  async store(req, res) {
    const placa = req.body.placa;
    const id_modelo = req.body.modelo;
    const obs = req.body.obs;

    let placas = await select();
    placas = placas.rows.map((item) => item.placa);

    if (placas.includes(placa)) {
      res.status(202).json({
        success: 0,
        message: "Placa já cadastrada",
      });
      return;
    }

    if (placa.length !== 7) {
      res.status(202).json({
        success: 0,
        message: "Placa inválida",
      });
      return;
    }

    try {
      const veiculo = new Veiculo(placa, await createModelo(id_modelo), obs);
      const result = await insert(veiculo);
      res.status(201).json({
        success: result.rowCount,
        message: "Veículo cadastrado com sucesso",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao cadastrar o veículo",
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    try {
      const result = await deleteById(id);
      if (!result.rowCount) {
        res.status(202).json({
          success: result.rowCount,
          message: "Veiculo não encontrado",
        });
        return;
      }
      res.status(200).json({
        success: result.rowCount,
        message: "Veiculo deletado com sucesso",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao deletar o veiculo",
      });
    }
  }

  async update(req, res) {
    const veiculo = req.body;
    try {
      const result = await updateById(veiculo);
      if (!result.rowCount) {
        res.status(202).json({
          success: result.rowCount,
          message: "Veiculo não encontrado",
        });
        return;
      }
      res.status(200).json({
        success: result.rowCount,
        message: "Veiculo atualizado com sucesso",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao atualizar o veiculo",
      });
    }
  }
}

module.exports = { VeiculoController };
