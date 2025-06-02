import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { User, UserRole } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.repo.findOne({ where: { email: createUserDto.email } });

    if (userExists) {
      throw new ConflictException('Email já está cadastrado');
    }

    const user = this.repo.create(createUserDto);
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    return this.repo.save(user);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.repo.findOne({ where: { email } });
    return user ?? undefined;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async findAll(
    filterRole?: UserRole,
    sortBy: 'name' | 'createdAt' = 'createdAt',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<User[]> {
    const options: FindManyOptions<User> = {
      order: { [sortBy]: order },
    };
    if (filterRole) {
      options.where = { role: filterRole };
    }
    return this.repo.find(options);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    currentUser: User,
  ): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (currentUser.role !== UserRole.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException('Você não tem permissão para atualizar este usuário');
    }
    
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);

    return this.repo.save(user);
  }

  async remove(id: string, currentUser: User): Promise<void> {
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Somente administradores podem excluir usuários');  
    }
    await this.repo.delete(id);
  }

  async listInactiveUsers(): Promise<User[]> {
    const date30DaysAgo = new Date();
    date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);

    return this.repo
      .createQueryBuilder('user')
      .where('user.lastLoginAt IS NULL OR user.lastLoginAt < :date', {
        date: date30DaysAgo,
      })
      .getMany();
  }

  async updateLastLogin(id: string) {
    await this.repo.update(id, { lastLoginAt: new Date() });
  }
}