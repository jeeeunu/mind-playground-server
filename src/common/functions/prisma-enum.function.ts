export function prismaEnumFunction<
  T extends Record<string, any>,
  K extends keyof T,
>(enums: T, values: K[]) {
  return values.length !== 0 ? values : Object.keys(enums);
}
