using System.Threading.Tasks;

namespace Prod.MAKEUP.Datos.Contexto
{
    public partial class GestorDbContext
    {
        public void SaveChanges(string jsonAuthN)
        {
            //TODO
        }

        public async Task SaveChangesAsync(string jsonAuthN)
        {
            //TODO
            await Task.Delay(0);
        }

        public void SaveAudit()
        {
            //TODO
        }
    }
    
    public partial class TemplateContext 
    {
        public void SaveChanges(string jsonAuthN)
        {
            throw new System.NotImplementedException();
        }

        public Task SaveChangesAsync(string jsonAuthN)
        {
            throw new System.NotImplementedException();
        }

        public void SaveAudit()
        {
            throw new System.NotImplementedException();
        }
    }
}
