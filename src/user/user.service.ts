import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        // private readonly jwtService: JwtService,
      ) {}
    
    async signup(email : string, password : string, name : string, contact : string) {
        const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      )
    }
    const hashedPassword = await hash(password, 10);
    await this.userRepository.save({
      userEmail : email,
      userPassword : hashedPassword,
      userName : name,
      userContact : contact
    });
    }
    
    signin(email : string, password : string) {

    }


    async findByEmail(email: string) {
        return await this.userRepository.findOneBy({ userEmail : email });
    }
}
