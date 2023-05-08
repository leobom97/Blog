import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entitie';
import { Observable, from } from 'rxjs';
import { IUser } from '../interfaces/user_interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser({ name, username, password }: IUser) {
    const createdUser = this.userRepository.create({
      name: name,
      username: username,
      password: password,
    });

    await this.userRepository.save(createdUser);

    return createdUser;
  }

  async findAll() {
    return from(this.userRepository.find());
  }

  async findUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userFound) {
      throw new NotFoundException(
        `User's id ${id} not found! Please use a valid id `,
      );
    } else {
      return userFound;
    }
  }

  async updateUser(id: number, user: IUser) {
    const findUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!findUser) {
      throw new NotFoundException(
        `Usuário de id: ${id} não foi encontrado. Por favor verifique se o id é válido`,
      );
    } else {
      const updateUser = await this.userRepository.update(
        { id: id },
        { name: user.name, username: user.username, password: user.password },
      );

      return updateUser;
    }
  }

  async deleteOne(id: number) {
    const findUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!findUser) {
      throw new NotFoundException(
        `Usuário de id: ${id} não foi encontrado. Por favor verifique se o id é válido`,
      );
    } else {
      const updateUser = await this.userRepository.delete({ id: id });

      return updateUser;
    }
  }
}
