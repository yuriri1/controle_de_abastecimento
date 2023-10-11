const arrayDeObjetos = [
  { nome: "Objeto1", idade: 25 },
  { nome: "Objeto2", idade: 30 },
  { nome: "Objeto3", idade: 20 },
];

arrayDeObjetos.forEach((objeto) => {
  objeto.cidade = "São Paulo";
});

console.log(arrayDeObjetos);
