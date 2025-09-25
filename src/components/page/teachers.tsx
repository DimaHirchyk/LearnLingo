import { useEffect, useState } from "react";
import { TeachersFilters } from "../teachers-filters";
import { BookingModal } from "../booking-modal";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "@/redux/teacher/operation";
import type { AppDispatch } from "@/redux/store";
import { nextPageSelector, selectFilters } from "@/redux/teacher/selector";
import { TeacherList } from "../teacherList";
import { ButtonLoadMore } from "../ui/buttonLoadMore";
import type { Teachers } from "@/redux/teacher/slice";

export default function TeacherCard() {
  const dispatch = useDispatch<AppDispatch>();
  const teachers = useSelector(selectFilters);
  const page = useSelector(nextPageSelector);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectTeacher, setSelectTeacher] = useState<Teachers | null>(null);

  useEffect(() => {
    dispatch(getTeachers(1));
  }, [dispatch]);

  const loadMode = () => {
    dispatch(getTeachers(page + 1));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <TeachersFilters />
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
      <ButtonLoadMore className="mt-16 h-14" onClick={loadMode}>
        Load more
      </ButtonLoadMore>
    </div>
  );
}
