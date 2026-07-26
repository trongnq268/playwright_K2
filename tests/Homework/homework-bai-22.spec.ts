import { test, expect } from '@playwright/test';



const wait = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds); 
  });
};

interface Course{
    id: string;
    name: string;
    students: number;
    price: number;
    active: boolean;
};

test('Bai 2', async () => {
//Tạo 7 khóa học
const courseInfo: Course[] = [
    {id: "001", name: "Toan", students: 10, price: 3500000, active: true},
    {id: "002", name: "Ly", students: 15, price: 3000000, active: true},
    {id: "003", name: "Hoa", students: 20, price: 3000000, active: false},
    {id: "004", name: "Anh", students: 10, price: 3500000, active: true},
    {id: "005", name: "Van", students: 15, price: 3000000, active: true},
    {id: "006", name: "Su", students: 25, price: 1500000, active: false},
    {id: "007", name: "Dia", students: 20, price: 1500000, active: false},
];
const main = async () =>{
//Viết function totalStudents()
const totalStudents = (courseInfo : Course[]): number =>{
    let totalStudent = 0;
    for( let studentscount of courseInfo){
        totalStudent = totalStudent + studentscount.students;
    };
    return totalStudent; 
};
let sumStudents = totalStudents(courseInfo);
console.log(`Tong so hoc vien = ${sumStudents}`);

// Viết function totalStudents()
const totalRevenue = (courseInfo: Course[]): number =>{
    let doanhThu =0;
    for( let revenue of courseInfo){
         doanhThu = doanhThu + (revenue.price * revenue.students);
        };
    return doanhThu;
    };
   let tongDoanhThu = totalRevenue(courseInfo);
   await wait(2000);
   console.log(`Tong doanh thu = ${tongDoanhThu}`);
    
// Viết function findMostPopular()
const findMostPopular = (courseInfo:Course[]): Course => {
    let maxPopular = courseInfo[0];
    for (let popular of courseInfo){
        if( maxPopular.students < popular.students){
            maxPopular = popular;
        } else{
            maxPopular = maxPopular;
        };
    };
    return maxPopular;
};
let mostCoursePopular = findMostPopular(courseInfo)
await wait(2000);
console.log(`Khoa hoc co nhieu hoc vien nhat la ${mostCoursePopular.name}: ${mostCoursePopular.students}`);

// Viết function listActiveCourses()
const listActiveCourses = (courseInfo: Course[]): string[] =>{
    let activeCourses: string[] = [];
    for ( let activeCourse of courseInfo){
        if(activeCourse.active === true){
            activeCourses.push(activeCourse.name)
        };
    };
    return activeCourses;
};
let active = listActiveCourses(courseInfo);
await wait(2000);
console.log(`Danh sach khoa hoc dang mo la: ${active}`);
console.log(`==================`);




//loadCourses()
const loadCourses = async () => {
  console.log('"Dang tai khoa hoc"');
  await wait(2000); 
  console.log('Hoan thanh');
};
await loadCourses();
console.log('================');

//main()
// const main = async () =>{
//     await wait(2000);
//     console.log(`Tinh doanh thu: Doanh thu = ${tongDoanhThu}`);
//     await wait(2000);
//     console.log(`Tim khoa hoc nhieu hoc vien nhat = ${mostCoursePopular.name}`);
//     await wait(2000);
//     console.log(`Danh sach khoa hoc dang mo = ${active}`);



//Verify
expect(tongDoanhThu === 287500000).toBe(true);
expect(mostCoursePopular.name).toBe("Su");
expect(active).toEqual(["Toan", "Ly", "Anh", "Van"]);
};
await main();

    
});