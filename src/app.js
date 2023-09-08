const { app, port } = require('./server');
const apiRoutes = require('./routes/apiRoutes');
const { errorHandler, notFoundHandler } = require('./errorMiddleware');

// Use the API routes
app.use('/', apiRoutes);

// Error handling middleware
app.use(notFoundHandler); // 404 handler should come before errorHandler
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
