import Knex from 'knex'

export async function up(knex: Knex){
  return knex.schema.createTable('insc_event', table =>{
    table.increments('id').primary();
   
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.date('dt_nasc').notNullable();
  })
}
export async function down(knex:Knex){
  return knex.schema.dropTable('insc_event');
}