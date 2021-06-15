module.exports = ({ env }) => {
  if(env('NODE_ENV') === "development"){
    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'sqlite',
            filename: env('DATABASE_FILENAME', '.tmp/data.db'),
          },
          options: {
            useNullAsDefault: true,
          },
        },
      },
    }
  } else {
    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'postgres',
            host: env('DATABASE_HOST', '127.0.0.1'),
            port: env('DATABASE_PORT', 27017),
            database: env('DATABASE_NAME', 'strapi'),
            user: env('DATABASE_USERNAME', ''),
            password: env('DATABASE_PASSWORD', ''),
            ssl: {
              rejectUnauthorized: false
            }  
          },
          options: {
            ssl: true,
          },
        },
      },
    }
  }
}
