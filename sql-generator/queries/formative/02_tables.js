#!/usr/bin/env node

'use strict'
const entries = new Map()

module.exports = (knex) => {
  // create customer table
  entries.set('customerTable', {
    comment: 'Create table for customers',
    queryString: knex.schema
      .createTable('Customer', function (table) {
        table.string('cno').defaultTo(knex.raw(`cmp_get_random_string(4)`))
        table.string('cname').notNullable()
        table.string('cemail').notNullable()

        table.primary('cno')
        table.unique(['cname', 'cemail'])
      })
      .toString(),
  })

  // create courses table
  entries.set('coursesTable', {
    comment: 'Create table for courses',
    queryString: knex.schema
      .createTable('Course', function (table) {
        table.string('ccode').defaultTo(knex.raw(`cmp_get_random_string(4)`))
        table.string('ctitle').notNullable()
        table.text('cdescription').notNullable()
        table.integer('hours').notNullable()
        table.float('price').notNullable().unsigned()

        table.primary('ccode')

        table.unique(['ccode'])
      })
      .toString(),
  })

  // create booking table
  entries.set('bookingTable', {
    comment: 'Create table for booking',
    queryString: knex.schema
      .createTable('Booking', function (table) {
        table.string('bno').defaultTo(knex.raw(`cmp_get_random_string(4)`))
        table.string('cno').notNullable()
        table.string('ccode').notNullable()
        table.date('bdate').notNullable()

        table.primary('bno')

        table.foreign('cno').references('Customer.cno')
        table.foreign('ccode').references('Course.ccode')

        table.unique(['bno', 'cno', 'ccode'])
      })
      .toString(),
  })

  // create cancellation table
  entries.set('cancellationTable', {
    comment: 'Create table for cancellation',
    queryString: knex.schema
      .createTable('Cancel', function (table) {
        table.string('bno').notNullable()
        table.string('cno').notNullable()
        table.string('ccode').notNullable()
        table.string('c_user').defaultTo(knex.raw(`current_user`))
        table.timestamp('c_time').defaultTo(knex.fn.now())

        table.primary('bno')

        table.foreign('bno').references('Booking.bno')
        table.foreign('cno').references('Customer.cno')
        table.foreign('ccode').references('Course.ccode')

        table.unique(['bno', 'cno', 'ccode'])
      })
      .toString(),
  })

  return entries
}
