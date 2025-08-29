import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonSubmit } from "./ui/buttonSubmit";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [selectedReason, setSelectedReason] = useState("career");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Booking submitted:", {
      reason: selectedReason,
      fullName,
      email,
      phoneNumber,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" p-16">
        <DialogHeader className="relative">
          <DialogTitle className="text-4xl font-semibold text-left">
            Book trial lesson
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-10">
          <p className="text-base">
            Our experienced tutor will assess your current language level,
            discuss your learning goals, and tailor the lesson to your specific
            needs.
          </p>

          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/professional-teacher-woman.png"
                alt="Jane Smith"
              />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Your teacher</p>
              <p className="font-medium">Jane Smith</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-2xl font-medium mb-4 block">
                What is your main reason for learning English?
              </Label>
              <RadioGroup
                value={selectedReason}
                onValueChange={setSelectedReason}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="career" id="career" />
                  <Label htmlFor="career" className="font-normal">
                    Career and business
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kids" id="kids" />
                  <Label htmlFor="kids" className="font-normal">
                    Lesson for kids
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="abroad" id="abroad" />
                  <Label htmlFor="abroad" className="font-normal">
                    Living abroad
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exams" id="exams" />
                  <Label htmlFor="exams" className="font-normal">
                    Exams and coursework
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="culture" id="culture" />
                  <Label htmlFor="culture" className="font-normal">
                    Culture, travel or hobby
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <ButtonSubmit
              type="submit"
              className="w-full bg-chart-4 hover:bg-chart-5 text-black font-bold text-lg py-4 h-15
              ">
              Book
            </ButtonSubmit>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
