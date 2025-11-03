import Redis, { Redis as RedisType } from "ioredis";
import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

export class RedisClient {
  private static instance: RedisType | null = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        db: Number(process.env.REDIS_DB),
        retryStrategy: (times: number) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
        maxRetriesPerRequest: 3,
      });

      this.instance.on("connect", () => {
        console.log("[REDIS]: Redis connected");
      });

      this.instance.on("error", (error: Error) => {
        console.error("[REDIS]: Redis error:", error);
      });
    }

    return this.instance;
  }

  static async disconnect() {
    if (this.instance) {
      await this.instance.quit();
      this.instance = null;
      console.log("[REDIS]: Redis disconnected");
    }
  }
}
