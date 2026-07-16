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
}
