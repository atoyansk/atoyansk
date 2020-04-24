import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({
  name: 'uniqueCategory',
  pure: false
})
export class UniqueCategoryPipe implements PipeTransform {

  transform(items: any[], args: any[]): any {

    // lodash uniqBy function
    return _.uniqBy(items, args);
  }

}
