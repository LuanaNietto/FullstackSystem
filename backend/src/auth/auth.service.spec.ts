import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: Partial<UserService>;

  beforeEach(async () => {
    userService = {
      findOneByEmail: jest.fn(),
      updateLastLogin: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'test', signOptions: { expiresIn: '60s' } })],
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Deve validar o usuário corretamente', async () => {
    const password = 'pass';
    const user = { id: '1', email: 'test@test.com', password: await require('bcryptjs').hash(password, 10)};
    
    (userService.findOneByEmail as jest.Mock).mockResolvedValue(user);

    const result = await service.validateUser(user.email, password);
    expect(result).toEqual(user);
  });

  it('Deve rejeitar senha inválida', async () => {
    const user = { id: '1', email: 'test@test.com', password: 'wronghash' };
    
    (userService.findOneByEmail as jest.Mock).mockResolvedValue(user);

    const result = await service.validateUser(user.email, 'otherpass');
    expect(result).toBeNull();
  });
});