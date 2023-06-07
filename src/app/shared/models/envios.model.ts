export class Envios {
    Id:number
    IdCliente:string
    Nombre:string
    Fecha:string
    Registros:string
    Estado:string


    constructor(def:any)
    {
        {
            this.Id = def.Id || 0,
            this.IdCliente = def.IdCliente || '',
            this.Nombre = def.Nombre || '',
            this.Fecha = def.Fecha || '',
            this.Registros = def.NombreContacto || '',
            this.Estado = def.Estado || ''
        }   
    }   

}