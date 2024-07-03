import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/CreateUserDto.dto';
import { UserEntity } from 'src/entities/UserEntity.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { BaseResponse } from 'src/responses/BaseResponse.response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDto,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }
  fetchUsers() {
    return this.userRepository.find();
  }
  async fetchUserbyId(id: number): Promise<BaseResponse> {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        return {
          status: 404,
          message: 'user not found',
        };
      }
      return {
        status: 200,
        message: 'user found',
        response: user,
      };
    } catch (error) {
      return {
        status: 400,
        message: 'bad request',
      };
    }
  }
  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
  async login({ email, password }: CreateUserDto): Promise<BaseResponse> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      return {
        status: 404,
        message: 'Email not found',
      };
    }
    if (!(await argon2.verify(user.password, password))) {
      return {
        status: 400,
        message: 'Incorrect password',
      };
    }

    const response = {
      jwt: await this.jwtService.signAsync({ user }),
    };

    return {
      status: 200,
      message: 'Log In Successful',
      response: response,
    };
  }
}
