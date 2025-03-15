import { merge } from 'lodash-es';
import { IBaseRepository } from './base.repository.interface';

export abstract class BaseRepositoryMock<
  T extends { id: number; disabled?: boolean },
> implements IBaseRepository<T>
{
  data: T[] = [];
  nextId = 1;

  abstract defaultProperties(): Partial<T>;

  create = jest.fn(async (T: Omit<T, 'id' | 'disabled'>) => {
    const t = {
      ...this.defaultProperties(),
      ...T,
      id: this.nextId++,
    } as T;
    this.data.push(t);
    return t;
  });

  findById = jest.fn(async (id: number) => {
    return this.data.find((e) => e.id === id) ?? null;
  });

  update = jest.fn(async (id: number, T: Partial<T>) => {
    const i = this.data.findIndex((e) => e.id === id);
    this.data[i] = merge(this.data[i], T);
    return this.data[i];
  });

  delete = jest.fn(async (id: number) => {
    const existing = (await this.findById(id)) as T;
    if (existing?.disabled) {
      existing.disabled = true;
    } else {
      this.data = this.data.filter((e) => e.id !== id);
    }
    return existing;
  });
}
