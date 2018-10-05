import { AccountService } from './../Services/account.service';
import { AbstractControl } from '@angular/forms';

export class ValidateMemberNoNotTaken {
    static createValidator(accountService: AccountService) {
        return (control: AbstractControl) => {
            return accountService.VerifyMemberNo(control.value).map(res => {
                return res ? { memberNoTaken: true } : null;
            });
        };
    }
}