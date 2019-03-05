<!-- BASE URL: http://139.59.85.105:6500/api/ -->

Required headers for HTTP METHOD: content-type: 'application/x-www-form-urlencoded'
* Required fields

# Teacher:
| END POINT | HTTP METHOD | REQ PARAMS |
| ------ | ------ | ------ | 
| /add_teacher | POST | year, field, name, phone, email, password
| /update_teacher | POST | teacher_id
| /delete_teacher | POST | teacher_id
| /get_teachers | GET | 
| /teacher_login | POST | phone', 'password


# Course:
| END POINT | HTTP METHOD | REQ PARAMS |
| ------ | ------ | ------ | 
| /add_course | POST | name
| /update_course | POST | course_id
| /delete_course | POST | course_id
| /get_courses | GET | 

# Attendance:
| END POINT | HTTP METHOD | REQ PARAMS |
| ------ | ------ | ------ | 
| /add_attendance | POST | student_id, course_id, token, manual
| /update_attendance | POST | attendance_id
| /delete_attendance | POST | attendance_id
| /get_attendances | GET |
| /get_attendances_by_student_id | GET | student_id
| /get_attendances_by_course_id | GET | course_id

# Student:
| END POINT | HTTP METHOD | REQ PARAMS |
| ------ | ------ | ------ | 
| /add_student | POST | name, roll_number, field, year, email, phone, imei, device_details
| /update_student | POST | student_id
| /delete_student | POST | student_id
| /get_students | GET | 
| /get_students_by_field_year | GET | field, year
| /student_login | POST | phone, password
