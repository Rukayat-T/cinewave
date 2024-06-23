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
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { BaseResponse } from 'src/responses/BaseResponse.response';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Authentication')
export class UserController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const dtoWithhashedPassword = {
      ...createUserDto,
      password: await argon2.hash(createUserDto.password),
    };
    return this.authService.createUser(dtoWithhashedPassword);
  }
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Get('get-all-users')
  async fetchUsers() {
    const users = await this.authService.fetchUsers();
    return users;
  }
  @Get('get-user/:id')
  async fetchUserbyId(@Param('id') id: number): Promise<BaseResponse> {
    return await this.authService.fetchUserbyId(id);
  }
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.authService.deleteUser(id);
  }
}
