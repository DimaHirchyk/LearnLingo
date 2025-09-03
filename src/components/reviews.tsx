import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TeacherReview } from "@/redux/teacher/slice";
import { Star } from "lucide-react";

type ReviewsProps = {
  teacher: TeacherReview[];
  experience: string;
};

export function Reviews({ teacher, experience }: ReviewsProps) {
  return (
    <div className="">
      <div className="flex items-center gap-3 mb-8">
        <p className="font-normal">{experience}</p>
      </div>

      <div className="space-y-8">
        {teacher.map(({ comment, reviewer_name, reviewer_rating }) => (
          <div key={comment}>
            <div className="flex gap-4 items-center  mb-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" alt={reviewer_name} />
                <AvatarFallback>{reviewer_name[0]}</AvatarFallback>
              </Avatar>{" "}
              <div className="flex flex-col items-start gap-1">
                {" "}
                <span className="font-medium text-card-foreground">
                  {reviewer_name}
                </span>{" "}
                <div className="flex gap-2 items-center">
                  {" "}
                  <Star className="fill-yellow-400 h-5 w-5 stroke-none" />
                  <span className="text-sm">{reviewer_rating}</span>
                </div>
              </div>
            </div>
            <p className="text-sm mt-4">{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
