import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateInsuranceDto from './dto/createInsuranceDto';

@Injectable()
export class InsuranceService {
    constructor(private readonly prisma: PrismaService) {}

    async addInsurance(insurance: CreateInsuranceDto) {
        return await this.prisma.insurance.create({
            data: {
                vehicleId: insurance.vehicleId,
                provider: insurance.provider,
                policyNumber: insurance.policyNumber,
                issueDate: new Date(insurance.issueDate),
                expiryDate: new Date(insurance.expiryDate),
                premiumAmount: insurance.premiumAmount
            }
        })
    }

    async getInsuranceByVehicleId(vehicleId: string) {
        return await this.prisma.insurance.findUnique({
            where: {
                vehicleId
            }
        })
    }

    async updateInsurance(vehicleId: string, insurance: CreateInsuranceDto) {
        return await this.prisma.insurance.update({
            where: {
                vehicleId
            },
            data: {
                vehicleId: insurance.vehicleId,
                provider: insurance.provider,
                policyNumber: insurance.policyNumber,
                issueDate: new Date(insurance.issueDate),
                expiryDate: new Date(insurance.expiryDate),
                premiumAmount: insurance.premiumAmount
            }
        })
    }

    async deleteInsurance(vehicleId: string) {
        return await this.prisma.insurance.delete({
            where: {
                vehicleId
            }
        })
    }
}
