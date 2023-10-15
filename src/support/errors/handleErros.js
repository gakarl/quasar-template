import { Notify } from "quasar";

export const handleErros = (error) => {
  if (!error.response)
    if (error.hasOwnProperty("message")) notify(error.message);
    else
      notify(
        "Die Verbindung ist fehlgeschlagen. Bitte versuchen Sie es später noch einmal!"
      );
  else if (error.response.hasOwnProperty("message"))
    notify(error.response.message);
  else if (error.response.hasOwnProperty("data")) {
    const errorData = error.response.data;
    if (errorData && Array.isArray(errorData))
      errorData.forEach((error, index) =>
        notify(error[error.keys(errorData)[index]])
      );
    else if (errorData) {
      const object = errorData[Object.keys(errorData)[0]];
      if (Array.isArray(object))
        return object.forEach((error) => notify(error));
      const customError = customMessageByErrorType(error);
      if (customError) notify(customError);
      else notify(errorData[Object.keys(errorData)[0]]);
    }
  } else notify(
    "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später noch einmal!"
  );
};

const notify = (message) => {
  Notify.create({
    message: message,
    color: "negative",
    textColor: "white",
  });
};

const customMessageByErrorType = (error) => {
  const messages = {
    401: "Unbefugter Benutzer! Überprüfen Sie Ihren Benutzernamen und Ihr Passwort.",
    403: "Zugriff abgelehnt! Dieser Benutzer hat keine Berechtigung zum Zugriff auf diese Ressource!",
    404: "Ressource nicht gefunden!",
    422: "Validierungsfehler!",
    500: "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später noch einmal!",
  };
  return messages[error.response.status];
};
