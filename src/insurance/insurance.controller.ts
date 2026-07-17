import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import CreateInsuranceDto from './dto/createInsuranceDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('insurance')
export class InsuranceController {
    constructor(private readonly insuranceService: InsuranceService) {}

    @Post('add')
    @UseGuards(JwtAuthGuard)
    async addInsurance(@Body() insurance: CreateInsuranceDto) {
        return await this.insuranceService.addInsurance(insurance)
    }

    @Get(':vehicleId')
    @UseGuards(JwtAuthGuard)
    async getInsuranceByVehicleId(@Param('vehicleId') vehicleId: string) {
        return await this.insuranceService.getInsuranceByVehicleId(vehicleId)
    }

    @Put(':vehicleId')
    @UseGuards(JwtAuthGuard)
    async updateInsurance(@Param('vehicleId') vehicleId: string, @Body() insurance: CreateInsuranceDto) {
        return await this.insuranceService.updateInsurance(vehicleId, insurance)
    }

    @Delete(':vehicleId')
    @UseGuards(JwtAuthGuard)
    async deleteInsurance(@Param('vehicleId') vehicleId: string) {
        return await this.insuranceService.deleteInsurance(vehicleId)
    }
}
