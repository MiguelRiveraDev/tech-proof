import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserService } from '../../src/users/application/delete-user.service';
import { UserRepository } from '../../src/users/domain/UserRepository';
import { InMemoryUserRepository } from '../../src/users/infrastructure/InMemoryUserRepository';
import { USER_REPOSITORY } from '../../src/users/users.constants';

describe('DeleteUserService', () => {
  let service: DeleteUserService;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        {
          provide: USER_REPOSITORY,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
    userRepository = module.get<UserRepository>(USER_REPOSITORY);
  });
  beforeEach(() => {
    userRepository.save({ id: '1', name: 'John Doe', email: 'hola@hola.com' });
  });

  it('should call deleteById with the correct id', async () => {
    const id = '1';
    await service.execute(id);
    const user = await userRepository.findById(id);
    expect(user).toBeNull();
  });
});
