import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import CreateVehicleDto from './dto/createVehicleDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { type AuthenticatedRequest } from 'src/types/authenticated-request.interface';

@Controller('vehicle')
export class VehicleController {
    constructor(private vehicleService: VehicleService) {}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async createVehicle(@Body() vehicle: CreateVehicleDto, @Req() req: AuthenticatedRequest) {
        return await this.vehicleService.createVehicle(vehicle, req.user.id)
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    async getAllVehicles(@Req() req: AuthenticatedRequest) {
        return await this.vehicleService.getAllVehicles(req.user.id)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getVehicleById(@Param('id') id: string) {
        const result = await this.vehicleService.getVehicleById(id)
        if (!result) {
            throw new NotFoundException('Vehicle not found')
        }
        return result
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteVehicle(@Param('id') id: string) {
        const result = await this.vehicleService.deleteVehicle(id)
        if (!result) {
            throw new NotFoundException('Vehicle not found')
        }
        return result
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateVehicle(@Param('id') id: string, @Body() vehicle: CreateVehicleDto) {
        const result = await this.vehicleService.updateVehicle(id, vehicle)
        if (!result) {
            throw new NotFoundException('Vehicle not found')
        }
        return result
    }

    @Post(':id/tag/:tagId')
    @UseGuards(JwtAuthGuard)
    async addTagToVehicle(@Param('id') id: string, @Param('tagId') tagId: string) {
        const result = await this.vehicleService.addTagToVehicle(id, tagId)
        if (!result) {
            throw new NotFoundException('Vehicle not found')
        }
        return result
    }

    @Delete(':id/tag/:tagId')
    @UseGuards(JwtAuthGuard)
    async removeTagFromVehicle(@Param('id') id: string, @Param('tagId') tagId: string) {
        const result = await this.vehicleService.removeTagFromVehicle(id, tagId)
        if (!result) {
            throw new NotFoundException('Vehicle not found')
        }
        return result
    }

    @Get(':id/tags')
    @UseGuards(JwtAuthGuard)
    async getVehicleWithTags(@Param('id') id: string) {
        const result = await this.vehicleService.getVehicleWithTags(id)
        if (!result) {
            throw new NotFoundException('Vehicle not found')
        }
        return result
    }
}
