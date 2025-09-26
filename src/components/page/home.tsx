import { useNavigate } from "react-router-dom";
import { ButtonHero } from "../ui/buttonHero";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col  py-[98px] px-16 bg-ring rounded-4xl">
          <h1 className="font-medium text-5xl mb-8">
            Unlock your potential with the best{" "}
            <span className="italic font-normal bg-yellow-300">language</span>{" "}
            tutors
          </h1>
          <p className="mb-16">
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <ButtonHero
            onClick={() => {
              navigate("/teachers");
            }}
            className="h-16 ">
            Get started
          </ButtonHero>
        </div>
        <div>
          <picture>
            <source srcSet="/hero/hero_x1.webp x1, /hero/hero_x2.webp x2" />
            <img src="/hero/hero_x1.webp" alt="hero" />
          </picture>
        </div>{" "}
      </div>
      <div className="border-dashed py-10 border-3  rounded-4xl border-chart-4">
        <ul className="flex items-center justify-around">
          <li className="flex gap-4 items-center">
            <span className="font-medium text-3xl">32,000 +</span>
            <p className="w-9 font-normal text-card-foreground text-sm">
              Experienced tutors
            </p>
          </li>
          <li className="flex gap-4 items-center">
            <span className="font-medium text-3xl">300,000 +</span>
            <p className="w-9 font-normal text-card-foreground text-sm">
              5-star tutor reviews
            </p>
          </li>
          <li className="flex gap-4 items-center">
            <span className="font-medium text-3xl">120 +</span>
            <p className="w-9 font-normal text-card-foreground text-sm">
              Subjects taught
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}
