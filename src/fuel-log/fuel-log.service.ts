import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateFuelLogDto from './dto/createFuelLogDto';

@Injectable()
export class FuelLogService {
    constructor(private readonly prisma: PrismaService) {}

    async createFuelLog(fuelLog: CreateFuelLogDto) {
        return await this.prisma.fuelLog.create({
            data: fuelLog
        })
    }

    async getAllFuelLogsByVehicleId(vehicleId: string) {
        return await this.prisma.fuelLog.findMany({
            where: {
                vehicleId
            }
        })
    }

    async getFuelLogById(id: string) {
        return await this.prisma.fuelLog.findUnique({
            where: {
                id
            }
        })
    }

    async updateFuelLog(id: string, fuelLog: CreateFuelLogDto) {
        return await this.prisma.fuelLog.update({
            where: {
                id
            },
            data: fuelLog
        })
    }

    async deleteFuelLog(id: string) {
        return await this.prisma.fuelLog.delete({
            where: {
                id
            }
        })
    }

}
