import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class OneOfConstraint implements ValidatorConstraintInterface {
  validate(activities: any, args: ValidationArguments) {
    return ['seller', 'buyer'].includes(activities)
  }
}

export function OneOf(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: OneOfConstraint,
    });
  };
}
