import * as fs from 'fs';
import chalk from 'chalk';

// Types
import { Token } from '../Types/Types';

// Constants
import { erroresSintactico } from '../Assets/Params';

export const errorHandlerSintax = (filaAccion: number, columnaAccion: number, token: Token) => {
  if (token.posicion) {
    const error: string =
      '[ERROR SINTÁCTICO](Línea: ' +
      token.posicion.linea +
      ', Columna: ' +
      token.posicion.columna +
      ") '" +
      erroresSintactico[0] +
      '\n';
    if (process.argv.includes('-sin')) {
      console.log(chalk.bgYellow(error));
    }
    fs.appendFileSync('outputs/Errores.txt', error);
  }
};