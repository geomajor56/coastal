import psycopg2
import sys
import csv
import math

con = None
firstLine = True
try:
    con = psycopg2.connect(database='capecodbay', user='ccs', password='huskies1975')
    cur = con.cursor()
    # cur.execute("DELETE FROM  monitor_nutrients")
    print 'Yay'
except psycopg2.DatabaseError, e:
    # print 'Error %.4f' % e
    print 'Bummer'
    sys.exit(1)

def float_for_db(f):  # nedbat from bostonpython
    if math.isnan(f):
        return None
    else:
        return f
# cur.execute("DROP TABLE IF EXISTS monitor_nutrients")
# cur.execute("CREATE TABLE monitor_nutrients (id serial PRIMARY KEY, sample_date date, station_id numeric(8,4), depth_class integer, temp numeric(8,4), salinity numeric(8,4), diss_o numeric(8,4), ph numeric(8,4), chl numeric(8,4), pheo numeric(8,4), turb numeric(8,4), no numeric(8,4), nh numeric(8,4), po numeric(8,4), si numeric(8,4), tn numeric(8,4), tp numeric(8,4));")
# con.commit()

with open('surface_data_5_12_2015.csv', 'rb') as csvfile:

    try:
        reader = csv.reader(csvfile, delimiter=',')
        next(reader, None)
        for row in reader:
            cruise = ''
            cruiseDate = "%s-%s-%s" % (row[0], row[1], row[2])
            depthClass = 0
            stationId = row[3]
            temp = float_for_db(float(row[4]))
            salinity = float_for_db(float(row[5]))
            dissolved_o = float_for_db(float(row[6]))
            ph = 0.0
            nitrate = float_for_db(float(row[8]))
            orthoPhosphate = float_for_db(float(row[9]))
            ammonium = float_for_db(float(row[10]))
            silicate = float_for_db(float(row[11]))
            totalNitrogen = float_for_db(float(row[12]))
            totalPhosphate = float_for_db(float(row[13]))
            chlorophyll = float_for_db(float(row[14]))
            pheophytin = float_for_db(float(row[15]))
            turbidity = float_for_db(float(row[16]))


            cur.execute(
                "INSERT INTO monitor_sampleparameters(cruise, cruise_date, depth_class, temp, salinity, dissolved_o, ph, chl, pheo,"
                " turb, no, nh, po, si, tn, tp, station_id)"
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (cruise, cruiseDate, depthClass, temp, salinity, dissolved_o, ph, chlorophyll, pheophytin,
                 turbidity, nitrate, ammonium, orthoPhosphate, silicate, totalNitrogen, totalPhosphate, stationId))
            con.commit()

            # print cruiseDate, stationId, depthClass, temp, salinity, dissolved_o, nitrate, orthoPhosphate, ammonium, silicate, totalNitrogen, totalPhosphate, chlorophyll, pheophytin, turbidity

    finally:
        csvfile.close()
        if con:
            con.close()
