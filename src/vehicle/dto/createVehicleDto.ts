import { IsNotEmpty, IsNumber, IsString, Validate } from "class-validator";
import { IsValidYearConstraint } from "../validators/validYear.validator";

export default class CreateVehicleDto{
    @IsString()
    @IsNotEmpty()
    make: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsNumber()
    @IsNotEmpty()
    @Validate(IsValidYearConstraint)
    year: number;

    @IsString()
    @IsNotEmpty()
    plateNumber: string;

    @IsString()
    @IsNotEmpty()
    color: string;
}