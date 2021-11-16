// ---------- ADD IMPORTS -------------
import {authenticate} from '@loopback/authentication';
import {get} from '@loopback/rest';

// ------------------------------------
@authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
export class PruebaController {
  constructor() { }

  @get('/prueba')
  llamadoFuncion(): string {
    return 'Hello world!';
  }
}
