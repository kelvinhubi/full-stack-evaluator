namespace task_manager_api.Services
{
    public class DbConnectionServices
    {
        private readonly String _DbConnection;
        public DbConnectionServices(IConfiguration configuration)
        {
            _DbConnection = configuration.GetConnectionString("DefaultConnection");
        }
        public string GetConnectionString()
        {
            return _DbConnection;
        }
    }
}
