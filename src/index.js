const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
AdminBro.registerAdapter(AdminBroMongoose);

const AdminBroExpress = require('@admin-bro/express');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const User = require('./models/User');

mongoose
  .connect(/* Өөрийнхөө хаягийг оруулаарай */ 'TODO', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    const adminBro = new AdminBro({
      databases: [db],
      resources: [User],
      rootPath: '/admin',
    });

    const router = AdminBroExpress.buildRouter(adminBro);
    app.use(adminBro.options.rootPath, router);

    app.listen(8080, () =>
      console.log('🚀 Server is running on http://localhost:8080'),
    );
  });
