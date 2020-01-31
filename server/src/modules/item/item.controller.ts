import { Controller, Post, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from "xlsx";

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService){}

    @Post('uploadexcel')
    @UseInterceptors(FileInterceptor('file'))
    async addItemFromExcel(@UploadedFile() file, @Query() {menu}){
        const excel = XLSX.read(file.buffer, {type: "buffer"});
        const itemTotal = excel['Strings'].length;
        const cells = excel.Sheets.Sheet1;
        let items = [];
        let curRow = 1;
        while(curRow <= itemTotal){
            items.push({
                name: cells[`A${curRow}`].h,
                total: cells[`B${curRow}`] ? cells[`B${curRow}`].v : 0
            });
            curRow++;
        }
        await this.itemService.addItemFromExcel(menu,items);
        //console.log({itemTotal, items});
    }
}
