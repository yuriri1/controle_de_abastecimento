class Abastecimento {
  constructor(
    placa,
    tipocombustivel,
    abasttotal,
    quantidade,
    valortotal,
    data,
    kmatual,
    id = null
  ) {
    this.id = id;
    this.placa = placa;
    this.tipocombustivel = parseInt(tipocombustivel);
    this.abasttotal = abasttotal;
    this.quantidade = parseFloat(quantidade);
    this.valortotal = valortotal;
    this.data = data;
    this.kmatual = parseFloat(kmatual);
  }
}

module.exports = { Abastecimento };
