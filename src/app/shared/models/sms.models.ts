export class Sms {
    Telefono: number
    Mensaje: string
    Deuda: number

    constructor(def:any)
    {
        {
            this.Telefono = def.Telefono || 0,
            this.Mensaje = def.Mensaje || '',
            this.Deuda = def.Deuda || 0
        }   
    }   
}