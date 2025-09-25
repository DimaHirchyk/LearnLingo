import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFilters } from "@/redux/filtration/operation";
import { selectFilterTeachers } from "@/redux/filtration/selector";

import type { AppDispatch } from "@/redux/store";
import { filterTeachers } from "@/redux/teacher/slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function TeachersFilters() {
  const dispatch = useDispatch<AppDispatch>();
  const option = useSelector(selectFilterTeachers);

  const [filters, setFilters] = useState({
    languages: "",
    levels: "",
    price_per_hour: null as number | null,
  });

  useEffect(() => {
    dispatch(getFilters());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterTeachers(filters));
  }, [filters, dispatch]);

  return (
    <div className="mb-8 p-6  rounded-lg">
      <div className="flex gap-5">
        <div className="space-y-2">
          <label className=" text-sm font-medium text-card-foreground">
            Languages
          </label>
          <Select
            value={filters.languages}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, languages: value }))
            }>
            <SelectTrigger>
              <SelectValue placeholder="Оберіть мову" />
            </SelectTrigger>
            <SelectContent>
              {option.languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className=" text-sm font-medium text-card-foreground">
            Level of knowledge
          </label>
          <Select
            value={filters.levels}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, levels: value }))
            }>
            <SelectTrigger>
              <SelectValue placeholder="Оберіть рівень" />
            </SelectTrigger>
            <SelectContent>
              {option.levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className=" text-sm font-medium text-card-foreground">
            Price
          </label>
          <Select
            value={
              filters.price_per_hour !== null
                ? String(filters.price_per_hour)
                : ""
            }
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                price_per_hour: value ? Number(value) : null,
              }))
            }>
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
