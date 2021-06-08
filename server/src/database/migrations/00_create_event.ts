import Knex from 'knex'

export async function up(knex: Knex){
  return knex.schema.createTable('events', table =>{
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.date('dt_init').notNullable();
    table.date('dt_fin').notNullable();
    table.integer('qtd_vgs').notNullable();
  } )
}
export async function down(knex: Knex){
  return knex.schema.dropTable('events');
}