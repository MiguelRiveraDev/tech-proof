import { User } from './User';

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  deleteById(id: string): Promise<void>;
}
