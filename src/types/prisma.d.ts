import { PrismaClient } from "@prisma/client";

declare global {
  namespace PrismaClient {
    export type CakeDelegate = any;
    export type DJDelegate = any;
  }
}
