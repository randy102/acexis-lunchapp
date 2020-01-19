import { Module } from '@nestjs/common';
import { SiteResolver } from './site.resolver';
import { SiteService } from './site.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from 'src/entities/site.entity';

@Module({
    providers:[SiteResolver, SiteService],
    imports: [TypeOrmModule.forFeature([Site])],
    exports: [SiteService]
})
export class SiteModule {}
