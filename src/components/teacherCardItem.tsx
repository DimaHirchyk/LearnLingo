import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { ButtonHeard } from "./ui/buttonHeard";
import { ButtonOpenModal } from "./ui/buttonOpenModal";
import { ButtonReadMore } from "./ui/buttonReadMore";
import { Reviews } from "./reviews";
import { useState } from "react";
import type { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import type { Teachers } from "@/redux/teacher/slice";
import { selectIsLoggedIn, selectUserId } from "@/redux/auth/selector";
import { AuthModal } from "./auth-modal";
import { toggleFavoriteDB } from "@/redux/favorites/operation";

interface TeacherCardItemProps {
  teacher: Teachers;
  onClick: (teacher: Teachers) => void;
}

export function TeacherCardItem({ teacher, onClick }: TeacherCardItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);

  const [showReviews, setShowReviews] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favorites.includes(teacher.id)
  );

  const handleToggleFavorite = () => {
    if (!isLoggedIn || !userId) {
      setIsAuthModalOpen(true);
      return;
    }
    dispatch(
      toggleFavoriteDB({
        teacherId: teacher.id,
        userId: userId,
        isCurrentlyFavorite: isFavorite,
      })
    );
  };
  return (
    <Card className="p-6 bg-white w-[1080px] " key={teacher.id}>
      {" "}
      {/* Avatar and basic info */}
      <div className="relative p-1.5 w-[120px] h-full mr-12 rounded-full border-yellow-200 border-3">
        <Avatar className="w-full h-[90px]">
          <AvatarImage
            src={teacher.avatar_url}
            alt={teacher.name}
            className="object-fill"
          />
          <AvatarFallback>
            {teacher.name[0]}
            {teacher.surname[0]}
          </AvatarFallback>
        </Avatar>
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full border-2 border-white bg-green-500" />
      </div>
      <CardContent className="p-0 flex flex-col gap-12 w-full">
        {" "}
        <div className=" ">
          <div className="flex items-start justify-between ">
            {" "}
            <div className="flex flex-col gap-2">
              <p className=" font-medium text-card-foreground ">Languages</p>
              <h3 className="text-2xl font-semibold">
                {teacher.name} {teacher.surname}
              </h3>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 font-medium justify-around mb-3">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>Lessons online</span>
                </div>
                <span>Lessons done: {teacher.lessons_done}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>Rating: {teacher.rating}</span>
                </div>
                <span>
                  Price / 1 hour:{" "}
                  <span className="text-green-400">
                    {teacher.price_per_hour}$
                  </span>
                </span>{" "}
                <ButtonHeard variant="ghost" onClick={handleToggleFavorite}>
                  <Heart
                    className={`h-6 w-6  ${
                      isFavorite && isLoggedIn
                        ? "fill-amber-400 stroke-amber-400"
                        : "text-current"
                    }`}
                  />
                </ButtonHeard>
              </div>
            </div>
          </div>
        </div>
        {/* Lesson info and conditions */}
        <div className="mt-4 space-y-3 font-medium">
          <div className="mb-3">
            <span className=" text-card-foreground ">Speaks: </span>
            <span className="underline">{teacher.languages.join(", ")}</span>
          </div>
          <div>
            <span className=" text-card-foreground ">Lesson Info: </span>
            <span className="">{teacher.lesson_info}</span>
          </div>
          <div>
            <span className=" text-card-foreground ">Conditions: </span>
            <span className="">{teacher.conditions}</span>
          </div>
          <div className="flex justify-between items-center mt-4 mb-8">
            <ButtonReadMore
              onClick={() =>
                setShowReviews(
                  showReviews === teacher.avatar_url ? null : teacher.avatar_url
                )
              }
              size="sm"
              className="flex items-center gap-2">
              Read more
              {showReviews ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </ButtonReadMore>
          </div>

          <AuthModal isOpen={isAuthModalOpen} onOpen={setIsAuthModalOpen} />

          {showReviews === teacher.avatar_url && (
            <Reviews
              teacher={teacher.reviews}
              experience={teacher.experience}
            />
          )}
          <div className="flex flex-wrap gap-2 mt-4">
            {teacher.levels.map((level, ind) => (
              <Badge
                variant="secondary"
                className="border-none bg-chart-4 "
                key={ind}>
                #{level}
              </Badge>
            ))}
          </div>
          {showReviews && (
            <ButtonOpenModal
              className="bg-chart-4 font-bold text-lg py-4 px-12 mt-12 h-16"
              onClick={() => onClick(teacher)}>
              Book trial lesson
            </ButtonOpenModal>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
