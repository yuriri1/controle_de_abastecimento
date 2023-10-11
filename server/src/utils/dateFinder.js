const findAbastBeforeDate = (abastecimentos, date, id = -1) => {
  let findAbast = null;

  abastecimentos.splice(
    abastecimentos.findIndex((abast) => abast.id === parseInt(id)),
    1
  );

  for (let i = 0; i < abastecimentos.length; i++) {
    const abast = abastecimentos[i];

    if (new Date(abast.data) < new Date(date)) {
      if (!findAbast || new Date(abast.data) > new Date(findAbast.data)) {
        findAbast = abast;
      }
    }
  }

  return findAbast;
};

const findAbastAfterDate = (abastecimentos, date, id = -1) => {
  let findAbast = null;

  abastecimentos.splice(
    abastecimentos.findIndex((abast) => abast.id === parseInt(id)),
    1
  );

  for (let i = 0; i < abastecimentos.length; i++) {
    const abast = abastecimentos[i];

    if (new Date(abast.data) > new Date(date)) {
      if (!findAbast || new Date(abast.data) < new Date(findAbast.data)) {
        findAbast = abast;
      }
    }
  }

  return findAbast;
};

module.exports = {
  findAbastBeforeDate,
  findAbastAfterDate,
};
