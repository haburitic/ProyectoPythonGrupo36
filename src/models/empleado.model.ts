import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Empleado extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  numeroDocumento: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  [prop: string]: any;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
