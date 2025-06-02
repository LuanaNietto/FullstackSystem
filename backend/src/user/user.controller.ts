import {
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  Body,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiQuery({ name: 'role', required: false })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['name', 'createdAt'] })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
  @Get()
  async findAll(
    @Req() req,
    @Query('role') role?: UserRole,
    @Query('sortBy') sortBy?: 'name' | 'createdAt',
    @Query('order') order?: 'asc' | 'desc',
  ) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Somente administradores podem visualizar todos os usuários.');
    }
    return this.userService.findAll(role, sortBy ?? 'createdAt', (order ?? 'asc').toUpperCase() as 'ASC' | 'DESC');
  }

  @Get('inactive')
  async findInactive(@Req() req) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Somente administradores podem visualizar usuários inativos.');
    }
    return this.userService.listInactiveUsers();
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    if (req.user.role !== UserRole.ADMIN && req.user.userId !== id) {
      throw new ForbiddenException('Você não tem permissão para visualizar este usuário.');
    }
    return this.userService.findOneById(id);
  }

  @Put(':id')
  async update(@Req() req, @Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto, req.user);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    return this.userService.remove(id, req.user);
  }
}