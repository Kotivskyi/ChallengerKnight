import { useParams } from 'react-router-dom';
import { StaffAccountEdit } from '../components/views';

export const EditStaff = () => {
  const { id } = useParams();
  return (
    <StaffAccountEdit heading='Edit Staff Account' id={id} redirectPath={`/app/staffs/${id}`} />
  );
};
