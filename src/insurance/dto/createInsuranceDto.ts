import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"

export default class CreateInsuranceDto {

    @IsString()
    @IsNotEmpty()
    vehicleId: string

    @IsString()
    @IsNotEmpty()
    provider: string

    @IsString()
    @IsNotEmpty()
    policyNumber: string

    @IsDateString()
    @IsNotEmpty()
    issueDate: string

    @IsDateString()
    @IsNotEmpty()
    expiryDate: string

    @IsNumber()
    @IsNotEmpty()
    premiumAmount: number
}