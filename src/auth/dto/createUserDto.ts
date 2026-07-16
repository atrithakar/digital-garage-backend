import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Matches } from "class-validator"

export default class CreateUserDto {

    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(32)
    name: string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/[A-Z]/, { message: 'Password must contain an uppercase letter' })
    @Matches(/[a-z]/, { message: 'Password must contain a lowercase letter' })
    @Matches(/\d/, { message: 'Password must contain a number' })
    @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain a special character',
    })
    password: string
}