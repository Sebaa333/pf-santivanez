import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../features/dashboard/users/models';

@Pipe({
  name: 'userFullName',
  standalone: false
})
export class UserFullNamePipe implements PipeTransform {

  transform(value: User, transform?:'upercase'): string {

    const result = value.firstName + ' ' +value.lastName;

    if(transform === 'upercase'){
      return  `${result}`.toUpperCase();

    }
    return result
  }
}

