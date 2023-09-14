function getFormObject(form) {
  const formData = new FormData(form);
  let formObject = {};

  for (const [key, value] of formData) {
    formObject[key] = value;
  }

  return formObject;
}

export default getFormObject;
