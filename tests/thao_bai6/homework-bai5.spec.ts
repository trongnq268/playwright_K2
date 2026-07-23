import { test, expect } from "@playwright/test";

interface Course {
  id: string;
  name: string;
  students: number;
  price: number;
  active: boolean;
}

test("Bài 5", async () => {
  const courses: Course[] = [
    { id: "C01", name: "Playwright Basic", students: 50, price: 100, active: true,},
    { id: "C02", name: "TypeScript", students: 40, price: 120, active: true },
    { id: "C03", name: "JavaScript", students: 65, price: 90, active: false },
    { id: "C04", name: "API Testing", students: 35, price: 150, active: true },
    { id: "C05", name: "SQL", students: 55, price: 80, active: false },
    { id: "C06", name: "Git", students: 30, price: 70, active: true },
    { id: "C07", name: "Docker", students: 45, price: 110, active: true },
  ];

  const wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const totalStudents = (): number => {
    let total = 0;

    for (const course of courses) {
      total += course.students;
    }

    return total;
  };

  const totalRevenue = (): number => {
    let revenue = 0;

    for (const course of courses) {
      revenue += course.students * course.price;
    }

    return revenue;
  };

  const findMostPopular = (): Course => {
    let popular = courses[0];

    for (const course of courses) {
      if (course.students > popular.students) {
        popular = course;
      }
    }

    return popular;
  };

  const listActiveCourses = (): Course[] => {
    let activeCourses: Course[] = [];

    for (const course of courses) {
      if (course.active) {
        activeCourses.push(course);
      }
    }

    return activeCourses;
  };

  const loadCourses = async (): Promise<Course[]> => {
    console.log("Đang tải khóa học...");
    await wait(2000);
    console.log("Hoàn thành.");
    return courses;
  };

  const main = async (): Promise<number> => {
    await loadCourses();

    const revenue = totalRevenue();
    const total = totalStudents();
    const popular = findMostPopular();
    const activeCourses = listActiveCourses();

    console.log("\n========== COURSE REPORT ==========");
    console.log(`Total Students: ${total}`);
    console.log(`Total Revenue: ${revenue}`);
    console.log(`Most Popular Course: ${popular.name}`);
    console.log(`Active Courses: ${activeCourses.length}`);

    return revenue;
  };

  const revenue = await main();

  expect(revenue).toBe(32350);
  expect(findMostPopular().name).toBe("JavaScript");
  expect(listActiveCourses().length).toBe(5);
});
