import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
     const dataSource = new DataSource({
        type: 'mysql',
        host: 'animesao-manjjackson-624c.a.aivencloud.com',
        port: 22764,
        username: 'avnadmin',
        password: 'AVNS_Koyqb7fRA1JCi5sElzm',
        database: 'animesaobd',
        /*type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'animesao',*/
        entities: [
         __dirname + '/../**/*.entity{.ts,.js}'
        ], 
        
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];

