
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function jsonValidator(control: AbstractControl): boolean {
    if (control.value) {
        try {
            return !!JSON.parse(control.value);
        } catch {
            return false;
        }
    }

    return true;
}