import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { CreateGroupPostDto } from './dtos/CreateGroupPost.dto';

@Controller('posts')
export class PostsController {
	constructor(private postsService: PostsService) { }

	@Post()
	createPost(@Body() { userId, ...createPostDto }: CreatePostDto) {
		return this.postsService.createPost(userId, createPostDto);
	}

	@Post('group')
	createGroupPost(@Body() { userIds, ...createGroupPostDto }: CreateGroupPostDto) {
		return this.postsService.createGroupPost(userIds, createGroupPostDto);
	}

	@Get('group')
	getGroupPosts() {
		return this.postsService.getGroupPosts();
	}
}
