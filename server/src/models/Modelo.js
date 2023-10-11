class Modelo {
  constructor(descricao, capactanque, id = null) {
    this.id = id;
    this.descricao = descricao;
    this.capactanque = parseInt(capactanque);
  }
}

module.exports = { Modelo };
