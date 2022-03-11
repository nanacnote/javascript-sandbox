#!/usr/bin/env node

'use strict'
const entries = new Map()

module.exports = (knex) => {
  // create date format trigger
  //   entries.set('dateFormatTrigger', {
  //     comment: 'Create date format trigger',
  //     queryString: knex
  //       .raw(
  //         `
  // Create or replace function cmp_format_date()
  // returns trigger as $$
  // declare
  //     stringified char(10) := to_char(OLD.bdate, 'DD/MM/YYYY');
  //     formatted char(10) := to_date(stringified, 'MM/DD/YYYY');
  // begin
  //     NEW.bdate := stringified;
  //     return NEW;
  // end;
  // $$ language 'plpgsql';

  // create trigger cmp_format_date before insert or update on "Booking"
  // for each row execute function cmp_format_date();
  // `
  //       )
  //       .toString(),
  //   })

  return entries
}
