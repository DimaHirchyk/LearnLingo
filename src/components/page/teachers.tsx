"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { useState } from "react";
import { Reviews } from "../reviews";
import { TeachersFilters } from "../teachers-filters";
import { ButtonHeard } from "../ui/buttonHeard";
import { ButtonReadMore } from "../ui/buttonReadMore";
import { BookingModal } from "../booking-modal";
import { ButtonOpenModal } from "../ui/buttonOpenModal";

export default function TeacherCard() {
  const [showReviews, setShowReviews] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      <TeachersFilters />
      <Card className="p-6 bg-white max-w-[1200px]">
        {" "}
        {/* Avatar and basic info */}
        <div className="relative w-[120px] mr-12">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="/professional-teacher-woman.png"
              alt="Jane Smith"
            />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white bg-green-500" />
        </div>
        <CardContent className="p-0 flex flex-col gap-12 w-full">
          {" "}
          <div className=" ">
            <div className="flex items-start justify-between ">
              {" "}
              <div className="flex flex-col gap-2">
                <p className=" font-medium text-card-foreground ">Languages</p>
                <h3 className="text-2xl font-semibold">Jane Smith</h3>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-4 font-medium justify-around mb-3">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Lessons online</span>
                  </div>
                  <span>Lessons done: 1098</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>Rating: 4.8</span>
                  </div>
                  <span>
                    Price / 1 hour: <span className="text-green-400">30$</span>
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
              <span className="underline">German, French</span>
            </div>
            <div>
              <span className=" text-card-foreground ">Lesson Info: </span>
              <span className="">
                Lessons are structured to cover grammar, vocabulary, and
                practical usage of the language.
              </span>
            </div>
            <div>
              <span className=" text-card-foreground ">Conditions: </span>
              <span className="">
                Welcomes both adult learners and teenagers (14 years and above).
                Provides personalized study plans.
              </span>
            </div>
            <div className="flex justify-between items-center mt-4 mb-8">
              <ButtonReadMore
                onClick={() => setShowReviews(!showReviews)}
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
            {showReviews && <Reviews />}
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary" className="border-none bg-chart-4 ">
                #A1 Beginner
              </Badge>
              <Badge variant="secondary">#A2 Elementary</Badge>
              <Badge variant="secondary">#B1 Intermediate</Badge>
              <Badge variant="secondary">#B2 Upper Intermediate</Badge>
            </div>
            {showReviews && (
              <ButtonOpenModal
                className="bg-chart-4 font-bold text-lg py-4 px-12 mt-12 h-16"
                onClick={() => setIsBookingModalOpen(true)}>
                Book trial lesson
              </ButtonOpenModal>
            )}
          </div>
        </CardContent>
      </Card>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
