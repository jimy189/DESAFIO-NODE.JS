
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Classe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public professorId: number

  @column()
  public salaId: number

  @column()
  public alunoId: number
}
