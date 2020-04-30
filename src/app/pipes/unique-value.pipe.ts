import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'uniqueValue'
})
export class UniqueValuePipe implements PipeTransform {
  public transform(values: any[], property: string): any {
    return values.reduce((a, b, c) => {
      if (a.indexOf(b[property]) < 0) {
        a.push(b[property])
      }
      return a
    }, [])
  }
}
