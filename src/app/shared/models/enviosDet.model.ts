
export class Detalles {
    Id:number
    IdMae:string
    Telefono:string
    Mensaje:string
    Dato1:string
    Dato2:string
    Estado:string


    constructor(def:any)
    {
        {
            this.Id = def.Id || 0,
            this.IdMae = def.IdMae || '',
            this.Telefono = def.Telefono || '',
            this.Mensaje = def.Mensaje || '',
            this.Dato1 = def.Dato1 || '',
            this.Dato2 = def.Dato2 || '',
            this.Estado = def.Estado || ''
        }   
    }   

}