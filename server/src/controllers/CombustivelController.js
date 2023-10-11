const { Combustivel } = require("../models/Combustivel");
const { select, selectById } = require("../services/combustivelScripts");

class CombustivelController {
  async getAll(req, res) {
    try {
      const result = await select();
      const combustivel = result.rows.map(
        (item) => new Combustivel(item.id, item.tipo)
      );
      res.status(200).json(combustivel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar combustivel" });
    }
  }

  async getById(req, res) {
    const id = req.params.id;
    try {
      const result = await selectById(id);
      const combustivel = new Combustivel(
        result.rows[0].id,
        result.rows[0].tipo
      );
      res.status(200).json(combustivel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar combustivel" });
    }
  }
}

module.exports = { CombustivelController };
