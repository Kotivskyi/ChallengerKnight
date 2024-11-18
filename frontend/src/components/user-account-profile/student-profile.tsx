import * as React from 'react';
import { Grid2 } from '@mui/material';
import { useGetStudentDetail } from '@/domains/student/hooks/use-get-student-detail';
import {
  MiniAvatar,
  Others,
  ParentsAndGuardianInformation,
  PersonalDetail
} from '@/domains/student/components/views';

type StudentProfileProps = {
  id?: string;
};

export const StudentProfile: React.FC<StudentProfileProps> = ({ id }) => {
  const student = useGetStudentDetail(id);
  const {
    name,
    email,
    class: className,
    section,
    phone,
    dob,
    gender,
    roll,
    admissionDate,
    currentAddress,
    permanentAddress,
    fatherName,
    fatherPhone,
    motherName,
    motherPhone,
    guardianName,
    guardianPhone,
    relationOfGuardian,
    systemAccess,
    reporterName
  } = student;

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 5 }}>
        <MiniAvatar
          name={name}
          phone={phone}
          email={email}
          selectedClass={className}
          section={section}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 7 }}>
        <PersonalDetail
          dob={dob}
          gender={gender}
          roll={roll}
          admissionDate={admissionDate}
          currentAddress={currentAddress}
          permanentAddress={permanentAddress}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 5 }}></Grid2>
      <Grid2 size={{ xs: 12, md: 7 }}>
        <ParentsAndGuardianInformation
          fatherName={fatherName}
          fatherPhone={fatherPhone}
          motherName={motherName}
          motherPhone={motherPhone}
          guardianName={guardianName}
          guardianPhone={guardianPhone}
          relationOfGuardian={relationOfGuardian}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 5 }}></Grid2>
      <Grid2 size={{ xs: 12, md: 7 }}>
        <Others systemAccess={systemAccess} reporterName={reporterName} />
      </Grid2>
    </Grid2>
  );
};
