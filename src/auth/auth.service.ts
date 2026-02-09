import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

//This is for validate user
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  //this Came from Loging API
  async validateUser(email: string, password: string) {
    const User = await this.userService.findByEmail(email);
    if (!User) throw new UnauthorizedException('User not Found');
    //It uses """bcrypt.compare""" to compare the plain password provided by the user
    //  with the hashed password stored in user.password. The await keyword is crucial
    // here because bcrypt.compare is an asynchronous operation
    const IspasswordMatch = await compare(password, User.password); //this came from entity hashpass

    if (!IspasswordMatch)
      throw new UnauthorizedException('Invalid credintials');

    //If both checks pass, it returns an object containing only the id of the authenticated user.
    //  This is a security measure to avoid exposing sensitive information like the password

    return { id: User.id };
  }
}
