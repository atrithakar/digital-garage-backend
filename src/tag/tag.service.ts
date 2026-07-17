import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
    constructor(private readonly prisma: PrismaService) {}

    async createTag(name: string) {
        return await this.prisma.tag.create({
            data: {
                name
            }
        })
    }

    async getAllTags() {
        return await this.prisma.tag.findMany()
    }

    async getTagById(id: string) {
        return await this.prisma.tag.findUnique({
            where: {
                id
            }
        })
    }

    async updateTag(id: string, name: string) {
        return await this.prisma.tag.update({
            where: {
                id
            },
            data: {
                name
            }
        })
    }

    async deleteTag(id: string) {
        return await this.prisma.tag.delete({
            where: {
                id
            }
        })
    }
}
