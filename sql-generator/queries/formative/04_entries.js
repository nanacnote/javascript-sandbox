#!/usr/bin/env node

'use strict'
const entries = new Map()

module.exports = (knex) => {
  // insert customer entries
  entries.set('customerEntries', {
    comment: 'Insert customer entries',
    queryString: knex
      .raw(
        `
INSERT INTO "Customer" values (100,'B de la Iglesia', 'b.iglesia@uea.ac.uk');
INSERT INTO "Customer" values (101,'Peter Davies', 'P.Davies@uea.ac.uk');
INSERT INTO "Customer" values (102,'Norma Wilson', 'N.Wilson@uea.ac.uk');
INSERT INTO "Customer" values (103,'Rita Muelson', 'R.Muelson@gmail.com');
INSERT INTO "Customer" values (104,'David Burrows', 'D.Burrows@uea.ac.uk');
INSERT INTO "Customer" values (105,'Cindy Edwards', 'C.Edwards@hotmail.com');
INSERT INTO "Customer" values (106,'Mark Leason', 'M.Leason@hotmail.com');
INSERT INTO "Customer" values (107,'Dean Smith', 'D.Smith@hotmail.com');
INSERT INTO "Customer" values (108,'Gerard Leveson', 'G.Leveson@hotmail.com');
INSERT INTO "Customer" values (109,'Giovanni Montesi', 'G.Montesi@gmail.com');
`
      )
      .toString(),
  })

  // insert course entries
  entries.set('courseEntries', {
    comment: 'Insert course entries',
    queryString: knex
      .raw(
        `
INSERT INTO "Course" values ('SQL1','Basic SQL', 'A basic course on SQL', 10,400);
INSERT INTO "Course" values ('SQL2','Advanced SQL', 'An advanced SQL course', 15, 700);
INSERT INTO "Course" values ('ML01','Basic Machine Learning', 'An introduction to Machine Learning principles', 7,500);
INSERT INTO "Course" values ('VIS1','Introduction to Visualisation', 'Basic graphs in R', 10,600);
INSERT INTO "Course" values ('CB01',' Computational Biology', 'Some concepts for Bio-informatics', 12,700);
INSERT INTO "Course" values ('SQL3',' PostgreSQL', 'Looking at PosgreSQL specifically for DBAs', 12,700);
INSERT INTO "Course" values ('Node','NodeJS', 'An introduction to NodeJS and how it interacts with an SQL database',7, 300);
`
      )
      .toString(),
  })

  // insert booking entries
  entries.set('bookingEntries', {
    comment: 'Insert bookings entries',
    queryString: knex
      .raw(
        `
SET datestyle = dmy;
INSERT INTO "Booking" values (1,100,'SQL1','07/05/2021');
INSERT INTO "Booking" values (2,103,'SQL1','07/05/2021');
INSERT INTO "Booking" values (3,100,'SQL2','14/05/2021');
INSERT INTO "Booking" values (4,101,'SQL1','11/05/2021');
INSERT INTO "Booking" values (5,101,'ML01','14/05/2021');
INSERT INTO "Booking" values (6,103,'ML01','18/05/2021');
INSERT INTO "Booking" values (7,103,'CB01','27/05/2021');
INSERT INTO "Booking" values (8,105,'SQL1','07/05/2021');
INSERT INTO "Booking" values (9,106,'SQL2','07/05/2021');
INSERT INTO "Booking" values (10,106,'VIS1','07/05/2021');
INSERT INTO "Booking" values (11,103,'SQL2','06/06/2021');
INSERT INTO "Booking" values (12,105,'CB01','21/05/2021');
`
      )
      .toString(),
  })

  return entries
}
