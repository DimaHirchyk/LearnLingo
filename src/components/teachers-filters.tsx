import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TeachersFilters() {
  return (
    <div className="mb-8 p-6  rounded-lg">
      <div className="flex gap-5">
        <div className="space-y-2">
          <label className=" text-sm font-medium text-card-foreground">
            Languages
          </label>
          <Select defaultValue="french">
            <SelectTrigger>
              <SelectValue placeholder="Оберіть мову" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="french">Французька</SelectItem>
              <SelectItem value="english">Англійська</SelectItem>
              <SelectItem value="spanish">Іспанська</SelectItem>
              <SelectItem value="german">Німецька</SelectItem>
              <SelectItem value="italian">Італійська</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className=" text-sm font-medium text-card-foreground">
            Level of knowledge
          </label>
          <Select defaultValue="a1-beginner">
            <SelectTrigger>
              <SelectValue placeholder="Оберіть рівень" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a1-beginner">A1 Початковий</SelectItem>
              <SelectItem value="a2-elementary">A2 Елементарний</SelectItem>
              <SelectItem value="b1-intermediate">B1 Середній</SelectItem>
              <SelectItem value="b2-upper-intermediate">
                B2 Вище середнього
              </SelectItem>
              <SelectItem value="c1-advanced">C1 Просунутий</SelectItem>
              <SelectItem value="c2-proficiency">C2 Досконалий</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className=" text-sm font-medium text-card-foreground">
            Price
          </label>
          <Select defaultValue="30">
            <SelectTrigger>
              <SelectValue placeholder="Оберіть ціну" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">До $10</SelectItem>
              <SelectItem value="20">До $20</SelectItem>
              <SelectItem value="30">До $30</SelectItem>
              <SelectItem value="50">До $50</SelectItem>
              <SelectItem value="100">$50+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
