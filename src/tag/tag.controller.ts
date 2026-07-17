import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { TagService } from './tag.service';
import CreateTagDto from './dto/createTagDto';

@Controller('tag')
export class TagController {
    constructor(private tagService: TagService) {}

    @Post('create')
    async createTag(@Body() tag: CreateTagDto) {
        return await this.tagService.createTag(tag.name)
    }

    @Get('all')
    async getAllTags() {
        return await this.tagService.getAllTags()
    }

    @Get(':id')
    async getTagById(@Param('id') id: string) {
        return await this.tagService.getTagById(id)
    }

    @Put(':id')
    async updateTag(@Param('id') id: string, @Body() tag: CreateTagDto) {
        return await this.tagService.updateTag(id, tag.name)
    }

    @Delete(':id')
    async deleteTag(@Param('id') id: string) {
        return await this.tagService.deleteTag(id)
    }
}
