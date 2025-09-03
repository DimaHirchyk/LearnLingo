import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { ButtonHeard } from "./ui/buttonHeard";
import { ButtonOpenModal } from "./ui/buttonOpenModal";
import { ButtonReadMore } from "./ui/buttonReadMore";
import { Reviews } from "./reviews";
import { useState } from "react";
import type { Teachers } from "@/redux/teacher/slice";

interface TeacherListProps {
  teachers: Teachers[];
  onClick: (value: boolean) => void;
}

export function TeacherList({ teachers, onClick }: TeacherListProps) {
  const [showReviews, setShowReviews] = useState<string | null>(null);
  // const [openTeacherId, setOpenTeacherId] = useState<string | null>(null);

  //   const initials =
  return (
    <ul className="flex flex-col gap-8">
      {teachers.map((teacher) => (
        <Card className="p-6 bg-white max-w-[1200px]" key={teacher.avatar_url}>
          {" "}
          {/* Avatar and basic info */}
          <div className="relative w-[120px] mr-12">
            <Avatar className="h-24 w-24">
              <AvatarImage src={teacher.avatar_url} alt={teacher.name} />
              <AvatarFallback>
                {teacher.name[0]}
                {teacher.surname[0]}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white bg-green-500" />
          </div>
          <CardContent className="p-0 flex flex-col gap-12 w-full">
            {" "}
            <div className=" ">
              <div className="flex items-start justify-between ">
                {" "}
                <div className="flex flex-col gap-2">
                  <p className=" font-medium text-card-foreground ">
                    Languages
                  </p>
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
                    <ButtonHeard variant="ghost">
                      <Heart className="h-6 w-6" />
                    </ButtonHeard>
                  </div>
                </div>
              </div>
            </div>
            {/* Lesson info and conditions */}
            <div className="mt-4 space-y-3 font-medium">
              <div className="mb-3">
                <span className=" text-card-foreground ">Speaks: </span>
                <span className="underline">
                  {teacher.languages.join(", ")}
                </span>
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
                      showReviews === teacher.avatar_url
                        ? null
                        : teacher.avatar_url
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
                  onClick={() => onClick(true)}>
                  Book trial lesson
                </ButtonOpenModal>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </ul>
  );
}
