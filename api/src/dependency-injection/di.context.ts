import { diContainer } from "@fastify/awilix";
import { asClass, asValue } from "awilix";
import { UserService } from "../domain/user/user.service.js";
import type { PrismaClientType } from "../infrastructure/db/prisma.client.js";
import type { AppLoggerType } from "../infrastructure/log/logger.model.js";

declare module "@fastify/awilix" {
  interface Cradle {
    logger: AppLoggerType;
    prismaClient: PrismaClientType;
    userService: UserService;
  }
}

interface ConfigureDiContextArgs {
  logger: AppLoggerType;
  prismaClient: PrismaClientType;
}

export async function configureDiContext({
  logger,
  prismaClient,
}: ConfigureDiContextArgs) {
  diContainer.register({
    logger: asValue(logger),
    prismaClient: asValue(prismaClient),

    userService: asClass(UserService).singleton(),
  });
}
