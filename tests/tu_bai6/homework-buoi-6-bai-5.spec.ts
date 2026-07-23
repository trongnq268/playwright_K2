import { test, expect } from "@playwright/test";
import {
  Course,
  findMostPopular,
  listActiveCourse,
  loadCourses,
  totalRevenue,
} from "../../helpers/courseHelper";

test("Course Management", async () => {
  const courses: Course[] = [
    {
      id: "MAT256",
      name: "Math",
      students: 20,
      price: 2500000,
      active: true,
    },
    {
      id: "LIT500",
      name: "Literature",
      students: 22,
      price: 2500000,
      active: true,
    },
    {
      id: "ENG303",
      name: "English",
      students: 25,
      price: 3000000,
      active: true,
    },
    {
      id: "BIO222",
      name: "Biology",
      students: 41,
      price: 1500000,
      active: true,
    },
    {
      id: "MUS256",
      name: "Music",
      students: 11,
      price: 2100000,
      active: false,
    },
    {
      id: "HIS256",
      name: "History",
      students: 5,
      price: 2000000,
      active: false,
    },
    {
      id: "GEO256",
      name: "Geography",
      students: 3,
      price: 1800000,
      active: false,
    },
  ];

  const main = async(): Promise<[number, string, number]> => {
    await loadCourses();
    const allCourseRevenue = totalRevenue(courses);
    const popularCourse = findMostPopular(courses);
    const openCourse = listActiveCourse(courses);
    const countActiveCourse = openCourse.length;
    console.log(
      `Total courses revenue: ${allCourseRevenue.toLocaleString("en-US")}`,
    );
    console.log(`Top course: ${popularCourse}`);
    console.log(`Number of open course: ${countActiveCourse}`);
    return [allCourseRevenue, popularCourse, countActiveCourse];
  };
  const actualResult = await main();
  expect(actualResult).toEqual([280000000, "Biology", 4]);
});
