import { Injectable, NotFoundException } from '@nestjs/common';
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

    async getTwoLatestFuelLogs(vehicleId: string) {
        const currFuelLog = await this.prisma.fuelLog.findFirst({
            where: {
                vehicleId
            },
            orderBy: {
                odometerReading: 'desc'
            }
        })

        if(!currFuelLog) {
            throw new NotFoundException("Can't find current fuel log")
        }

        const prevFuelLog = await this.prisma.fuelLog.findFirst({
            where: {
                vehicleId: currFuelLog.vehicleId,
                odometerReading: {
                    lt: currFuelLog.odometerReading
                }
            },
            orderBy: {
                odometerReading: 'desc'
            }
        })

        if(!prevFuelLog) {
            throw new NotFoundException("Can't find previous fuel log")
        }

        return {currFuelLog, prevFuelLog};
    }

    async calculateLitresPer100km(vehicleId: string) {
        const {currFuelLog, prevFuelLog} = await this.getTwoLatestFuelLogs(vehicleId)

        if(!currFuelLog || !prevFuelLog) {
            throw new NotFoundException("Can't find fuel logs")
        }

        const distance = currFuelLog.odometerReading - prevFuelLog.odometerReading
        const litres = currFuelLog.fuelAmountInLitres
        const litresPer100km = (litres / distance) * 100

        return litresPer100km
    }

    async calculateFuelSpendings(vehicleId: string, startDate: Date, endDate: Date) {
        const fuelLogs = await this.getAllFuelLogsByVehicleId(vehicleId)

        const filteredFuelLogs = fuelLogs.filter(fuelLog => {
            return fuelLog.refuelDate >= startDate && fuelLog.refuelDate <= endDate
        })

        const totalCost = filteredFuelLogs.reduce((acc, fuelLog) => acc + fuelLog.totalCost, 0)

        return totalCost
    }
}
