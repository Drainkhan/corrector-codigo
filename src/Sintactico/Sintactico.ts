import { reglas, actionsGoto } from '../Assets/Params';
import { errorHandlerSintax } from '../Errors/ErrorsHandler';
import { Token } from '../Types/Types';

let pilaSintactico: Array<string> = ['$', '0'];

// --------------------------------------------- Funciones públicas ---------------------------------------------

const parse = (token: Token): string => {
  let estadoActual: number = obtenerEstadoActual();
  const columnaAcciones: number = obtenerColumnaAcciones(token);
  const accion: string = actionsGoto[estadoActual][columnaAcciones];

  // parsedTokens.push(token);

  if (esDesplazamiento(accion)) {
    const desplazamiento: number = valorNum(accion);
    pilaSintactico.push(columnaAcciones.toString());
    pilaSintactico.push(desplazamiento.toString());
    return 'Desplazado';
  } else if (esReducción(accion)) {
    let numRegla: number = valorNum(accion);
    const produccionesRegla: number = obtenerNumProducciones(accion);
    const columnaRegla: number = getColumnaRegla(numRegla);
    aplicarReduccion(produccionesRegla);
    estadoActual = obtenerEstadoActual();
    pilaSintactico.push(numRegla.toString());
    pilaSintactico.push(actionsGoto[estadoActual][columnaRegla]);
    numRegla++
    return numRegla.toString();
  } else if (esAceptar(accion)) {
    return 'Finalizado';
  } else {
    errorHandlerSintax(estadoActual, token);
    return 'Error';
  }
};

// --------------------------------------------- Funciones privadas ---------------------------------------------

const obtenerEstadoActual = (): number => {
  return parseInt(pilaSintactico[pilaSintactico.length - 1]);
};

const obtenerColumnaAcciones = (token: Token): number => {
  const codigo = token.codigo;
  const lexema = token.atributo && token.atributo.cadena;
  
  switch (true) {
    case codigo == 'RESERVADA' && lexema == 'let':
      return 0;
    case codigo == 'ID':
      return 1;
    case codigo == 'PTO_COMA':
      return 2;
    case codigo == 'RESERVADA' && lexema == 'do':
      return 3;
    case codigo == 'APT_BLOCK':
      return 4;
    case codigo == 'CIE_BLOCK':
      return 5;
    case codigo == 'RESERVADA' && lexema == 'while':
      return 6;
    case codigo == 'APT_PAREN':
      return 7;
    case codigo == 'CIE_PAREN':
      return 8;
    case codigo == 'RESERVADA' && lexema == 'if':
      return 9;
    case codigo == 'RESERVADA' && lexema == 'return':
      return 10;
    case codigo == 'OP_ASIG':
      return 11;
    case codigo == 'OP_ASIGCRES':
      return 12;
    case codigo == 'RESERVADA' && lexema == 'alert':
      return 13;
    case codigo == 'RESERVADA' && lexema == 'input':
      return 14;
    case codigo == 'RESERVADA' && lexema == 'function':
      return 15;
    case codigo == 'RESERVADA' && lexema == 'string':
      return 16;
    case codigo == 'RESERVADA' && lexema == 'number':
      return 17;
    case codigo == 'RESERVADA' && lexema == 'bool':
      return 18;
    case codigo == 'NUM':
      return 19;
    case codigo == 'CADENA':
      return 20;
    case codigo == 'COMA':
      return 21;
    case codigo == 'OP_NEG':
      return 22;
    case codigo == 'OP_MAY':
      return 23;
    case codigo == 'RESERVADA' && lexema == 'true':
      return 24;
    case codigo == 'RESERVADA' && lexema == 'false':
      return 25;
    case codigo == 'OP_SUM':
      return 26;
    case codigo == 'FINAL':
      return 27;
    default:
      return 27;
  }
};

const getColumnaRegla = (numRegla: number): number => {
  const letraRegla: string = reglas[numRegla][0];
  switch (letraRegla) {
    case 'Z':
      return 28;
    case 'Y':
      return 29;
    case 'A':
      return 30;
    case "A'":
      return 31;
    case 'B':
      return 32;
    case 'C':
      return 33;
    case 'D':
      return 34;
    case 'E':
      return 35;
    case 'F':
      return 36;
    case 'G':
      return 37;
    case 'H':
      return 38;
    case 'I':
      return 39;
    case 'J':
      return 40;
    case 'K':
      return 41;
    case 'L':
      return 42;
    case 'M':
      return 43;
    case 'N':
      return 44;
    case 'O':
      return 45;
    case 'P':
      return 46;
    case 'Q':
      return 47;
    case 'R':
      return 48;
    case 'S':
      return 49;
    case "S'":
      return 50;
    case "U'":
      return 51;
    case 'U':
      return 52;
    case 'V':
      return 53;
    case 'W':
      return 54;
    case 'T':
      return 55;
    default:
      return 0;
  }
};

const esDesplazamiento = (action: string): boolean => {
  if (!action) return false;
  return action.split('')[0] == 's';
};

const esReducción = (action: string): boolean => {
  if (!action) return false;
  return action.split('')[0] == 'r';
};

const esAceptar = (action: string): boolean => {
  if (!action) return false;
  return action == 'acc';
};

const valorNum = (action: string): number => {
  return parseInt(action.substr(1, action.length - 1));
};

const obtenerNumProducciones = (action: string): number => {
  const numeroRegla: number = valorNum(action);
  const producciones: Array<string> = reglas[numeroRegla][1].split(' ');

  let numProducciones: number = producciones.length;

  if (producciones.includes('λ')) {
    numProducciones--;
  }
  return numProducciones;
};

const aplicarReduccion = (extracciones: number): void => {
  let counter: number = extracciones * 2;
  while (counter != 0 && pilaSintactico.length > 2) {
    pilaSintactico.pop();
    counter--;
  }
};

export { parse };
