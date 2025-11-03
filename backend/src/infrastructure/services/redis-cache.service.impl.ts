import { ICacheService } from "../../domain/services/cache.service";
import { RedisClient } from "../cache/redis.client";

export class RedisCacheService implements ICacheService {
  private client = RedisClient.getInstance();

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);

      if (!value) {
        return null;
      }

      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`❌ Cache GET error for key ${key}:`, error);
      return null;
    }
  }

  async set<T>(
    key: string,
    value: T,
    ttlSeconds: number = 3600
  ): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      await this.client.setex(key, ttlSeconds, serialized);
    } catch (error) {
      console.error(`❌ Cache SET error for key ${key}:`, error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error(`❌ Cache DELETE error for key ${key}:`, error);
    }
  }

  async deletePattern(pattern: string): Promise<void> {
    try {
      const keys = await this.client.keys(pattern);

      if (keys.length > 0) {
        await this.client.del(...keys);
      }
    } catch (error) {
      console.error(`❌ Cache DELETE PATTERN error for ${pattern}:`, error);
    }
  }
}
