import type { Teachers } from "@/redux/teacher/slice";
import { TeacherCardItem } from "./teacherCardItem";

export interface TeacherListProps {
  teachers: Teachers[];
  onClick: (teacher: Teachers) => void;
}

export function TeacherList({ teachers, onClick }: TeacherListProps) {
  return (
    <ul className="flex flex-col gap-8">
      {teachers.map((teacher) => (
        <TeacherCardItem key={teacher.id} teacher={teacher} onClick={onClick} />
      ))}
    </ul>
  );
}
