import { IsNotEmpty, IsString, Length } from "class-validator";

export default class CreateProductDto {
    @IsString({message: "Name must be a string !"})
    // @Length(1, 255, {message: "Name is required !"})
    @IsNotEmpty({message: "Name is required !"})
    name: string;

    @IsNotEmpty({message: "Email is required !"})
    email: string;

    @IsNotEmpty({message: "Password is required !"})
    password: string;
}