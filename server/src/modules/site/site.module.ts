import { Module, forwardRef } from '@nestjs/common';
import { SiteResolver } from './site.resolver';
import { SiteService } from './site.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from 'src/entities/site.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
    providers:[SiteResolver, SiteService],
    imports: [TypeOrmModule.forFeature([Site]), forwardRef(() => UserModule)],
    exports: [SiteService]
})
export class SiteModule {}
