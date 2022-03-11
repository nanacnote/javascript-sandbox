
------------------------------------------
/*
Postgres dump.

author: 
    Owusu K. <adjeibohyen@hotmail.com>
*/
------------------------------------------


------------------------------------------
-- Create random string generator function
------------------------------------------

CREATE
OR REPLACE FUNCTION cmp_get_random_string(length INTEGER) RETURNS TEXT AS $$
declare
  chars text[] := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
  result text := '';
  i integer := 0;
begin
  if length < 0 then
    raise exception 'Given length cannot be less than 0';
  end if;
  for i in 1..length loop
    result := result || chars[1+random()*(array_length(chars, 1)-1)];
  end loop;
  return result;
end;
$$ LANGUAGE plpgsql;

------------------------------------------
-- Create table for customers
------------------------------------------

CREATE TABLE "Customer" (
  "cno" VARCHAR(255) DEFAULT cmp_get_random_string(4),
  "cname" VARCHAR(255) NOT NULL,
  "cemail" VARCHAR(255) NOT NULL
);
ALTER TABLE
  "Customer"
ADD
  CONSTRAINT "Customer_pkey" PRIMARY KEY ("cno");
ALTER TABLE
  "Customer"
ADD
  CONSTRAINT "customer_cname_cemail_unique" UNIQUE ("cname", "cemail");

------------------------------------------
-- Create table for courses
------------------------------------------

CREATE TABLE "Course" (
  "ccode" VARCHAR(255) DEFAULT cmp_get_random_string(4),
  "ctitle" VARCHAR(255) NOT NULL,
  "cdescription" TEXT NOT NULL,
  "hours" INTEGER NOT NULL,
  "price" REAL NOT NULL
);
ALTER TABLE
  "Course"
ADD
  CONSTRAINT "Course_pkey" PRIMARY KEY ("ccode");
ALTER TABLE
  "Course"
ADD
  CONSTRAINT "course_ccode_unique" UNIQUE ("ccode");

------------------------------------------
-- Create table for booking
------------------------------------------

CREATE TABLE "Booking" (
  "bno" VARCHAR(255) DEFAULT cmp_get_random_string(4),
  "cno" VARCHAR(255) NOT NULL,
  "ccode" VARCHAR(255) NOT NULL,
  "bdate" date NOT NULL
);
ALTER TABLE
  "Booking"
ADD
  CONSTRAINT "Booking_pkey" PRIMARY KEY ("bno");
ALTER TABLE
  "Booking"
ADD
  CONSTRAINT "booking_cno_foreign" FOREIGN KEY ("cno") REFERENCES "Customer" ("cno");
ALTER TABLE
  "Booking"
ADD
  CONSTRAINT "booking_ccode_foreign" FOREIGN KEY ("ccode") REFERENCES "Course" ("ccode");
ALTER TABLE
  "Booking"
ADD
  CONSTRAINT "booking_bno_cno_ccode_unique" UNIQUE ("bno", "cno", "ccode");

------------------------------------------
-- Create table for cancellation
------------------------------------------

CREATE TABLE "Cancel" (
  "bno" VARCHAR(255) NOT NULL,
  "cno" VARCHAR(255) NOT NULL,
  "ccode" VARCHAR(255) NOT NULL,
  "c_user" VARCHAR(255) DEFAULT CURRENT_USER,
  "c_time" timestamptz DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
  "Cancel"
ADD
  CONSTRAINT "Cancel_pkey" PRIMARY KEY ("bno");
ALTER TABLE
  "Cancel"
ADD
  CONSTRAINT "cancel_bno_foreign" FOREIGN KEY ("bno") REFERENCES "Booking" ("bno");
ALTER TABLE
  "Cancel"
ADD
  CONSTRAINT "cancel_cno_foreign" FOREIGN KEY ("cno") REFERENCES "Customer" ("cno");
ALTER TABLE
  "Cancel"
ADD
  CONSTRAINT "cancel_ccode_foreign" FOREIGN KEY ("ccode") REFERENCES "Course" ("ccode");
ALTER TABLE
  "Cancel"
ADD
  CONSTRAINT "cancel_bno_cno_ccode_unique" UNIQUE ("bno", "cno", "ccode");

------------------------------------------
-- Insert customer entries
------------------------------------------

INSERT INTO
  "Customer"
VALUES
  (100, 'B de la Iglesia', 'b.iglesia@uea.ac.uk');
INSERT INTO
  "Customer"
VALUES
  (101, 'Peter Davies', 'P.Davies@uea.ac.uk');
INSERT INTO
  "Customer"
VALUES
  (102, 'Norma Wilson', 'N.Wilson@uea.ac.uk');
INSERT INTO
  "Customer"
VALUES
  (103, 'Rita Muelson', 'R.Muelson@gmail.com');
INSERT INTO
  "Customer"
VALUES
  (104, 'David Burrows', 'D.Burrows@uea.ac.uk');
INSERT INTO
  "Customer"
VALUES
  (105, 'Cindy Edwards', 'C.Edwards@hotmail.com');
INSERT INTO
  "Customer"
VALUES
  (106, 'Mark Leason', 'M.Leason@hotmail.com');
INSERT INTO
  "Customer"
VALUES
  (107, 'Dean Smith', 'D.Smith@hotmail.com');
INSERT INTO
  "Customer"
VALUES
  (108, 'Gerard Leveson', 'G.Leveson@hotmail.com');
INSERT INTO
  "Customer"
VALUES
  (109, 'Giovanni Montesi', 'G.Montesi@gmail.com');

------------------------------------------
-- Insert course entries
------------------------------------------

INSERT INTO
  "Course"
VALUES
  (
    'SQL1',
    'Basic SQL',
    'A basic course on SQL',
    10,
    400
  );
INSERT INTO
  "Course"
VALUES
  (
    'SQL2',
    'Advanced SQL',
    'An advanced SQL course',
    15,
    700
  );
INSERT INTO
  "Course"
VALUES
  (
    'ML01',
    'Basic Machine Learning',
    'An introduction to Machine Learning principles',
    7,
    500
  );
INSERT INTO
  "Course"
VALUES
  (
    'VIS1',
    'Introduction to Visualisation',
    'Basic graphs in R',
    10,
    600
  );
INSERT INTO
  "Course"
VALUES
  (
    'CB01',
    ' Computational Biology',
    'Some concepts for Bio-informatics',
    12,
    700
  );
INSERT INTO
  "Course"
VALUES
  (
    'SQL3',
    ' PostgreSQL',
    'Looking at PosgreSQL specifically for DBAs',
    12,
    700
  );
INSERT INTO
  "Course"
VALUES
  (
    'Node',
    'NodeJS',
    'An introduction to NodeJS and how it interacts with an SQL database',
    7,
    300
  );

------------------------------------------
-- Insert bookings entries
------------------------------------------

SET
  datestyle = dmy;
INSERT INTO
  "Booking"
VALUES
  (1, 100, 'SQL1', '07/05/2021');
INSERT INTO
  "Booking"
VALUES
  (2, 103, 'SQL1', '07/05/2021');
INSERT INTO
  "Booking"
VALUES
  (3, 100, 'SQL2', '14/05/2021');
INSERT INTO
  "Booking"
VALUES
  (4, 101, 'SQL1', '11/05/2021');
INSERT INTO
  "Booking"
VALUES
  (5, 101, 'ML01', '14/05/2021');
INSERT INTO
  "Booking"
VALUES
  (6, 103, 'ML01', '18/05/2021');
INSERT INTO
  "Booking"
VALUES
  (7, 103, 'CB01', '27/05/2021');
INSERT INTO
  "Booking"
VALUES
  (8, 105, 'SQL1', '07/05/2021');
INSERT INTO
  "Booking"
VALUES
  (9, 106, 'SQL2', '07/05/2021');
INSERT INTO
  "Booking"
VALUES
  (10, 106, 'VIS1', '07/05/2021');
INSERT INTO
  "Booking"
VALUES
  (11, 103, 'SQL2', '06/06/2021');
INSERT INTO
  "Booking"
VALUES
  (12, 105, 'CB01', '21/05/2021');
