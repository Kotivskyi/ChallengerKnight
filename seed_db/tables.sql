CREATE TABLE classes(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE,
    sections VARCHAR(50)
);

CREATE TABLE departments(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE sections(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE leave_policies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE,
    is_active BOOLEAN DEFAULT true,
    is_editable BOOLEAN DEFAULT true
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) DEFAULT NULL,
    last_login TIMESTAMP DEFAULT NULL,
    role_id INTEGER REFERENCES roles(id),
    created_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_dt TIMESTAMP DEFAULT NULL,
    leave_policy_id INTEGER REFERENCES leave_policies(id) DEFAULT NULL,
    is_active BOOLEAN DEFAULT false,
    reporter_id INTEGER DEFAULT NULL,
    status_last_reviewed_dt TIMESTAMP DEFAULT NULL,
    status_last_reviewer_id INTEGER REFERENCES users(id) DEFAULT NULL,
    is_email_verified BOOLEAN DEFAULT false
);

CREATE TABLE user_profiles(
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    gender VARCHAR(10) DEFAULT NULL,
    marital_status VARCHAR(50) DEFAULT NULL,
    join_dt DATE DEFAULT NULL,
    qualification VARCHAR(100) DEFAULT NULL,
    experience VARCHAR(100) DEFAULT NULL,
    dob DATE DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    class_name VARCHAR(50) REFERENCES classes(name)
        ON UPDATE CASCADE
        ON DELETE SET NULL
        DEFAULT NULL,
    section_name VARCHAR(50) REFERENCES sections(name)
        ON UPDATE CASCADE
        ON DELETE SET NULL
        DEFAULT NULL,
    roll INTEGER DEFAULT NULL,
    department_id INTEGER REFERENCES departments(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
        DEFAULT NULL,
    admission_dt DATE DEFAULT NULL,
    father_name VARCHAR(50) DEFAULT NULL,
    father_phone VARCHAR(20) DEFAULT NULL,
    mother_name VARCHAR(50) DEFAULT NULL,
    mother_phone VARCHAR(20) DEFAULT NULL,
    guardian_name VARCHAR(50) DEFAULT NULL,
    guardian_phone VARCHAR(20) DEFAULT NULL,
    emergency_phone VARCHAR(20) DEFAULT NULL,
    relation_of_guardian VARCHAR(30) DEFAULT NULL,
    current_address VARCHAR(50) DEFAULT NULL,
    permanent_address VARCHAR(50) DEFAULT NULL,
    created_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_dt TIMESTAMP DEFAULT NULL
);

CREATE TABLE access_controls(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    path VARCHAR(100) DEFAULT NULL,
    icon VARCHAR(100) DEFAULT NULL,
    parent_path VARCHAR(100) DEFAULT NULL,
    hierarchy_id INTEGER DEFAULT NULL,
    type VARCHAR(50) DEFAULT NULL,
    method VARCHAR(10) DEFAULT NULL,
    UNIQUE(path, method)
);

CREATE TABLE leave_status(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE user_leaves(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id) NOT NULL,
    leave_policy_id INTEGER REFERENCES leave_policies(id) DEFAULT NULL,
    from_dt DATE NOT NULL,
    to_dt DATE NOT NULL,
    note VARCHAR(100),
    submitted_dt TIMESTAMP DEFAULT NULL,
    updated_dt TIMESTAMP DEFAULT NULL,
    approved_dt TIMESTAMP DEFAULT NULL,
    approver_id INTEGER REFERENCES users(id),
    status INTEGER REFERENCES leave_status(id)
);

CREATE TABLE class_teachers(
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES users(id),
    class_name VARCHAR(50) REFERENCES classes(name)
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    section_name VARCHAR(30) REFERENCES sections(name)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

CREATE TABLE notice_status(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    alias VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE notices(
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id),
    title VARCHAR(100) NOT NULL,
    description VARCHAR(400) NOT NULL,
    status INTEGER REFERENCES notice_status(id) DEFAULT NULL,
    created_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_dt TIMESTAMP DEFAULT NULL,
    reviewed_dt TIMESTAMP DEFAULT NULL,
    reviewer_id INTEGER REFERENCES users(id) DEFAULT NULL,
    recipient_type VARCHAR(20) NOT NULL,
    recipient_role_id INTEGER DEFAULT NULL,
    recipient_first_field VARCHAR(20) DEFAULT NULL
);

CREATE TABLE user_refresh_tokens (
  id SERIAL PRIMARY KEY,
  token TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE permissions(
    id SERIAL PRIMARY KEY,
    role_id INTEGER REFERENCES roles(id),
    access_control_id INTEGER REFERENCES access_controls(id),
    type VARCHAR(20) DEFAULT NULL,
    UNIQUE(role_id, access_control_id)
);

CREATE TABLE notice_recipient_types(
    id SERIAL PRIMARY KEY,
    role_id INTEGER REFERENCES roles(id),
    primary_dependent_name VARCHAR(100) DEFAULT NULL,
    primary_dependent_select VARCHAR(100) DEFAULT NULL
);

CREATE TABLE user_leave_policy (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) DEFAULT NULL,
    leave_policy_id INTEGER REFERENCES leave_policies(id) DEFAULT NULL,
    UNIQUE (user_id, leave_policy_id)
);


-- functions
DROP FUNCTION IF EXISTS staff_add_update(JSONB);
CREATE OR REPLACE FUNCTION public.staff_add_update(data jsonb)
RETURNS TABLE("userId" INTEGER, status boolean, message TEXT, description TEXT) 
LANGUAGE 'plpgsql'
AS $BODY$

DECLARE
    _operationType VARCHAR(10);

    _userId INTEGER;
    _name TEXT;
    _role INTEGER;
    _gender TEXT;
    _maritalStatus TEXT;
    _phone TEXT;
    _email TEXT;
    _dob DATE;
    _joinDate DATE;
    _qualification TEXT;
    _experience TEXT;
    _currentAddress TEXT;
    _permanentAddress TEXT;
    _fatherName TEXT;
    _motherName TEXT;
    _emergencyPhone TEXT;
    _systemAccess BOOLEAN;
    _reporterId INTEGER;
BEGIN
    _userId := COALESCE((data ->>'userId')::INTEGER, NULL);
    _name := COALESCE(data->>'name', NULL);
    _role := COALESCE((data->>'role')::INTEGER, NULL);
    _gender := COALESCE(data->>'gender', NULL);
    _maritalStatus := COALESCE(data->>'maritalStatus', NULL);
    _phone := COALESCE(data->>'phone', NULL);
    _email := COALESCE(data->>'email', NULL);
    _dob := COALESCE((data->>'dob')::DATE, NULL);
    _joinDate := COALESCE((data->>'joinDate')::DATE, NULL);
    _qualification := COALESCE(data->>'qualification', NULL);
    _experience := COALESCE(data->>'experience', NULL);
    _currentAddress := COALESCE(data->>'currentAddress', NULL);
    _permanentAddress := COALESCE(data->>'permanentAddress', NULL);
    _fatherName := COALESCE(data->>'fatherName', NULL);
    _motherName := COALESCE(data->>'motherName', NULL);
    _emergencyPhone := COALESCE(data->>'emergencyPhone', NULL);
    _systemAccess := COALESCE((data->>'systemAccess')::BOOLEAN, NULL);
    _reporterId := COALESCE((data->>'reporterId')::INTEGER, NULL);

    IF _userId IS NULL THEN
        _operationType := 'add';
    ELSE
        _operationType := 'update';
    END IF;

    IF _role = 3 THEN
        RETURN QUERY
        SELECT NULL::INTEGER, false, 'Student cannot be staff', NULL::TEXT;
        RETURN;
    END IF;

    IF NOT EXISTS(SELECT 1 FROM users WHERE id = _userId) THEN

        IF EXISTS(SELECT 1 FROM users WHERE email = _email) THEN
        RETURN QUERY
            SELECT NULL::INTEGER, false, 'Email already exists', NULL::TEXT;
        RETURN;
        END IF;

        INSERT INTO users (name,email,role_id,created_dt,reporter_id)
        VALUES (_name,_email,_role,now(),_reporterId) RETURNING id INTO _userId;

        INSERT INTO user_profiles
        (user_id, gender, marital_status, phone,dob,join_dt,qualification,experience,current_address,permanent_address,father_name,mother_name,emergency_phone)
        VALUES
        (_userId,_gender,_maritalStatus,_phone,_dob,_joinDate,_qualification,_experience,_currentAddress,_permanentAddress,_fatherName,_motherName,_emergencyPhone);

        RETURN QUERY
            SELECT _userId, true, 'Staff added successfully', NULL;
        RETURN;
    END IF;


    --update user tables
    UPDATE users
    SET
        name = _name,
        email = _email,
        role_id = _role,
        is_active = _systemAccess,
        reporter_id = _reporterId,
        updated_dt = now()
    WHERE id = _userId;

    UPDATE user_profiles
    SET
        gender = _gender,
        marital_status = _maritalStatus,
        phone = _phone,
        dob = _dob,
        join_dt = _joinDate,
        qualification = _qualification,
        experience = _experience,
        current_address = _currentAddress,
        permanent_address = _permanentAddress, 
        father_name = _fatherName,
        mother_name = _motherName,
        emergency_phone = _emergencyPhone
    WHERE user_id = _userId;

    RETURN QUERY
        SELECT _userId, true, 'Staff updated successfully', NULL;
EXCEPTION
    WHEN OTHERS THEN
        RETURN QUERY
            SELECT _userId::INTEGER, false, 'Unable to ' || _operationType || ' staff', SQLERRM;
END;
$BODY$;


--student add/update
DROP FUNCTION IF EXISTS student_add_update(JSONB);
CREATE OR REPLACE FUNCTION public.student_add_update(data jsonb)
RETURNS TABLE("userId" INTEGER, status boolean, message TEXT, description TEXT) 
LANGUAGE 'plpgsql'
AS $BODY$

DECLARE
    _operationType VARCHAR(10);
    _reporterId INTEGER;

    _userId INTEGER;
    _name TEXT;
    _roleId INTEGER;
    _gender TEXT;
    _phone TEXT;
    _email TEXT;
    _dob DATE;
    _currentAddress TEXT;
    _permanentAddress TEXT;
    _fatherName TEXT;
    _fatherPhone TEXT;
    _motherName TEXT;
    _motherPhone TEXT;
    _guardianName TEXT;
    _guardianPhone TEXT;
    _relationOfGuardian TEXT;
    _systemAccess BOOLEAN;
    _className TEXT;
    _sectionName TEXT;
    _admissionDt DATE;
    _roll INTEGER;
BEGIN
    _roleId = 3;
    _userId := COALESCE((data ->>'userId')::INTEGER, NULL);
    _name := COALESCE(data->>'name', NULL);
    _gender := COALESCE(data->>'gender', NULL);
    _phone := COALESCE(data->>'phone', NULL);
    _email := COALESCE(data->>'email', NULL);
    _dob := COALESCE((data->>'dob')::DATE, NULL);
    _currentAddress := COALESCE(data->>'currentAddress', NULL);
    _permanentAddress := COALESCE(data->>'permanentAddress', NULL);
    _fatherName := COALESCE(data->>'fatherName', NULL);
    _fatherPhone := COALESCE(data->>'fatherPhone', NULL);
    _motherName := COALESCE(data->>'motherName', NULL);
    _motherPhone := COALESCE(data->>'motherPhone', NULL);
    _guardianName := COALESCE(data->>'guardianName', NULL);
    _guardianPhone := COALESCE(data->>'guardianPhone', NULL);
    _relationOfGuardian := COALESCE(data->>'relationOfGuardian', NULL);
    _systemAccess := COALESCE((data->>'systemAccess')::BOOLEAN, NULL);
    _className := COALESCE(data->>'class', NULL);
    _sectionName := COALESCE(data->>'section', NULL);
    _admissionDt := COALESCE((data->>'admissionDate')::DATE, NULL);
    _roll := COALESCE((data->>'roll')::INTEGER, NULL);

    IF _userId IS NULL THEN
        _operationType := 'add';
    ELSE
        _operationType := 'update';
    END IF;

    SELECT teacher_id
    FROM class_teachers
    WHERE class_name = _className AND section_name = _sectionName
    INTO _reporterId;

    IF _reporterId IS NULL THEN
        SELECT id from users WHERE role_id = 1 ORDER BY id ASC LIMIT 1 INTO _reporterId;
    END IF;

    IF NOT EXISTS(SELECT 1 FROM users WHERE id = _userId) THEN

        IF EXISTS(SELECT 1 FROM users WHERE email = _email) THEN
        RETURN QUERY
            SELECT NULL::INTEGER, false, 'Email already exists', NULL::TEXT;
        RETURN;
        END IF;

        INSERT INTO users (name,email,role_id,created_dt,reporter_id)
        VALUES (_name,_email,_roleId,now(),_reporterId) RETURNING id INTO _userId;

        INSERT INTO user_profiles
        (user_id,gender,phone,dob,admission_dt,class_name,section_name,roll,current_address,permanent_address,father_name,father_phone,mother_name,mother_phone,guardian_name,guardian_phone,relation_of_guardian)
        VALUES
        (_userId,_gender,_phone,_dob,_admissionDt,_className,_sectionName,_roll,_currentAddress,_permanentAddress,_fatherName,_fatherPhone,_motherName,_motherPhone,_guardianName,_guardianPhone,_relationOfGuardian);

        RETURN QUERY
            SELECT _userId, true, 'Student added successfully', NULL;
        RETURN;
    END IF;


    --update user tables
    UPDATE users
    SET
        name = _name,
        email = _email,
        role_id = _roleId,
        is_active = _systemAccess,
        updated_dt = now()
    WHERE id = _userId;

    UPDATE user_profiles
    SET
        gender = _gender,
        phone = _phone,
        dob = _dob,
        admission_dt = _admissionDt,
        class_name = _className,
        section_name  =_sectionName,
        roll = _roll,
        current_address = _currentAddress,
        permanent_address = _permanentAddress, 
        father_name = _fatherName,
        father_phone = _fatherPhone,
        mother_name = _motherName,
        mother_phone = _motherPhone,
        guardian_name = _guardianName,
        guardian_phone = _guardianPhone,
        relation_of_guardian = _relationOfGuardian
    WHERE user_id = _userId;

    RETURN QUERY
        SELECT _userId, true , 'Student updated successfully', NULL;
EXCEPTION
    WHEN OTHERS THEN
        RETURN QUERY
            SELECT _userId::INTEGER, false, 'Unable to ' || _operationType || ' student', SQLERRM;
END;
$BODY$;


DROP FUNCTION IF EXISTS public.get_dashboard_data(INTEGER);
CREATE OR REPLACE FUNCTION get_dashboard_data(_user_id INTEGER)
RETURNS JSONB
LANGUAGE plpgsql
AS $BODY$

DECLARE
    _user_role_id INTEGER;

    _student_count_current_year INTEGER;
    _student_count_previous_year INTEGER;
    _student_value_comparison INTEGER;
    _student_perc_comparison FLOAT;

    _teacher_count_current_year INTEGER;
    _teacher_count_previous_year INTEGER;
    _teacher_value_comparison INTEGER;
    _teacher_perc_comparison FLOAT;

    _parent_count_current_year INTEGER;
    _parent_count_previous_year INTEGER;
    _parent_value_comparison INTEGER;
    _parent_perc_comparison FLOAT;

    _notices_data JSONB;
    _leave_policies_data JSONB;
    _leave_histories_data JSONB;
    _celebrations_data JSONB;
    _one_month_leave_data JSONB;
BEGIN
    -- user check
    IF NOT EXISTS(SELECT 1 FROM users u WHERE u.id = _user_id) THEN
        RAISE EXCEPTION 'User does not exist';
    END IF;

    SELECT role_id FROM users u WHERE u.id = _user_id into _user_role_id;
    IF _user_role_id IS NULL THEN
        RAISE EXCEPTION 'Role does not exist';
    END IF;

    --student
    IF _user_role_id = 1 THEN
        SELECT COUNT(*) INTO _student_count_current_year
        FROM users t1
        JOIN user_profiles t2 ON t1.id = t2.user_id
        WHERE t1.role_id = 3
        AND EXTRACT(YEAR FROM t2.admission_dt) = EXTRACT(YEAR FROM CURRENT_DATE);

        SELECT COUNT(*) INTO _student_count_previous_year
        FROM users t1
        JOIN user_profiles t2 ON t1.id = t2.user_id
        WHERE t1.role_id = 3
        AND EXTRACT(YEAR FROM t2.admission_dt) = EXTRACT(YEAR FROM CURRENT_DATE) - 1;

        _student_value_comparison := _student_count_current_year - _student_count_previous_year;
        IF _student_count_previous_year = 0 THEN
            _student_perc_comparison := 0;
        ELSE
            _student_perc_comparison := (_student_value_comparison::FLOAT / _student_count_previous_year) * 100;
        END IF;

        --teacher
        SELECT COUNT(*) INTO _teacher_count_current_year
        FROM users t1
        JOIN user_profiles t2 ON t1.id = t2.user_id
        WHERE t1.role_id = 2
        AND EXTRACT(YEAR FROM t2.join_dt) = EXTRACT(YEAR FROM CURRENT_DATE);

        SELECT COUNT(*) INTO _teacher_count_previous_year
        FROM users t1
        JOIN user_profiles t2 ON t1.id = t2.user_id
        WHERE t1.role_id = 2
        AND EXTRACT(YEAR FROM t2.join_dt) = EXTRACT(YEAR FROM CURRENT_DATE) - 1;

        _teacher_value_comparison := _teacher_count_current_year - _teacher_count_previous_year;
        IF _teacher_count_previous_year = 0 THEN
            _teacher_perc_comparison := 0;
        ELSE
            _teacher_perc_comparison := (_teacher_value_comparison::FLOAT / _teacher_count_previous_year) * 100;
        END IF;

        --parents
        SELECT COUNT(*) INTO _parent_count_current_year
        FROM users t1
        JOIN user_profiles t2 ON t1.id = t2.user_id
        WHERE t1.role_id = 4
        AND EXTRACT(YEAR FROM t2.join_dt) = EXTRACT(YEAR FROM CURRENT_DATE);

        SELECT COUNT(*) INTO _parent_count_previous_year
        FROM users t1
        JOIN user_profiles t2 ON t1.id = t2.user_id
        WHERE t1.role_id = 4
        AND EXTRACT(YEAR FROM t2.join_dt) = EXTRACT(YEAR FROM CURRENT_DATE) - 1;

        _parent_value_comparison := _parent_count_current_year - _parent_count_previous_year;
        IF _parent_count_previous_year = 0 THEN
            _parent_perc_comparison := 0;
        ELSE
            _parent_perc_comparison := (_parent_value_comparison::FLOAT / _parent_count_previous_year) * 100;
        END IF;
    ELSE
        _student_count_current_year := 0::INTEGER;
        _student_perc_comparison := 0::FLOAT;
        _student_value_comparison := 0::INTEGER;

        _teacher_count_current_year := 0::INTEGER;
        _teacher_perc_comparison := 0::FLOAT;
        _teacher_value_comparison := 0::INTEGER;

        _parent_count_current_year := 0::INTEGER;
        _parent_perc_comparison := 0::FLOAT;
        _parent_value_comparison := 0::INTEGER;
    END IF;

    -- get notices
    SELECT
        COALESCE(JSON_AGG(row_to_json(t)), '[]'::json)
    INTO _notices_data
    FROM (
        SELECT *
        FROM get_notices(_user_id) AS t
        LIMIT 5
    ) AS t;


    --leave polices
    WITH _leave_policies_query AS (
        SELECT
            t2.id,
            t2.name,
            COALESCE(SUM(
                CASE WHEN t3.status = 2 THEN
                    EXTRACT(DAY FROM age(t3.to_dt + INTERVAL '1 day', t3.from_dt))
                ELSE 0
                END
            ), 0) AS "totalDaysUsed"
        FROM user_leave_policy t1
        JOIN leave_policies t2 ON t1.leave_policy_id = t2.id
        LEFT JOIN user_leaves t3 ON t1.leave_policy_id = t3.leave_policy_id
        WHERE t1.user_id = _user_id
        GROUP BY t2.id, t2.name
    )
    SELECT
        COALESCE(JSON_AGG(row_to_json(t)), '[]'::json)
    INTO _leave_policies_data
    FROM _leave_policies_query AS t;


    --leave history
    WITH _leave_history_query AS (
        SELECT
            t1.id,
            t2.name AS policy,
            t1.leave_policy_id AS "policyId",
            t1.from_dt AS "from",
            t1.to_dt AS "to",
            t1.note,
            t3.name AS status,
            t1.submitted_dt AS "submitted",
            t1.updated_dt AS "updated",
            t1.approved_dt AS "approved",
            t4.name AS approver,
            t5.name AS user,
            EXTRACT(DAY FROM age(t1.to_dt + INTERVAL '1 day', t1.from_dt)) AS days
        FROM user_leaves t1
        JOIN leave_policies t2 ON t1.leave_policy_id = t2.id
        JOIN leave_status t3 ON t1.status = t3.id
        LEFT JOIN users t4 ON t1.approver_id = t4.id
        JOIN users t5 ON t1.user_id = t5.id
        WHERE (
            _user_role_id = 1
            And 1=1
        ) OR (
            _user_role_id != 1
            AND t1.user_id = _user_id
        )
        ORDER BY submitted_dt DESC
        LIMIT 5
    )
    SELECT
        COALESCE(JSON_AGG(row_to_json(t)), '[]'::json)
    INTO _leave_histories_data
    FROM _leave_history_query AS t;


    --celebrations
    WITH _celebrations AS (
        SELECT 
            t1.id AS "userId", 
            t1.name AS user, 
            'Happy Birthday!' AS event, 
            t2.dob AS "eventDate"
        FROM users t1
        JOIN user_profiles t2 ON t1.id = t2.user_id
        WHERE t2.dob IS NOT NULL
        AND (
            t2.dob + (EXTRACT(YEAR FROM age(now(), t2.dob)) + 1) * INTERVAL '1 year'
            BETWEEN now() AND now() + INTERVAL '90 days'
        )

        UNION ALL

        SELECT 
            t1.id AS "userId", 
            t1.name AS user, 
            'Happy ' ||
                CASE
                    WHEN t1.role_id = 3 THEN
                        EXTRACT(YEAR FROM age(now(), t2.admission_dt))
                    ELSE
                        EXTRACT(YEAR FROM age(now(), t2.join_dt))
                END || ' Anniversary!' AS event, 
            CASE
                WHEN t1.role_id = 3 THEN
                    t2.admission_dt
                ELSE
                    t2.join_dt
            END AS "eventDate"
        FROM users t1
        JOIN user_profiles t2 ON t1.id = t2.user_id
        WHERE 
        (
            t1.role_id = 3 
            AND t2.admission_dt IS NOT NULL 
            AND age(now(), t2.admission_dt) >= INTERVAL '1 year'
            AND (
                (t2.admission_dt +
                (EXTRACT(YEAR FROM age(now(), t2.admission_dt)) + 1 ) * INTERVAL '1 year')
                BETWEEN now() AND now() + '90 days'
            )
        )
        OR 
        (
            t1.role_id != 3 
            AND t2.join_dt IS NOT NULL 
            AND age(now(), t2.join_dt) >= INTERVAL '1 year'
            AND (
                (t2.join_dt +
                (EXTRACT(YEAR FROM age(now(), t2.join_dt)) + 1 ) * INTERVAL '1 year')
                BETWEEN now() AND now() + '90 days'
            )
        )
    )
    SELECT
        COALESCE(JSON_AGG(row_to_json(t) ORDER BY TO_CHAR(t."eventDate", 'MM-DD') ), '[]'::json)
    INTO _celebrations_data
    FROM _celebrations AS t;


    --who is out this week
    WITH _month_dates AS (
        SELECT 
            DATE_TRUNC('day', now()) AS day_start, 
            DATE_TRUNC('day', now()) + INTERVAL '30 days' AS day_end
    )
    SELECT
        COALESCE(JSON_AGG(row_to_json(t)), '[]'::json)
    INTO _one_month_leave_data
    FROM (
        SELECT
            t1.id AS "userId",
            t1.name AS user,
            t2.from_dt AS "fromDate",
            t2.to_dt AS "toDate",
            t3.name AS "leaveType"
        FROM users t1
        JOIN user_leaves t2 ON t1.id = t2.user_id
        JOIN leave_policies t3 ON t2.leave_policy_id = t3.id
        JOIN _month_dates t4
        ON
            t2.from_dt <= t4.day_end
            AND t2.to_dt >= t4.day_start
        WHERE t2.status = 2
    )t;

    -- Build and return the final JSON object
    RETURN JSON_BUILD_OBJECT(
        'students', JSON_BUILD_OBJECT(
            'totalNumberCurrentYear', _student_count_current_year,
            'totalNumberPercInComparisonFromPrevYear', _student_perc_comparison,
            'totalNumberValueInComparisonFromPrevYear', _student_value_comparison
        ),
        'teachers', JSON_BUILD_OBJECT(
            'totalNumberCurrentYear', _teacher_count_current_year,
            'totalNumberPercInComparisonFromPrevYear', _teacher_perc_comparison,
            'totalNumberValueInComparisonFromPrevYear', _teacher_value_comparison
        ),
        'parents', JSON_BUILD_OBJECT(
            'totalNumberCurrentYear', _parent_count_current_year,
            'totalNumberPercInComparisonFromPrevYear', _parent_perc_comparison,
            'totalNumberValueInComparisonFromPrevYear', _parent_value_comparison
        ),
        'notices', _notices_data,
        'leavePolicies', _leave_policies_data,
        'leaveHistory', _leave_histories_data,
        'celebrations', _celebrations_data,
        'oneMonthLeave', _one_month_leave_data
    );
END;
$BODY$;


DROP FUNCTION IF EXISTS public.get_notices(INTEGER);
CREATE OR REPLACE FUNCTION get_notices(_user_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    title VARCHAR(100),
    description VARCHAR(400),
    "authorId" INTEGER,
    "createdDate" TIMESTAMP,
    "updatedDate" TIMESTAMP,
    author VARCHAR(100),
    "reviewerName" VARCHAR(100),
    "reviewedDate" TIMESTAMP,
    status VARCHAR(100),
    "statusId" INTEGER,
    "whoHasAccess" TEXT
)
LANGUAGE plpgsql
AS $BODY$
DECLARE
    _user_role_id INTEGER;
BEGIN    
    IF NOT EXISTS (SELECT 1 FROM users u WHERE u.id = _user_id) THEN
        RAISE EXCEPTION 'User does not exist';
    END IF;

    SELECT role_id FROM users u WHERE u.id = _user_id INTO _user_role_id;
    IF _user_role_id IS NULL THEN
        RAISE EXCEPTION 'Role does not exist';
    END IF;

    RETURN QUERY
    SELECT
        t1.id,
        t1.title,
        t1.description,
        t1.author_id AS "authorId",
        t1.created_dt AS "createdDate",
        t1.updated_dt AS "updatedDate",
        t2.name AS author,
        t4.name AS "reviewerName",
        t1.reviewed_dt AS "reviewedDate",
        t3.alias AS "status",
        t1.status AS "statusId",
        NULL AS "whoHasAccess"
    FROM notices t1
    LEFT JOIN users t2 ON t1.author_id = t2.id
    LEFT JOIN notice_status t3 ON t1.status = t3.id
    LEFT JOIN users t4 ON t1.reviewer_id = t4.id
    WHERE (
        _user_role_id = 1
        AND (
            t1.author_id = _user_id
            OR (
                t1.status != 1
                AND t1.author_id != _user_id
            )
        )
    )
    OR (
        _user_role_id != 1
        AND (
            t1.status != 6
            AND (
                t1.author_id = _user_id
                OR (
                    t1.status = 5
                    AND (
                        t1.recipient_type = 'EV'
                        OR (
                            t1.recipient_type = 'SP'
                            AND (
                                (
                                    t1.recipient_role_id = 2
                                    AND _user_role_id = 2
                                    AND (
                                        t1.recipient_first_field IS NULL
                                        OR t1.recipient_first_field = ''
                                        OR EXISTS (
                                            SELECT 1
                                            FROM user_profiles u
                                            JOIN users t5 ON u.user_id = t5.id
                                            WHERE u.department_id = (t1.recipient_first_field)::INTEGER
                                            AND t5.id = _user_id AND t5.role_id = _user_role_id
                                        )
                                    )
                                )
                                OR (
                                    t1.recipient_role_id = 3
                                    AND _user_role_id = 3
                                    AND (
                                        t1.recipient_first_field IS NULL
                                        OR t1.recipient_first_field = ''
                                        OR EXISTS (
                                            SELECT 1
                                            FROM user_profiles u
                                            JOIN users t5 ON u.user_id = t5.id
                                            WHERE u.class_name = t1.recipient_first_field
                                            AND t5.id = _user_id AND t5.role_id = _user_role_id
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    )
    ORDER BY t1.created_dt DESC;
END;
$BODY$;