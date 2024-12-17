import { TestingModule, Test } from '@nestjs/testing';
import { DomainEventPublisher } from '../../src/shared/domain/DomainEventPublisher';
import { CreateUserService } from '../../src/users/application/create-user.service';
import { User } from '../../src/users/domain/User';
import { UserCreatedEvent } from '../../src/users/domain/UserCreatedEvent';
import { UserRepository } from '../../src/users/domain/UserRepository';
import { USER_REPOSITORY } from '../../src/users/users.constants';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let userRepository: UserRepository;
  const fixedDate = new Date('2023-01-01T00:00:00Z');

  beforeAll(() => jest.useFakeTimers().setSystemTime(fixedDate));

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: USER_REPOSITORY,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    userRepository = module.get<UserRepository>(USER_REPOSITORY);
  });

  it('should create a user and publish an event', async () => {
    const id = '1';
    const name = 'John Doe';
    const email = 'john.doe@example.com';

    const user = new User(id, name, email);
    const saveSpy = jest
      .spyOn(userRepository, 'save')
      .mockResolvedValueOnce(undefined);
    const publishSpy = jest
      .spyOn(DomainEventPublisher, 'publish')
      .mockImplementationOnce(() => {});

    await service.execute(id, name, email);

    expect(saveSpy).toHaveBeenCalledWith(user);
    expect(publishSpy).toHaveBeenCalledWith(new UserCreatedEvent(user));
  });
});
