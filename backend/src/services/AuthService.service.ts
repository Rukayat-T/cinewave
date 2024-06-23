import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/CreateUserDto.dto';
import { UserEntity } from 'src/entities/UserEntity.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
  fetchUserbyId(id: number) {
    return this.userRepository.findOneBy({ id });
  }
  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
  async login({ email, password }: CreateUserDto) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
      return;
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
      return;
    }

    const response = {
      user,
      jwt: await this.jwtService.signAsync({ id: user.id }),
    };

    return response;
  }
}
