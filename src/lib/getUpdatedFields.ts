
export function getUpdatedFields<T extends Record<string, unknown>>( original: T, updated: T ): Partial<T> {
    const changes: Partial<T> = {};

    for (const key in updated) {
        if (
            Object.prototype.hasOwnProperty.call(updated, key) &&
            JSON.stringify(updated[key]) !== JSON.stringify(original[key])
        ){
            changes[key] = updated[key];
        }
    }
    
    return changes;
}   