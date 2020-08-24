-- 1. Write a query that selects all the passengers for flight LA3456.
SELECT p.passenger_code, p.customer_name, f.flight_no
    FROM passenger p
    JOIN flight_passenger f
    ON p.passenger_code = f.passenger_code
    WHERE f.flight_no = 'LA3456';


-- 2. Write a query that selects the flights carrying medical supplies.
SELECT f.flight_no, f.flight_type
    FROM freight_type AS f
    WHERE f.flight_type = 'Medical Supplies';


-- 3. Write a query that selects all the passengers 
--       who have not checked in baggage for flight LA3456.
SELECT p.passenger_code, p.customer_name, f.check_in
    FROM passenger p
    JOIN flight_passenger f
    ON p.passenger_code = f.passenger_code
    WHERE f.check_in = 'F';


-- 4. Write a query that shows all flights going to Shannon.
WITH mid_flight_detail AS (
        SELECT f1.flight_no, f1.destination
        FROM freight_flight f1
        WHERE f1.destination = 'Shannon'
        UNION
        SELECT f2.aircraft_no, f2.destination
        FROM private_flight f2
        WHERE f2.destination = 'Shannon'
        ), 
    final_flight_detail AS (
        SELECT f3.flight_no, f3.destination
        FROM flight_destination f3
        WHERE f3.destination = 'Shannon'
        UNION
        SELECT f4.flight_no, f4.destination
        FROM mid_flight_detail f4
    )
SELECT final.flight_no, final.destination
    FROM final_flight_detail final;


--  5. Write a query that counts the number of flights in March 2016. 
WITH mid_flight_detail AS (
        SELECT f1.flight_no, f1.departure_date
        FROM freight_flight f1
        WHERE f1.departure_date BETWEEN '2016-02-28' AND '2016-04-01'
        UNION
        SELECT f2.aircraft_no, f2.departure_date
        FROM private_flight f2
        WHERE f2.departure_date BETWEEN '2016-02-28' AND '2016-04-01'
        ), 
    final_flight_detail AS (
        SELECT f3.flight_no, f3.flight_date
        FROM flight f3
        WHERE f3.flight_date BETWEEN '2016-02-28' AND '2016-04-01'
        UNION
        SELECT f4.flight_no, f4.departure_date
        FROM mid_flight_detail f4
    )
SELECT final.flight_no, final.flight_date
    FROM final_flight_detail final;


--  6. Update the records for flight GF456 to a new departure time of 18.00 
--      and a corresponding new arrival time given that the flight duration is the same. 
UPDATE flight_destination SET
    departure_time = '18:00:00', arrival_time = '18:00:00'  + (45 * INTERVAL '1 minute')
WHERE flight_no = 'GF456';


--  7. Update the records for private flight C786 so that the pilot is now listed as ‘Paul Stow’. 
UPDATE private_flight SET
    pilot = 'Paul Stow'
WHERE aircraft_no = 'C786';


--  8. Update all flights in January 2016 that have a destination 
--      of Le Touquet so that they now are going to Lydd. 
UPDATE flight_destination SET destination = 'Lydd'
    WHERE destination = 'Le Touquet';
UPDATE private_flight SET destination = 'Lydd'
    WHERE destination = 'Le Touquet';
UPDATE freight_flight SET destination = 'Lydd'
    WHERE destination = 'Le Touquet';


--  9. Update the record for Chaz Smith so that his nationality is now listed as French. 
UPDATE passenger SET nationality = 'French'
    WHERE customer_name = 'Chaz Smith';


--  10. Delete all private flights for the date of 03 January 2016. 
DELETE FROM private_flight
    WHERE departure_date = '2016-01-03';

