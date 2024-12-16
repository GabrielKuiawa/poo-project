export const validateTextField = (value: string,fieldName: string,maxLength: number,minLength: number = 1): void => {
    if (!value || value.trim().length < minLength) {
        throw new Error(`${fieldName} must be at least ${minLength} characters long.`);
    }
    if (value.length > maxLength) {
        throw new Error(`${fieldName} cannot exceed ${maxLength} characters.`);
    }
};
