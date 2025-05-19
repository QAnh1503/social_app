import { IsNotEmpty, IsString, Length } from "class-validator";

export default class CreatePostDto {
    // @IsString({message: "Name must be a string !"})
    // @Length(1, 255, {message: "Name is required !"})
    
    // @IsNotEmpty({message: "Description is required !"})
    // description: string;

    // @IsNotEmpty({message: "Image is required !"})
    // image: string;

    // @IsNotEmpty({message: "Password is required !"})
    // password: string;
}