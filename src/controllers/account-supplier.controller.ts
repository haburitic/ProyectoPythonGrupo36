import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Account,
  Supplier,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountSupplierController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/supplier', {
    responses: {
      '200': {
        description: 'Account has one Supplier',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Supplier),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Supplier>,
  ): Promise<Supplier> {
    return this.accountRepository.supplier(id).get(filter);
  }

  @post('/accounts/{id}/supplier', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(Supplier)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Account.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Supplier, {
            title: 'NewSupplierInAccount',
            exclude: ['id'],
            optional: ['accountId']
          }),
        },
      },
    }) supplier: Omit<Supplier, 'id'>,
  ): Promise<Supplier> {
    return this.accountRepository.supplier(id).create(supplier);
  }

  @patch('/accounts/{id}/supplier', {
    responses: {
      '200': {
        description: 'Account.Supplier PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Supplier, {partial: true}),
        },
      },
    })
    supplier: Partial<Supplier>,
    @param.query.object('where', getWhereSchemaFor(Supplier)) where?: Where<Supplier>,
  ): Promise<Count> {
    return this.accountRepository.supplier(id).patch(supplier, where);
  }

  @del('/accounts/{id}/supplier', {
    responses: {
      '200': {
        description: 'Account.Supplier DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Supplier)) where?: Where<Supplier>,
  ): Promise<Count> {
    return this.accountRepository.supplier(id).delete(where);
  }
}
