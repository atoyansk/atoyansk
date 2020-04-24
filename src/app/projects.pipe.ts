import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectFilter',
  pure: false
})
export class ProjectsPipe implements PipeTransform {

    transform(items: Array<any>, category: string): Array<any> {
      if (category === 'all') {
        return items;
      } else {
        return items.filter(item => item.category === category);
      }
  }

}
