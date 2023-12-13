
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numeroSala: number
  @column()
  public professor: number
  @column()
  public capacidadeAlunos: number
  @column()
  public disponibilidade: Boolean
}
