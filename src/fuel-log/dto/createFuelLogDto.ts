import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreateFuelLogDto {
    @IsString()
    @IsNotEmpty()
    vehicleId: string;

    @IsNumber()
    @IsNotEmpty()
    odometerReading: number;

    @IsNumber()
    @IsNotEmpty()
    fuelAmountInLitres: number;

    @IsNumber()
    @IsNotEmpty()
    totalCost: number;

    @IsString()
    @IsNotEmpty()
    fuelType: string;
    
    @IsDateString()
    @IsNotEmpty()
    refuelDate: string;
    
}