import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from '../services/AuthService.service';
import { CreateUserDto } from '../dto/CreateUserDto.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const dtoWithhashedPassword = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 12),
    };
    return this.authService.createUser(dtoWithhashedPassword);
  }
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Get()
  async fetchUsers() {
    const users = await this.authService.fetchUsers();
    return users;
  }
  @Get(':id')
  async fetchUserbyId(@Param('id', ParseIntPipe) id: number) {
    const users = await this.authService.fetchUserbyId(id);
    return users;
  }
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.authService.deleteUser(id);
  }
}
