export const booleanAttributeConverter = {
  fromAttribute(value: string | null): boolean {
    return value === "true"
  },
  toAttribute(value: boolean): string {
    return value ? "true" : "false"
  }
}