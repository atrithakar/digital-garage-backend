import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateVehicleDto from './dto/createVehicleDto';

@Injectable()
export class VehicleService {
    constructor(private readonly prisma: PrismaService) {}

    async createVehicle(vehicle: CreateVehicleDto, userId: string) {
        return await this.prisma.vehicle.create({
            data: {
                ...vehicle,
                user: {
                    connect: {
                        id: userId,
                    }
                }
            }
        })
    }

    async getAllVehicles(userId: string) {
        return await this.prisma.vehicle.findMany({
            where: {
                userId
            }
        })
    }

    async getVehicleById(id: string) {
        return await this.prisma.vehicle.findUnique({
            where: {
                id
            }
        })
    }

    async deleteVehicle(id: string) {
        return await this.prisma.vehicle.delete({
            where: {
                id
            }
        })
    }

    async updateVehicle(id: string, vehicle: CreateVehicleDto) {
        return await this.prisma.vehicle.update({
            where: {
                id
            },
            data: vehicle
        })
    }
}
