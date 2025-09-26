import { selectFavoritets } from "@/redux/favorites/selector";
import type { AppDispatch } from "@/redux/store";
import { loadMore, type Teachers } from "@/redux/teacher/slice";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookingModal } from "../booking-modal";
import {
  selectAllFilteredTeachers,
  selectDispleyLimit,
} from "@/redux/teacher/selector";
import { ButtonLoadMore } from "../ui/buttonLoadMore";
import { TeacherCardItem } from "../teacherCardItem";

export default function Favorites() {
  const [selectTeacher, setSelectedTeacher] = useState<Teachers | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const favoritesId = useSelector(selectFavoritets);
  const allTeachers = useSelector(selectAllFilteredTeachers);
  const displayLimit = useSelector(selectDispleyLimit);

  const favoriteTeachers = useMemo(() => {
    return allTeachers.filter((teacher) => favoritesId.includes(teacher.id));
  }, [allTeachers, favoritesId]);

  if (favoriteTeachers.length === 0) {
    return <p>You have no favorite teachers</p>;
  }

  const displayedTeachers = favoriteTeachers.slice(0, displayLimit);

  const handleBookLesson = (teacher: Teachers) => {
    setSelectedTeacher(teacher);
    setIsBookingModalOpen(true);
  };

  const loadMode = () => {
    dispatch(loadMore());
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <ul className="flex items-center mt-10 flex-col gap-8">
        {displayedTeachers.map((teacher) => (
          <TeacherCardItem
            key={teacher.id}
            teacher={teacher}
            onClick={handleBookLesson}
          />
        ))}
      </ul>
      {selectTeacher && (
        <BookingModal
          teacher={selectTeacher}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}

      {favoriteTeachers.length > displayLimit && (
        <ButtonLoadMore className="mt-16 h-14" onClick={loadMode}>
          Load more
        </ButtonLoadMore>
      )}
    </div>
  );
}
