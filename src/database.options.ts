import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

export const DB_OPTIONS_ENV = {
  type: 'postgres',
  name: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [
    path.join(__dirname, '**', 'domain/**/model/!(*.spec.ts)'),
    path.join(__dirname, '**', 'integrations/**/*.model{.ts,.js}'),
  ],
  synchronize: false,
  logging: false,
  migrations: ['src/migrations/**/*{.ts,.js}'],
};

@Injectable()
export class DatabaseOptions implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return DB_OPTIONS_ENV as TypeOrmModuleOptions;
  }
}

export const AppDataSource = new DataSource(
  DB_OPTIONS_ENV as DataSourceOptions,
);
