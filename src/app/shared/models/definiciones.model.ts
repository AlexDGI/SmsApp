export class Definiciones {
    Id:number
    Siglas:string
    Nombre:string
    Descripcion:string
    Valor:string | number | boolean
    Tipo:string
    Opciones!:string
    Status!:boolean
    CtrolSugerido!:string
    createdAt?: Date | null;
    updatedAt?: Date | null;

    constructor(def:any)
    {
        {
            this.Id = def.Id || 0,
            this.Siglas = def.Sigla || '',
            this.Nombre = def.Nombre || '',
            this.Descripcion = def.Descripcion || '',
            this.Valor = def.Valor || '',
            this.Tipo = def.Tipo || ''
        }   
    }   

}