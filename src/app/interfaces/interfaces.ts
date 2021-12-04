export interface Componente
{
  icon:string
  name:string
  redirectTo: string
  children: child[]
  open:boolean
}
interface child {
  title: string
  url: string
  icon: string
}