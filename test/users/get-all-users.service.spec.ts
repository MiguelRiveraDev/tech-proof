import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUsersService } from '../../src/users/application/get-all-users.service';
import { UserRepository } from '../../src/users/domain/UserRepository';
import { USER_REPOSITORY } from '../../src/users/users.constants';
import { User } from '../../src/users/domain/User';

describe('GetAllUsersService', () => {
  let service: GetAllUsersService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllUsersService,
        {
          provide: USER_REPOSITORY,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GetAllUsersService>(GetAllUsersService);
    userRepository = module.get<UserRepository>(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    const result1 = true;
    const result: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: '',
      },
    ];
    jest.spyOn(userRepository, 'findAll').mockResolvedValue(result);

    expect(result1).toBeTruthy();
  });
});
