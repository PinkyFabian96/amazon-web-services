import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PATH_ROUTING } from './path-routing.routes';

const ROUTES = [...PATH_ROUTING];

@Module({
    imports: [RouterModule.register(ROUTES)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
