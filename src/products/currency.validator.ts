import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as currencyCodes from 'currency-codes';

@ValidatorConstraint({ async: false })
export class IsCurrencyCodeConstraint implements ValidatorConstraintInterface {
  validate(currencyCode: any) {
    return (
      typeof currencyCode === 'string' && !!currencyCodes.code(currencyCode)
    );
  }

  defaultMessage() {
    return 'Invalid currency code';
  }
}

export function IsCurrencyCode(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCurrencyCodeConstraint,
    });
  };
}
