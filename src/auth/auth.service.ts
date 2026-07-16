import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateUserDto from './dto/createUserDto';
import * as bcrypt from 'bcrypt'
import LoginUserDto from './dto/loginUserDto';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async signup(user: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        return await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                hashedPassword: hashedPassword,
            }
        })
    }

    async login(user: LoginUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: user.email,
            }
        })

        if(!existingUser){
            return false;
        }

        const isPasswordValid = await bcrypt.compare(user.password, existingUser.hashedPassword)

        if(!isPasswordValid){
            return false;
        }  
        
        const jwtPayload = {
            id: existingUser.id,
            email: existingUser.email
        }

        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, { expiresIn: '1h' })

        return {
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
            },
            token
        }
    }
}
