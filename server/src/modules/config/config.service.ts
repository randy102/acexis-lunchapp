import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from 'src/entities/config.entity';
import { Repository } from 'typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import {CronJob, job, CronTime } from "cron";
import * as moment from "moment";
import { MenuService } from '../menu/menu.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ConfigService {
    constructor(
        @InjectRepository(Config) private readonly repo: Repository<Config>,
         private readonly schedulerRegistry: SchedulerRegistry,
         private readonly menuService: MenuService,
         private readonly userService: UserService){}

    getConfig(){
        return this.repo.findOne();
    }

    async updateConfig(order, confirm, startConfirm){
        let  config = await this.repo.findOne();

        if(!config){ //If not exist, create new config
            config = new Config();
        }

        //save to db
        config.closeConfirm = confirm;
        config.closeOrder = order;
        config.startConfirm = startConfirm;
        
        //Change cron Job
        const orderJob = this.schedulerRegistry.getCronJob("close-order");
        orderJob.setTime(new CronTime(this.getCronTime(order)));
        orderJob.start();
        
        const confirmJob = this.schedulerRegistry.getCronJob("close-confirm");
        confirmJob.setTime(new CronTime(this.getCronTime(confirm)));
        confirmJob.start();

        return this.repo.save(config);

    }

    async createCron(){
        const {closeOrder, closeConfirm} = await this.getConfig();

        const orderJob = new CronJob(this.getCronTime(closeOrder), () => {
           this.menuService.closeMenu();
        })
        const confirmJob = new CronJob(this.getCronTime(closeConfirm), () => {
            this.userService.blockUser();
        })

        this.schedulerRegistry.addCronJob("close-confirm", confirmJob);
        this.schedulerRegistry.addCronJob("close-order", orderJob);

        orderJob.start();
        confirmJob.start();
    }

    getCronTime(time: string){
        const mm = moment(time, "HH:mm");
        const hour = mm.hour();
        const min = mm.minute();
        return `${min} ${hour} * * *`;
    }
}
