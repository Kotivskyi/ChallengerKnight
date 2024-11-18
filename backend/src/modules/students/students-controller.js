const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    //write your code
    const {name, className, section, roll} = req.params;
    const payload = {name, className, section, roll};
    const students = await getAllStudents(payload);
    res.json({ students });
});

const getPayloadStudent = (body)=>{
    const { name,
        gender,
        dob,
        phone,
        email,
        class: studentClass,
        section,
        roll,
        admissionDate,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        guardianName,
        guardianPhone,
        relationOfGuardian,
        currentAddress,
        permanentAddress,
        systemAccess } = body;
    const payload = {
        name, gender, dob, phone, email, class: studentClass, section, roll, admissionDate,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        guardianName,
        guardianPhone,
        relationOfGuardian,
        currentAddress,
        permanentAddress,
        systemAccess
    };
    return payload;
}

const handleAddStudent = asyncHandler(async (req, res) => {
    //write your code
    const payload = getPayloadStudent(req.body);
    const message = await addNewStudent(payload);
    res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    //write your code
    const { id } = req.params;
    const payload = getPayloadStudent(req.body);
    const message = await updateStudent({id, ...payload});
    res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    //write your code
    const { id } = req.params;
    const classDetail = await getStudentDetail(id);
    res.json(classDetail);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    //write your code
    const { id, status } = req.body;
    const {reviewerId } = req.user.id;
    const payload = {userId: id, reviewerId, status};
    const message = await setStudentStatus(payload);
    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
