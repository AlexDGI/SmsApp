export class Recargas {
    Id:number
    Fecha:string
    Forma:string
    Referencia:string
    FecTransaccion:string
    Monto:number
    Banco:string
    Cuenta:string
    FecVerificacion: string
    UsrVerifico: string
    CantidSms:number
    Estado:string
    Imagen:string

    constructor(def:any)
    {
        {
            this.Id = def.Id || 0,
            this.Fecha = def.Fecha || '',
            this.Forma = def.Forma || '',
            this.Referencia = def.Referencia || '',
            this.FecTransaccion = def.FecTransaccion || '',
            this.Monto = def.Monto || 0,
            this.Banco = def.Banco || '',
            this.Cuenta = def.Cuenta || '',
            this.FecVerificacion = def.FecVerificacion || '',
            this.UsrVerifico = def.UsrVerifico || '',
            this.CantidSms = def.CantidSms || 0,
            this.Estado = def.Estado || '',
            this.Imagen = def.Imagen || ''
        }   
    }   

}