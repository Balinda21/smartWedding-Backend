import { PrismaClient } from "@prisma/client";

declare global {
  namespace PrismaClient {
    export interface PrismaClient {
      gift: any;
    }
  }
}
