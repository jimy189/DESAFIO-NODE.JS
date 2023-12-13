import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'classes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer('professor_id')
      table.integer('sala_id')
      table.integer('aluno_id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
