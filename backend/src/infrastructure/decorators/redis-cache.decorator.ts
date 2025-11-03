import { RedisClient } from "../cache/redis.client";

type CacheKeyBuilder = (...args: any[]) => string;

interface RedisCacheOptions {
  keyPrefix: string;
  keyBuilder?: CacheKeyBuilder;
  condition?: (args: any[]) => boolean;
  ttlSeconds?: number;
}

interface InvalidateRedisCacheOptions {
  keyPrefix: string;
  keyBuilder?: CacheKeyBuilder;
}

const DEFAULT_TTL_SECONDS = 3600;

export function RedisCache(options: RedisCacheOptions) {
  const { keyPrefix, keyBuilder, ttlSeconds = DEFAULT_TTL_SECONDS, condition } = options;

  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cacheService = RedisClient.getInstance();

    descriptor.value = async function (...args: any[]) {
      if (condition && !condition(args)) {
        return originalMethod.apply(this, args);
      }

      const keySuffix = keyBuilder ? keyBuilder(...args) : JSON.stringify(args);

      const cacheKey = `${keyPrefix}:${keySuffix}`;

      const cached = await cacheService.get(cacheKey);
      if (cached !== null) {
        console.log(`[CACHE HIT]: ${cacheKey}`);
        try {
          return JSON.parse(cached);
        } catch {
          return cached;
        }
      }

      console.log(`[CACHE MISS]: ${cacheKey}`);

      const result = await originalMethod.apply(this, args);

      await cacheService.set(
        cacheKey,
        JSON.stringify(result),
        "EX",
        ttlSeconds
      );

      return result;
    };

    return descriptor;
  };
}

export function InvalidateRedisCache(options: InvalidateRedisCacheOptions) {
  const { keyPrefix, keyBuilder } = options;

  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cacheService = RedisClient.getInstance();

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);

      const pattern = keyBuilder
        ? `${keyPrefix}:${keyBuilder(...args)}`
        : `${keyPrefix}:*`;

      const keys = await cacheService.keys(pattern);

      if (keys.length > 0) {
        await cacheService.del(keys);
        console.log(`[CACHE INVALIDATED]: ${pattern} (${keys.length} keys)`);
      }

      return result;
    };

    return descriptor;
  };
}
