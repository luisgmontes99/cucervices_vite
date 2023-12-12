export function DataReg(datos) {
  let error = [];
/*Este Archivo esta creado para generar las comprobaciones del Register*/
  //Validacion del usuario
  if (datos.usuario === "") {
    error.usuario = "El usuario no puede estar vacio";
  } else {
    error.usuario = "";
  }
  //Validacion del correo
  if (datos.correo === "") {
    error.correo = "El usuario no puede estar vacio";
  } else{
    error.correo = "";
  }
  //Validacion de la contraseña
  if (datos.contra === "") {
    error.contra = "La contraseña no puede estar vacia";
  } else {
    error.contra = "";
  }
  //Validacion de ser la misma contraseña
  if (datos.contraV === "") {
    error.contraV = "La contraseña no puede estar vacia";
  } else if (datos.contra !== datos.contraV) {
    error.contraV = "La contraseña no es la misma";
  } else {
    error.contraV = "";
  }
  return error;
}
