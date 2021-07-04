# test_nodejs_api_todo

# To run the application
npm run dev

# Migration Database
## Before creating a new migration you need 
B1: npm i -D typescript

B2: npx tsc --init: to create file tsconfig.json

B3: Enable some properties in file tsconfig.json

B4: Install the npm package: 
npm install typeorm --save

B5: You need to install reflect-metadata shim:
npm install reflect-metadata --save
and import it somewhere in the global place of your app (for example in server.ts):
import "reflect-metadata";

B6: You may need to install node typings:
npm install @types/node --save-dev

B7: Install a database driver (MySQL)
npm install mysql --save (you can install mysql2 instead as well)

Also, make sure you are using TypeScript version 3.3 or higher, and you have enabled the following settings in tsconfig.json:

"emitDecoratorMetadata": true,
"experimentalDecorators": true,

B8: Setup your connection options properly in file "ormconfig.json"

# Tables needed to run the project: 2 tables
+ Task
+ User

