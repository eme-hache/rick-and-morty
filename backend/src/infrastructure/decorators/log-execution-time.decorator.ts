export function LogExecutionTime(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const start = Date.now();
    const className = target.constructor.name;

    console.log(`[EXECUTION]: ${className}.${propertyKey} Starting...`);

    try {
      const result = await originalMethod.apply(this, args);
      const duration = Date.now() - start;

      console.log(
        `[EXECUTION]: ${className}.${propertyKey} Completed in ${duration}ms`
      );

      return result;
    } catch (error) {
      const duration = Date.now() - start;

      console.log(
        `[EXECUTION]: ${className}.${propertyKey} Failed in ${duration}ms`
      );

      throw error;
    }
  };

  return descriptor;
}
