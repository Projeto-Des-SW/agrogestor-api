import { JwtService } from '@nestjs/jwt';
import { MockFactory } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'src/prisma.service';

export class MockContext {
  prisma = mockDeep<PrismaService>();
  jwt = mockDeep<JwtService>();

  toMockFactory(): MockFactory {
    return (token) => {
      switch (token) {
        case PrismaService:
          return this.prisma;
        case JwtService:
          return this.jwt;
      }
    };
  }
}
export class PrismaMockError extends Error {
  constructor(public code: string) {
    super();
  }
}
//
