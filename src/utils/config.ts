import { config as envConfig } from "@/lib/config";

type ConfigType = typeof envConfig;

class Config {
  private env: ConfigType;

  constructor() {
    this.env = envConfig;
  }

  // Getter to access nested environment variables by dot-separated path
  get<T = unknown>(paths: string): T | undefined {
    const pathArray = paths.split("."); // Split the path into an array

    // Traverse the nested object using the path array
    let result: unknown = this.env;
    for (const key of pathArray) {
      if (result && typeof result === "object" && key in result) {
        result = (result as Record<string, unknown>)[key]; // Move deeper in the nested object
      } else {
        return undefined; // Return undefined if the key doesn't exist at any level
      }
    }

    return result as T; // Return the final value, casted to type T
  }
}

export const config = new Config();
