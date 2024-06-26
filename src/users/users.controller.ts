import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UpdateUserSettingsDto } from './dtos/UpdateUserSettings.dto';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto) {
		return this.usersService.createUser(createUserDto);
	}

	@Get()
	getUsers() {
		return this.usersService.getUsers();
	}

	@Get(':id')
	async getUserById(@Param('id', ParseIntPipe) id: number) {
		const user = await this.usersService.getUserById(id);

		if (!user) throw new HttpException('User Not Found', 404);

		return user;
	}

	@Patch(':id')
	updateUserById(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
		return this.usersService.updateUserById(id, data);
	}

	@Delete(':id')
	deleteUserById(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.deleteUserById(id);
	}

	@Patch(':id/settings')
	updateUserSettingsByUserId(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateUserSettingsDto: UpdateUserSettingsDto,
	) {
		return this.usersService.updateUserSettings(id, updateUserSettingsDto);
	}
}
