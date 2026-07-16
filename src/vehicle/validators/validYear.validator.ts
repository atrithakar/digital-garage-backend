import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidYear' })
export class IsValidYearConstraint
  implements ValidatorConstraintInterface
{
  validate(value: number) {
    return value >= 1950 &&
           value <= new Date().getFullYear();
  }
}