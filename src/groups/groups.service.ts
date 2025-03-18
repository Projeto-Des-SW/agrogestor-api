import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Group } from '@prisma/client';
import { GroupsRepository } from './groups.repository';

@Injectable()
export class GroupsService {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async create(name: string): Promise<Group> {
    const existing = await this.findByName(name);
    if (existing) throw new ConflictException();
    return this.groupsRepository.create({ name });
  }

  async findById(id: number): Promise<Group | null> {
    return this.groupsRepository.findById(id);
  }

  async findByName(name: string): Promise<Group | null> {
    return this.groupsRepository.findByName(name);
  }

  async listAll() {
    return this.groupsRepository.listAll();
  }

  async getById(id: number): Promise<Group> {
    const group = await this.groupsRepository.findById(id);
    if (!group) throw new NotFoundException();
    return group;
  }

  async getByNameOrCreate(name: string): Promise<Group> {
    let group = await this.groupsRepository.findByName(name);
    if (!group) {
      group = await this.groupsRepository.create({ name });
    }
    return group;
  }

  async delete(id: number): Promise<Group> {
    await this.getById(id);
    return this.groupsRepository.delete(id);
  }
}
