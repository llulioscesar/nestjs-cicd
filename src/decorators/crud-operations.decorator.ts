type CrudOperation = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';

export function LogOperation(operation: CrudOperation) {
    return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            console.log(`${operation} operation started...`);
            const result = originalMethod.apply(this, args);
            console.log(`${operation} operation finished.`);
            return result;
        }
    }
}