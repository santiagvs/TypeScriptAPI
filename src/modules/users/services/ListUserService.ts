import User from '@modules/users/typeorm/entities/User';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.find();

    return users;
  }
}

export default ListUserService;
