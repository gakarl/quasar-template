const rules = {
  required: (value) => !!value || "Dieses Feld ist erforderlich!",
  minLength: (value, length) =>
    (value && value.length >= length) ||
    `Dieses Feld muss mindestens ${length} Zeichen enthalten!`,
  maxLength: (value, length) =>
    (value && value.length <= length) ||
    `Dieses Feld muss mindestens ${length} Zeichen enthalten!`,
  email: (value) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    "Dieses Feld muss eine gültige E-Mail-Adresse sein!",
  confirmPassword: (password) => (value) =>
    value === password || "Passwörter stimmen nicht überein!",
  cnpj: (value) =>
    /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(value) || "CNPJ ungültig!",
  phone: (value) =>
    /^\(\d{2}\)\d{4,5}\-\d{4}$/.test(value) || "Ungültige Telefonnummer!",
  number: (value) => /^\d+$/.test(value) || "Dieses Feld muss numerisch sein!!",
};

export default rules;
