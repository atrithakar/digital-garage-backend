import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
}
