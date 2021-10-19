using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp_Moon.FastAutomapper
{
    class Program
    {
        static void Main(string[] args)
        {
            var origen = new Origen
            {
                Id = 1,
                Nombre = "Cadena de texto",
                Activo = true,
                Nacimiento = DateTime.Now,
                Items = new Item[]
                {
                    new Item {BirthDate=DateTime.Now,LastName="Pepefex" },
                    new Item {BirthDate=DateTime.Now,LastName="Pepefex1" },
                    new Item {BirthDate=DateTime.Now,LastName="Pepefex2" }
                }
            };

            Destino destino = Moon.FastAutoMapper.Mapper.Map<Origen, Destino>(origen);

            Console.WriteLine("Header");
            Console.Read();

            
        }
    }

    public class Origen
    {

        public int Id { get; set; }
        public string Nombre { get; set; }
        public bool Activo { get; set; }
        public DateTime Nacimiento { get; set; }
        public DateTime? Creacion { get; set; }
        public Item[] Items { get; set; }
    }

    public class Item
    {
        public DateTime BirthDate { get; set; }
        public string LastName { get; set; }

    }
    public class Item2
    {
        public DateTime BirthDate { get; set; }
        public string LastName { get; set; }

    }
    public class Destino
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public bool Activo { get; set; }
        public DateTime Nacimiento { get; set; }
        public Item2[] Items { get; set; }
    }
}
