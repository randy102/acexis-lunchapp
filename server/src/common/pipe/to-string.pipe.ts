import { Injectable, PipeTransform, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ToStringPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata,) {
        if (typeof value === "string") return String(value);

        else if(typeof value === "object"){
            for(let key in value){
                value[key] = String(value[key]);
            }
            return value;
        }
        else return value;
    }
}
