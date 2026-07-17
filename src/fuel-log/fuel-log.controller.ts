import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FuelLogService } from './fuel-log.service';
import CreateFuelLogDto from './dto/createFuelLogDto';

@Controller('fuel-log')
export class FuelLogController {
    constructor(private fuelLogService: FuelLogService) { }

    @Post('create')
    async createFuelLog(@Body() fuelLog: CreateFuelLogDto) {


        return await this.fuelLogService.createFuelLog(fuelLog)
    }

    @Get('all/:vehicleId')
    async getAllFuelLogs(@Param('vehicleId') vehicleId: string) {
        return await this.fuelLogService.getAllFuelLogsByVehicleId(vehicleId)
    }

    @Get('efficiency/:vehicleId')
    async calculateLitresPer100km(@Param('vehicleId') vehicleId: string) {
        return await this.fuelLogService.calculateLitresPer100km(vehicleId)
    }

    @Get(':id')
    async getFuelLogById(@Param('id') id: string) {
        return await this.fuelLogService.getFuelLogById(id)
    }

    @Put(':id')
    async updateFuelLog(@Param('id') id: string, @Body() fuelLog: CreateFuelLogDto) {
        return await this.fuelLogService.updateFuelLog(id, fuelLog)
    }

    @Delete(':id')
    async deleteFuelLog(@Param('id') id: string) {
        return await this.fuelLogService.deleteFuelLog(id)
    }

}
