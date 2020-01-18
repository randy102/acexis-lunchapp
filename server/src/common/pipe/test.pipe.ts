import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TestPipe implements PipeTransform {
  transform(value: any) {
    console.log("TEST: ",value);
    return value;
  }
}
