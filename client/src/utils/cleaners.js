const cleanFields = (array) => {
  array.forEach((element) => {
    element.value.clearField();
  });
};

const cleanRefs = (array) => {
  array.map((ref) => {
    ref.value = "";
    return ref;
  });
};

const cleanObjRefs = (obj) => {
  Object.keys(obj.value).map((key) => {
    if (obj.value[key] === false || obj.value[key] === true) {
      obj.value[key] = false;
    } else {
      obj.value[key] = "";
      return obj;
    }
  });
};

export { cleanFields, cleanRefs, cleanObjRefs };
