const app = require('./config/Express')();
const config = require('./config/Config')();
const logger = require('./app/utils/Logger');
require('./config/Database')(config.MONGODB_URI);

// Initialize the app
app.listen(config.PORT, () => {
  logger.success(`\nTodolist server running on port ${config.PORT}`);
});
