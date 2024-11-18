const { processDBRequest } = require("../../utils");

const getClassTeachers = async () => {
    const query = `
        SELECT
            t1.id,
            t1.class_name AS class,
            t1.section_name AS section,
            t2.name as "teacher"
        FROM class_teachers t1
        LEFT JOIN users t2 ON t1.teacher_id =  t2.id
        ORDER BY t1.class_name
    `;
    const { rows } = await processDBRequest({ query });
    return rows;
}

const addClassTeacher = async (payload) => {
    const { className, section, teacher } = payload;
    const query = `
    INSERT INTO class_teachers (class_name, section_name, teacher_id)
    VALUES($1, $2, $3)
    `;
    const queryParams = [className, section, teacher];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const getClassTeacherById = async (id) => {
    const query = `
        SELECT
            id,
            class_name AS class,
            section_name AS section,
            teacher_id AS teacher
        FROM class_teachers WHERE id = $1`;
    const { rows } = await processDBRequest({ query, queryParams: [id] });
    return rows[0];
}

const updateClassTeacherById = async (payload) => {
    const { id, className, section, teacher } = payload;
    const query = `
        UPDATE class_teachers
        SET class_name = $1, section_name = $2, teacher_id = $3
        WHERE id = $4
    `;
    const queryParams = [className, section, teacher, id];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const findAllTeachers = async () => {
    const teacherRole = 2;
    const query = `
        SELECT id, name
        FROM users
        WHERE role_id = $1
    `;
    const queryParams = [teacherRole];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows;
};

module.exports = {
    getClassTeachers,
    addClassTeacher,
    getClassTeacherById,
    updateClassTeacherById,
    findAllTeachers,
};