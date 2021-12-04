import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {User, UserCredentials} from '../models';
import {UserCredentialsRepository, UserRepository} from '../repositories';

export class UserUserCredentialsControllerController {
  constructor(
    @repository(UserCredentialsRepository)
    public userCredentialsRepository: UserCredentialsRepository,
    public userRepository: UserRepository,
  ) { }

  @post('/user-credentials')
  @response(200, {
    description: 'UserCredentials model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserCredentials)}},
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredentials, {
            title: 'NewUserCredentials',
            exclude: ['id'],
            optional: ['userId']

          }),
        },
      },
    })
    userCredentials: Omit<UserCredentials, 'id'>,
  ): Promise<UserCredentials> {
    return this.userCredentialsRepository.create(userCredentials);
  }

  @get('/user-credentials/count')
  @response(200, {
    description: 'UserCredentials model count',
    content: {'application/json': {schema: UserCredentials}},
  })
  async count(
    @param.where(UserCredentials) where?: Where<UserCredentials>,
  ): Promise<Count> {
    return this.userCredentialsRepository.count(where);
  }

  @get('/user-credentials')
  @response(200, {
    description: 'Array of UserCredentials model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserCredentials, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserCredentials) filter?: Filter<UserCredentials>,
  ): Promise<UserCredentials[]> {
    return this.userCredentialsRepository.find(filter);
  }

  @patch('/user-credentials')
  @response(200, {
    description: 'UserCredentials PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({

      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredentials, {partial: true}),
        },
      },
    })
    userCredentials: UserCredentials,
    @param.where(UserCredentials) where?: Where<UserCredentials>,
  ): Promise<Count> {
    return this.userCredentialsRepository.updateAll(userCredentials, where);
  }

  @get('/user-credentials/{id}')
  @response(200, {
    description: 'UserCredentials model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserCredentials, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: string,
    @param.filter(UserCredentials, {exclude: 'where'}) filter?: FilterExcludingWhere<UserCredentials>
  ): Promise<UserCredentials> {
    return this.userCredentialsRepository.findById(id, filter);
  }

  @patch('/user-credentials/{id}')
  @response(204, {
    description: 'UserCredentials PATCH success',
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredentials, {partial: true}),
        },
      },
    })
    userCredentials: UserCredentials,
  ): Promise<void> {
    await this.userCredentialsRepository.updateById(id, userCredentials);
  }

  @put('/user-credentials/{id}')
  @response(204, {
    description: 'UserCredentials PUT success',
  })
  async replaceById(
    @param.path.number('id') id: string,
    @requestBody() userCredentials: UserCredentials,
  ): Promise<void> {
    await this.userCredentialsRepository.replaceById(id, userCredentials);
  }

  @del('/user-credentials/{id}')
  @response(204, {
    description: 'UserCredentials DELETE success',
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.userCredentialsRepository.deleteById(id);
  }
}
