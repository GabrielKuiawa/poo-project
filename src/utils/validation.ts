import BadRequestException from '../exception/BadRequestException';

export const validateTextField = (value: unknown, fieldName: string, maxLength: number, minLength = 1): string => {
    if (typeof value !== 'string' || value.trim().length < minLength) {
        throw new BadRequestException(`${fieldName} deve ter pelo menos ${minLength} caractere(s).`);
    }

    if (value.length > maxLength) {
        throw new BadRequestException(`${fieldName} não pode exceder ${maxLength} caracteres.`);
    }

    return value.trim();
};

export const validateEmail = (value: unknown): string => {
    const email = validateTextField(value, 'Email', 255);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new BadRequestException('Email inválido.');
    }

    return email.toLowerCase();
};

export const validateId = (value: unknown, fieldName = 'ID'): string => {
    const id = validateTextField(value, fieldName, 36, 36);

    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
        throw new BadRequestException(`${fieldName} deve ser um UUID válido.`);
    }

    return id;
};

export const validateIdArray = (value: unknown, fieldName: string): string[] => {
    if (!Array.isArray(value)) {
        throw new BadRequestException(`${fieldName} deve ser uma lista.`);
    }

    const ids = value.map((id, index) => validateId(id, `${fieldName}[${index}]`));
    return [...new Set(ids)];
};
