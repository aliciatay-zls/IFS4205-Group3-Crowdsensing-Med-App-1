psql -U postgres -c "\c ifs4205" -c "\copy backend_anonymizedrecord(age_range,height_range,weight_range,allergies,race,zipcode_range,sex,diagnosis) FROM './anon_patient.csv' with (DELIMITER',', FORMAT CSV, HEADER);"