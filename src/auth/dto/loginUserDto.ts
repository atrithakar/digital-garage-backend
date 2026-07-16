import { IsEmail, IsString } from "class-validator";

export default class LoginUserDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}