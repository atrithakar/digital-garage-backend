import { IsNotEmpty, IsString } from "class-validator";

export default class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}