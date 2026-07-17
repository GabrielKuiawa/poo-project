function requireEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`A variável de ambiente ${name} é obrigatória.`);
  }

  return value;
}

function requirePort(name: string): number {
  const value = Number(requireEnvironmentVariable(name));

  if (!Number.isInteger(value) || value < 1 || value > 65535) {
    throw new Error(
      `A variável de ambiente ${name} deve ser uma porta válida.`,
    );
  }

  return value;
}

function readBooleanEnvironmentVariable(
  name: string,
  defaultValue: boolean,
): boolean {
  const value = process.env[name]?.trim().toLowerCase();

  if (!value) return defaultValue;
  if (value === "true") return true;
  if (value === "false") return false;

  throw new Error(`A variável de ambiente ${name} deve ser true ou false.`);
}

function readEnvironmentVariableList(
  name: string,
  defaultValues: string[],
): string[] {
  const value = process.env[name]?.trim();

  if (!value) return defaultValues;

  const values = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (values.length === 0) {
    throw new Error(
      `A variável de ambiente ${name} deve conter ao menos um valor.`,
    );
  }

  return [...new Set(values)];
}

const databaseUrl = process.env.DATABASE_URL?.trim();

export const config = {
  port: requirePort("PORT"),
  corsOrigins: readEnvironmentVariableList("CORS_ORIGIN", [
    "http://localhost:5173",
    "https://mood-board.gabizin.me",
  ]),
  database: {
    url: databaseUrl,
    host: databaseUrl ? undefined : requireEnvironmentVariable("DB_HOST"),
    port: databaseUrl ? undefined : requirePort("DB_PORT"),
    username: databaseUrl
      ? undefined
      : requireEnvironmentVariable("DB_USERNAME"),
    password: databaseUrl
      ? undefined
      : requireEnvironmentVariable("DB_PASSWORD"),
    name: databaseUrl ? undefined : requireEnvironmentVariable("DB_DATABASE"),
    ssl:
      Boolean(databaseUrl) || readBooleanEnvironmentVariable("DB_SSL", false),
  },
  jwtSecret: requireEnvironmentVariable("JWT_SECRET"),
};
