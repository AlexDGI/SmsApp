export class Clientes {
    Id:number
    IdFiscal:string
    RazonSocial:string
    FirmaSms:string
    NombreContacto:string
    TlfContacto:string
    EmailContacto!:string
    Estado!:string


    constructor(def:any)
    {
        {
            this.Id = def.Id || 0,
            this.IdFiscal = def.IdFiscal || '',
            this.RazonSocial = def.RazonSocial || '',
            this.FirmaSms = def.FirmaSms || '',
            this.NombreContacto = def.NombreContacto || '',
            this.TlfContacto = def.TlfContacto || ''
            this.EmailContacto = def.EmailContacto || '',
            this.Estado = def.Estado || ''
        }   
    }   

}