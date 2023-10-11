const { Abastecimento } = require("../models/Abastecimento");
const {
  insert,
  select,
  selectById,
  deleteById,
  updateById,
  selectByPage,
  countEntrys,
  selectByPlaca,
} = require("../services/abatecimentoScripts");

const { selectById: selectByIdVeiculo } = require("../services/veiculoScripts");
const { selectById: selectByIdModelo } = require("../services/modeloScripts");

const { createVeiculo } = require("../utils/objectCreator");

const {
  findAbastBeforeDate,
  findAbastAfterDate,
} = require("../utils/dateFinder");

class AbastecimentoController {
  async getAll(req, res) {
    try {
      const result = await select();
      if (!result.rowCount) {
        res.status(202).json({
          success: result.rowCount,
          message: "Nenhum abastecimento encontrado",
        });
        return;
      }
      const abastecimentoPromises = result.rows.map(
        async (item) =>
          new Abastecimento(
            (await createVeiculo(item.placa)).placa,
            item.tipocombustivel,
            item.abasttotal,
            item.quantidade,
            item.valortotal,
            item.data,
            item.kmatual,
            item.id
          )
      );

      const abastecimento = await Promise.all(abastecimentoPromises);

      res.status(200).json({
        success: 1,
        abastecimento,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter os abastecimentos",
      });
    }
  }

  async getById(req, res) {
    const id = req.params.id;
    try {
      const result = await selectById(id);
      if (!result.rowCount) {
        res.status(204).json({
          success: result.rowCount,
          message: "Abastecimento não encontrado",
        });
        return;
      }

      const abastecimento = new Abastecimento(
        (await createVeiculo(result.rows[0].placa)).placa,
        result.rows[0].tipocombustivel,
        result.rows[0].abasttotal,
        result.rows[0].quantidade,
        result.rows[0].valortotal,
        result.rows[0].data,
        result.rows[0].kmatual,
        result.rows[0].id
      );

      res.status(200).json({
        success: result.rowCount,
        abastecimento,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter o abastecimento",
      });
    }
  }

  async getByPage(req, res) {
    const page = parseInt(req.query.page);
    try {
      const result = await selectByPage(page);
      if (!result.rowCount) {
        res.status(202).json({
          success: result.rowCount,
          message: "Nenhum abastecimento encontrado",
        });
        return;
      }

      const abastecimentoPromises = result.rows.map(
        async (item) =>
          new Abastecimento(
            (await createVeiculo(item.placa)).placa,
            item.tipocombustivel,
            item.abasttotal,
            item.quantidade,
            item.valortotal,
            item.data,
            item.kmatual,
            item.id
          )
      );

      const abastecimento = await Promise.all(abastecimentoPromises);

      const total = await countEntrys();

      if (!total.rowCount) {
        res.status(202).json({
          success: total.rowCount,
          message: "Erro ao tentar encontrar o total de abastecimentos",
        });
        return;
      }

      res.status(200).json({
        success: 1,
        abastecimento,
        total: total.rows[0].totalitems,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter os abastecimentos",
      });
    }
  }

  async store(req, res) {
    const placa = req.body.placa;
    const tipocombustivel = req.body.tipocombustivel;
    const abasttotal = req.body.abasttotal;
    const quantidade = req.body.quantidade;
    const valortotal = req.body.valortotal;
    const data = req.body.data;
    const kmatual = req.body.kmatual;

    try {
      const veiculo = await selectByIdVeiculo(placa);

      if (!veiculo.rowCount) {
        res.status(202).json({
          success: veiculo.rowCount,
          message: "Veículo não encontrado",
        });
        return;
      }

      const modelo = await selectByIdModelo(veiculo.rows[0].id_modelo);

      if (modelo.rows[0].capactanque < quantidade) {
        res.status(202).json({
          success: 0,
          message: "Capacidade do tanque insuficiente",
        });
        return;
      }

      const abastecimentos = await selectByPlaca(placa);

      if (abastecimentos.rowCount) {
        const abastCronoAnterior = findAbastBeforeDate(
          abastecimentos.rows,
          data
        );
        const abastCronoPosterior = findAbastAfterDate(
          abastecimentos.rows,
          data
        );

        if (abastCronoAnterior) {
          if (abastCronoAnterior.kmatual > kmatual) {
            res.status(202).json({
              success: 0,
              message:
                "Km atual menor que o anterior. KM anterior: " +
                abastCronoAnterior.kmatual,
            });
            return;
          }
        }

        if (abastCronoPosterior) {
          if (abastCronoPosterior.kmatual < kmatual) {
            res.status(202).json({
              success: 0,
              message:
                "Km atual maior que o posterior. KM posterior: " +
                abastCronoPosterior.kmatual,
            });
            return;
          }
        }
      }

      const abastecimento = new Abastecimento(
        (await createVeiculo(placa)).placa,
        tipocombustivel,
        abasttotal,
        quantidade,
        valortotal,
        data,
        kmatual
      );

      const result = await insert(abastecimento);
      res.status(201).json({
        success: result.rowCount,
        message: "Abastecimento inserido com sucesso",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao inserir o abastecimento",
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    try {
      const result = await deleteById(id);
      res.status(200).json({
        success: result.rowCount,
        message: "Abastecimento excluído com sucesso",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao excluir o abastecimento",
      });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const abastecimento = req.body;
    try {
      const veiculo = await selectByIdVeiculo(abastecimento.placa);

      if (!veiculo.rowCount) {
        res.status(202).json({
          success: veiculo.rowCount,
          message: "Veículo não encontrado",
        });
        return;
      }

      const modelo = await selectByIdModelo(veiculo.rows[0].id_modelo);

      if (modelo.rows[0].capactanque < abastecimento.quantidade) {
        res.status(202).json({
          success: 0,
          message: "Capacidade do tanque insuficiente",
        });
        return;
      }

      const abastecimentos = await selectByPlaca(abastecimento.placa);

      if (abastecimentos.rowCount) {
        const abastCronoAnterior = findAbastBeforeDate(
          abastecimentos.rows,
          abastecimento.data,
          id
        );
        const abastCronoPosterior = findAbastAfterDate(
          abastecimentos.rows,
          abastecimento.data,
          id
        );

        console.log(abastCronoAnterior);
        console.log(abastCronoPosterior);

        if (abastCronoAnterior) {
          if (abastCronoAnterior.kmatual > abastecimento.kmatual) {
            res.status(202).json({
              success: 0,
              message:
                "Km atual menor que o anterior. KM anterior: " +
                abastCronoAnterior.kmatual,
            });
            return;
          }
        }

        if (abastCronoPosterior) {
          if (abastCronoPosterior.kmatual < abastecimento.kmatual) {
            res.status(202).json({
              success: 0,
              message:
                "Km atual maior que o posterior. KM posterior: " +
                abastCronoPosterior.kmatual,
            });
            return;
          }
        }
      }

      const result = await updateById(id, abastecimento);

      res.status(200).json({
        success: result.rowCount,
        message: "Abastecimento atualizado com sucesso",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao atualizar o abastecimento",
      });
    }
  }
}

module.exports = { AbastecimentoController };
