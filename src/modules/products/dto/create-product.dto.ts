import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export default class CreateProductDto {
    @IsString({message: "Name must be a string !"})
    // @Length(1, 255, {message: "Name is required !"})
    @IsNotEmpty({message: "Name is required !"})
    name: string;

    @IsNumber({}, {message: "Price must be a number !"})
    price: number;

    @IsString({message: "Description must be a number !"})
    description: string;
}