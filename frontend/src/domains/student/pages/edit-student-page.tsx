import { useParams } from 'react-router-dom';
import { StudentAccountEdit } from '../components/views';

export const EditStudent = () => {
  const { id } = useParams();
  return (
    <StudentAccountEdit
      heading='Edit Student Account'
      id={id}
      redirectPath={`/app/students/${id}`}
    />
  );
};
