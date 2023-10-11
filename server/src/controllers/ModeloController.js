const { Modelo } = require("../models/Modelo");
const {
  insert,
  select,
  selectById,
  deleteById,
  updateById,
} = require("../services/modeloScripts");

class ModeloController {
  async getAll(req, res) {
    try {
      const result = await select();
      if (!result.rowCount) {
        res.status(202).json({
          success: result.rowCount,
          message: "Nenhum modelo encontrado",
        });
        return;
      }
      const modelos = result.rows.map(
        (item) => new Modelo(item.descricao, item.capactanque, item.id)
      );
      res.status(200).json({
        success: 1,
        message: "Modelos encontrados com sucesso!",
        modelos,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter os modelos",
      });
    }
  }

  async getById(req, res) {
    const id = req.params.id;
    try {
      const result = await selectById(id);
      if (!result.rowCount) {
        res.status(202).json({
          success: result.rowCount,
          message: "Modelo não encontrado",
        });
        return;
      }
      const modelo = new Modelo(
        result.rows[0].descricao,
        result.rows[0].capactanque,
        result.rows[0].id
      );
      res.status(200).json({
        success: result.rowCount,
        modelo,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter o modelo",
      });
    }
  }

  async store(req, res) {
    const descricao = req.body.descricao;
    const capactanque = req.body.capactanque;

    const modelo = new Modelo(descricao, capactanque);

    try {
      const result = await insert(modelo);
      res.status(201).json({
        success: result.rowCount,
        message: "Modelo cadastrado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao cadastrar o modelo",
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
          message: "Modelo não encontrado",
        });
        return;
      }
      res.status(200).json({
        success: result.rowCount,
        message: "Modelo deletado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao deletar o modelo",
      });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const descricao = req.body.descricao;
    const capactanque = req.body.capactanque;

    const modelo = new Modelo(descricao, capactanque, id);

    try {
      const result = await updateById(modelo);
      if (!result.rowCount) {
        res.status(202).json({
          success: result.rowCount,
          message: "Modelo não encontrado",
        });
        return;
      }
      res.status(200).json({
        success: result.rowCount,
        message: "Modelo atualizado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao atualizar o modelo",
      });
    }
  }
}

module.exports = { ModeloController };
