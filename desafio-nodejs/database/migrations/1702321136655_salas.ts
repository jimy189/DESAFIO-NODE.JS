import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'salas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer('numero_sala')
      table.integer('professor')
      table.integer('capacidade_alunos')
      table.boolean('disponibilidade')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
