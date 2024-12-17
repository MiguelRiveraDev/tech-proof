import { Test, TestingModule } from '@nestjs/testing';
import { GetUserService } from '../../src/users/application/get-user.service';
import { UserRepository } from '../../src/users/domain/UserRepository';
import { USER_REPOSITORY } from '../../src/users/users.constants';
import { User } from '../../src/users/domain/User';

describe('GetUserService', () => {
  let service: GetUserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserService,
        {
          provide: USER_REPOSITORY,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GetUserService>(GetUserService);
    userRepository = module.get<UserRepository>(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user when found', async () => {
    const user: User = {
      id: '1',
      name: 'John Doe',
      email: '',
    };
    jest.spyOn(userRepository, 'findById').mockResolvedValue(user);

    expect(await service.execute('1')).toEqual(user);
  });

  it('should return null when user is not found', async () => {
    jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

    expect(await service.execute('2')).toBeNull();
  });

  it('should call userRepository.findById with correct id', async () => {
    const findByIdSpy = jest
      .spyOn(userRepository, 'findById')
      .mockResolvedValue(null);

    await service.execute('3');
    expect(findByIdSpy).toHaveBeenCalledWith('3');
  });
});
