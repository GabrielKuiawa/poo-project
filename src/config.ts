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
        throw new Error(`A variável de ambiente ${name} deve ser uma porta válida.`);
    }

    return value;
}

export const config = {
    port: requirePort('PORT'),
    database: {
        host: requireEnvironmentVariable('DB_HOST'),
        port: requirePort('DB_PORT'),
        username: requireEnvironmentVariable('DB_USERNAME'),
        password: requireEnvironmentVariable('DB_PASSWORD'),
        name: requireEnvironmentVariable('DB_DATABASE'),
    },
    jwtSecret: requireEnvironmentVariable('JWT_SECRET'),
};
