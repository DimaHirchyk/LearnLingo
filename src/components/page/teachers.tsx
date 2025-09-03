import { useEffect, useState } from "react";
import { TeachersFilters } from "../teachers-filters";

import { BookingModal } from "../booking-modal";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "@/redux/teacher/operation";
import type { AppDispatch } from "@/redux/store";
import { iteamsSelector, nextPageSelector } from "@/redux/teacher/selector";
import { TeacherList } from "../teacherList";
import { ButtonLoadMore } from "../ui/buttonLoadMore";

export default function TeacherCard() {
  const dispatch = useDispatch<AppDispatch>();
  const teachers = useSelector(iteamsSelector);
  const page = useSelector(nextPageSelector);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getTeachers(page)); // Pass the initial page number
  }, [dispatch, page]);

  const loadMode = () => {
    dispatch(getTeachers(page + 1));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <TeachersFilters />
      <TeacherList teachers={teachers} onClick={setIsBookingModalOpen} />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
      <ButtonLoadMore className="mt-16 h-14" onClick={loadMode}>
        Load more
      </ButtonLoadMore>
    </div>
  );
}
