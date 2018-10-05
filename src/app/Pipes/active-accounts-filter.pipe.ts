import { Pipe, PipeTransform } from '@angular/core';
import { AccountInformation } from '../Models/AccountInformation';

@Pipe({
  name: 'ActiveAccountsFilter',
  pure: false
})
export class ActiveAccountsFilterPipe implements PipeTransform {

  transform(items: AccountInformation[], filter: AccountInformation): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter( (item:AccountInformation) => this.applyFilter(item, filter));
  }

  applyFilter(accountInformation: AccountInformation, filter: AccountInformation): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (accountInformation[field].toLowerCase().indexOf(filter[field].toLowerCase()) !== -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (accountInformation[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }

}
