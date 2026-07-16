import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import CreateUserDto from './dto/createUserDto';
import LoginUserDto from './dto/loginUserDto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() user: CreateUserDto){
        const result =  await this.authService.signup(user)
        return result
    }

    @Post('login')
    async login(@Body() user: LoginUserDto) {
        const result = await this.authService.login(user)

        if(!result) {
            return {
                error: "Invalid credentials",
                code: 401,
            }
        }

        return {token: result.token}
    }
}
