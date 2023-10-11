const {
  selectByPlaca,
  selectByModelo,
  selectByData,
  selectByDataAndModelo,
  selectByDataAndPlaca,
  selectByPeriodo,
  selectByPeriodoAndModelo,
  selectByPeriodoAndPlaca,
} = require("../services/consultaScripts");

class ConsultaController {
  async getByPlaca(req, res) {
    const placa = req.params.placa;
    try {
      const result = await selectByPlaca(placa);
      if (!result.rowCount) {
        res.status(202).json({
          success: 0,
          message: "Abastecimento não encontrado",
        });
        return;
      }

      res.status(200).json({
        success: 1,
        message: "Abastecimentos encontrados",
        abastecimentos: result.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter os abastecimentos",
      });
    }
  }

  async getByModelo(req, res) {
    const modelo = req.params.modelo;
    try {
      const result = await selectByModelo(modelo);
      if (!result.rowCount) {
        res.status(202).json({
          success: 0,
          message: "Abastecimento não encontrado",
        });
        return;
      }

      res.status(200).json({
        success: 1,
        message: "Abastecimentos encontrados",
        abastecimentos: result.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter os abastecimentos",
      });
    }
  }

  async getByData(req, res) {
    const data = req.params.data;
    const tipo = req.params.periodo;
    try {
      const result = await selectByData(data, tipo);
      if (!result.rowCount) {
        res.status(202).json({
          success: 0,
          message: "Abastecimento não encontrado",
        });
        return;
      }

      res.status(200).json({
        success: 1,
        message: "Abastecimentos encontrados",
        abastecimentos: result.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter os abastecimentos",
      });
    }
  }

  async getByDataAndModelo(req, res) {
    const data = req.params.data;
    const modelo = req.params.modelo;
    const tipo = req.params.periodo;
    try {
      const result = await selectByDataAndModelo(data, modelo, tipo);
      if (!result.rowCount) {
        res.status(202).json({
          success: 0,
          message: "Abastecimento não encontrado",
        });
        return;
      }

      res.status(200).json({
        success: 1,
        message: "Abastecimentos encontrados",
        abastecimentos: result.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter os abastecimentos",
      });
    }
  }

  async getByDataAndPlaca(req, res) {
    const data = req.params.data;
    const placa = req.params.placa;
    const tipo = req.params.periodo;
    try {
      const result = await selectByDataAndPlaca(data, placa, tipo);
      if (!result.rowCount) {
        res.status(202).json({
          success: 0,
          message: "Abastecimento não encontrado",
        });
        return;
      }

      res.status(200).json({
        success: 1,
        message: "Abastecimentos encontrados",
        abastecimentos: result.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter os abastecimentos",
      });
    }
  }

  async getByPeriodo(req, res) {
    const inicio = req.params.dataInicio;
    const fim = req.params.dataFim;
    try {
      const result = await selectByPeriodo(inicio, fim);
      if (!result.rowCount) {
        res.status(202).json({
          success: 0,
          message: "Abastecimento não encontrado",
        });
        return;
      }

      res.status(200).json({
        success: 1,
        message: "Abastecimentos encontrados",
        abastecimentos: result.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter os abastecimentos",
      });
    }
  }

  async getByPeriodoAndModelo(req, res) {
    const inicio = req.params.dataInicio;
    const fim = req.params.dataFim;
    const modelo = req.params.modelo;
    try {
      const result = await selectByPeriodoAndModelo(inicio, fim, modelo);
      if (!result.rowCount) {
        res.status(202).json({
          success: 0,
          message: "Abastecimento não encontrado",
        });
        return;
      }

      res.status(200).json({
        success: 1,
        message: "Abastecimentos encontrados",
        abastecimentos: result.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter os abastecimentos",
      });
    }
  }

  async getByPeriodoAndPlaca(req, res) {
    const inicio = req.params.dataInicio;
    const fim = req.params.dataFim;
    const placa = req.params.placa;
    try {
      const result = await selectByPeriodoAndPlaca(inicio, fim, placa);
      if (!result.rowCount) {
        res.status(202).json({
          success: 0,
          message: "Abastecimento não encontrado",
        });
        return;
      }

      res.status(200).json({
        success: 1,
        message: "Abastecimentos encontrados",
        abastecimentos: result.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Ocorreu um erro ao obter os abastecimentos",
      });
    }
  }
}

module.exports = { ConsultaController };
