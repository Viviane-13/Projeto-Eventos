import Knex from 'knex'

export async function up(knex: Knex){
  return knex.schema.createTable('event_users', table=>{
    table.integer('id').primary();

    table.integer('event_id').notNullable().references('id').inTable('events');

    table.integer('insc_id').notNullable().references('id').inTable('insc_event')
  })
}
export async function down(knex: Knex){
  return knex.schema.dropTable('event_users');
}