export interface IBaseRepository<T> {
  create(T: Omit<T, 'id' | 'disabled'>): Promise<T>;
  findById(id: number): Promise<T | null>;
  update(id: number, T: Partial<T>): Promise<T>;
  delete(id: number): Promise<T>;
}
