export interface Course {
  id: string;
  name: string;
  students: number;
  price: number;
  active: boolean;
}

export const totalStudents = (courses: Course[]): number => {
  let totalStudents: number = 0;
  for (const course of courses) {
    totalStudents += course.students;
  }
  return totalStudents;
};

export const totalRevenue = (courses: Course[]): number => {
  let revenueBySubject: number = 0;
  let totalRevenue: number = 0;
  for (const course of courses) {
    revenueBySubject = course.price * course.students;
    totalRevenue += revenueBySubject;
  }
  return totalRevenue;
};

export const findMostPopular = (courses: Course[]): string => {
  let topCourse = {
    name: courses[0].name,
    students: courses[0].students,
  };
  for (const course of courses) {
    if (course.students > topCourse.students) {
      topCourse = {
        name: course.name,
        students: course.students,
      };
    }
  }
  return topCourse.name;
};

export const listActiveCourse = (courses: Course[]): string[] => {
  let activeCourses: string[] = [];
  for (const course of courses) {
    if (course.active === true) {
      activeCourses.push(course.name);
    }
  }
  return activeCourses;
};

export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const loadCourses = async (): Promise<void> => {
  console.log("Loading courses.....");
  await wait(2000);
  console.log('Completed');
};
