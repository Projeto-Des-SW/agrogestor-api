import { JwtService } from '@nestjs/jwt';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

export type JwtMock = DeepMockProxy<JwtService>;
export function createJwtMock() {
  return mockDeep<JwtService>();
}
//
