import { useState } from "react";
import { TeachersFilters } from "../teachers-filters";
import { BookingModal } from "../booking-modal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import {
  selectAllFilteredTeachers,
  selectDispleyLimit,
  selectVisibleTeachers,
} from "@/redux/teacher/selector";
import { TeacherList } from "../teacherList";
import { ButtonLoadMore } from "../ui/buttonLoadMore";
import { loadMore, type Teachers } from "@/redux/teacher/slice";

export default function TeacherCard() {
  const dispatch = useDispatch<AppDispatch>();
  const teachers = useSelector(selectVisibleTeachers);
  const allFilteredTeachers = useSelector(selectAllFilteredTeachers);
  const displayLimit = useSelector(selectDispleyLimit);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectTeacher, setSelectTeacher] = useState<Teachers | null>(null);

  const loadMode = () => {
    dispatch(loadMore());
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <TeachersFilters />

      {allFilteredTeachers.length === 0 && (
        <p>З такими фільтрами вчителів не знайденно</p>
      )}
      <TeacherList
        teachers={teachers}
        onClick={(teacher) => {
          setIsBookingModalOpen(true);
          setSelectTeacher(teacher);
        }}
      />
      {selectTeacher && (
        <BookingModal
          teacher={selectTeacher}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}

      {allFilteredTeachers.length > displayLimit && (
        <ButtonLoadMore className="mt-16 h-14" onClick={loadMode}>
          Load more
        </ButtonLoadMore>
      )}
    </div>
  );
}
