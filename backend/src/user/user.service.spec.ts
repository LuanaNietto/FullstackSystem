import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findUserById', () => {
    it('Deve lançar NotFoundException quando usuário não existe', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(userService.findOneById("999")).rejects.toThrow(NotFoundException);
    });
  });

  describe('createUser', () => {
    it('Deve lançar ConflictException quando o email já estiver cadastrado', async () => {
      const dto = { email: 'teste@exemplo.com', name: 'Teste', password: '123456' };

      mockUserRepository.findOne.mockResolvedValue({ id: 1, ...dto }); 
      mockUserRepository.create.mockImplementation((dto) => ({ ...dto })); 

      await expect(userService.create(dto)).rejects.toThrow(ConflictException);
    });
  });
});