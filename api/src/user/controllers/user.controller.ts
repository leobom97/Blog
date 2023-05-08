import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserService } from '../services/user.service';
import { Response } from 'express';
import { UpdateUserDTO } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  registerUser(@Body() createUserDtO: CreateUserDTO, @Res() res: Response) {
    return (
      this.userService.createUser(createUserDtO),
      res.json({ message: 'User succefully created!!!' })
    );
  }

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDTO,
    @Res() res: Response,
  ) {
    return (
      this.userService.updateUser(id, user),
      res.json({ message: `User ${id} successfully updated!!!` })
    );
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    return (
      this.userService.deleteOne(id),
      res.json({ message: `User ${id} succefully deleted` })
    );
  }
}
