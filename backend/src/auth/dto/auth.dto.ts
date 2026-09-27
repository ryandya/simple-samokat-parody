import { IsEmail, IsString, MinLength } from "class-validator"

export class AuthDTO {
    @IsEmail()
    email: string

    @MinLength(6, {
        message: 'Password < 6'
    })
    @IsString()
    password: string
}