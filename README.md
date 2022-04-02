# e-commerce-wins-all
developed a backend for an e-commerce website using express.js and mysql

[video link](https://drive.google.com/file/d/1jPoN7Us0ElqKD-4t7ZlmOl5TezDZ3isV/view?usp=sharing)

This link is a  walkthrough video demonstrating the functionality of the application.

---
## Requirements
1. Created a back end for an e-commerce site with a working Express.js API to using Sequelize to interact with a MySQL database
2. Users will add a database name, MySQL username, and MySQL password to an environment variable file in order to connect to a database using Sequilize
3. After entering schema and seed commands, a development database is created and seeded with test data
4. The command, npm start, will start the program and the Sequelize models are synced to the MySQL database
5. The API GET routes can be viewed in Insomnia for categories, products, and tags to see the data in JSON format
6. Testing API POST, PUT, and DELETE will successfully create, update, and delete data
---

---
Process:
---
Everything was going smoothly with this application and I actually started to feel like I was understanding the mysql syntax when using it with sequelize. Then I encountered a huge error that had me stuck for hours. All because I had placed an " as: pruducts_tagged, " inside the models. Other then that, the project was a good one and I appreciated practicing my coding with databases.

---
Cited:
---
https://www.npmjs.com/package/mysql - for mysql references

https://sequelize.org/docs/v6/core-concepts - for sequelize references

https://dba.stackexchange.com/questions/150865/how-to-model-a-three-way-association-that-involves-product-category-and-label - for model structuring help

https://forum.freecodecamp.org/t/nodejs-sequelize-eager-loading-error/480312/7 - for help with an error I was getting