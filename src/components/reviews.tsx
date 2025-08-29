import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export function Reviews() {
  const reviews = [
    {
      id: 1,
      student: "Олександр К.",
      rating: 5,
      comment: "Чудовий викладач! Дуже терпляча та професійна.",
    },
    {
      id: 2,
      student: "Марія П.",
      rating: 5,
      comment: "Уроки проходять цікаво, багато практики.",
    },
    {
      id: 3,
      student: "Іван С.",
      rating: 4,
      comment: "Добре пояснює граматику, рекомендую.",
    },
  ];

  return (
    <div className="">
      <div className="flex items-center gap-3 mb-8">
        <p className="font-normal">
          Jane is an experienced and dedicated language teacher specializing in
          German and French. She holds a Bachelor's degree in German Studies and
          a Master's degree in French Literature. Her passion for languages and
          teaching has driven her to become a highly proficient and
          knowledgeable instructor. With over 10 years of teaching experience,
          Jane has helped numerous students of various backgrounds and
          proficiency levels achieve their language learning goals. She is
          skilled at adapting her teaching methods to suit the needs and
          learning styles of her students, ensuring that they feel supported and
          motivated throughout their language journey.
        </p>
      </div>

      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id}>
            <div className="flex gap-4 items-center  mb-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" alt={review.student} />
                <AvatarFallback>{review.student[0]}</AvatarFallback>
              </Avatar>{" "}
              <div className="flex flex-col items-start gap-1">
                {" "}
                <span className="font-medium text-card-foreground">
                  {review.student}
                </span>{" "}
                <div className="flex gap-2 items-center">
                  {" "}
                  <Star className="fill-yellow-400 h-5 w-5 stroke-none" />
                  <span className="text-sm">{review.rating}</span>
                </div>
              </div>
            </div>
            <p className="text-sm mt-4">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
