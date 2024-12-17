import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async deleteById(id: string): Promise<void> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error('User not found');
    }
    this.users.delete(id);
  }
}
