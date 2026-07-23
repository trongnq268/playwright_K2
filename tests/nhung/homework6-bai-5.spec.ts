import {test, expect} from '@playwright/test';

interface Course {
    id: string;
    name: string;
    students: number;
    price: number;
    active: boolean;
}

test('Bài 5 - Mini Project - Quản lý khóa học (Tổng hợp)', async() =>{
    // Tạo 7 khoá học
    const courseList: Course[] = [
        {   id: 'C01', name: 'ISTQB Foundation Level', students: 15, price: 2500, active: true  },
        {   id: 'C02', name: 'ISTQB Foundation Level', students: 10, price: 1500, active: false  },
        {   id: 'C03', name: 'ISTQB Foundation Level', students: 20, price: 3000, active: true  },
        {   id: 'C04', name: 'ISTQB Foundation Level', students: 5, price: 900, active: false  },
        {   id: 'C05', name: 'ISTQB Foundation Level', students: 15, price: 1600, active: true  },
        {   id: 'C06', name: 'ISTQB Foundation Level', students: 18, price: 3800, active: false  },
        {   id: 'C07', name: 'ISTQB Foundation Level', students: 14, price: 2700, active: true  }
    ]
    // Hàm await
    const wait = (ms: number): Promise<void> =>{
        return new Promise((resolve)=>{
            setTimeout(resolve, ms);
        });
    }
    // Hàm tính tổng học viên
    const totalSutdents = (list: Course[]): number =>{
        let totalStu = 0;
        for(const item of list) totalStu += item.students;
        return totalStu;
    }
    // Hàm tính doanh thu
    const totalRevenue = (list: Course[]): number =>{
        let totalRev = 0;
        for(const item of list) totalRev += item.students * item.price;
        return totalRev;
    }
    // Hàm tìm khoá học nhiều học viên nhất
    const findMostPopular = (list: Course[]): string =>{
        let max = list[0].students;
        for(const item of list){
            if( max < item.students ) max = item.students;
        };
        let maxId: string = '';
        for(const item of list){
            if( max === item.students) maxId = item.id;
        };
        return maxId;
    };
    // Hàm lấy danh sách khoá học đang mở
    let countCourseActive = 0;
    const listActiveCourses = (list: Course[]): Course[] => {
        let courseActive: Course[] = [];
        for(const item of list){
            if(item.active === true) {
                courseActive.push(item);
                countCourseActive += 1;
            }
        }
        return courseActive;
    }
    // Hàm loadCourse - giả lập đang tải dữ liệu
    const loadCourses = async(): Promise<Course[]> =>{
        console.log(`Đang tải khoá học...`);
        await wait(2000);
        console.log('Hoàn thành');
        return courseList;
    }
    const main = async(): Promise<number> =>{
        const load = await loadCourses();
        console.log(load);
        console.log(`-------------------`);
        console.log(`Tổng doanh thu là: ${totalRevenue(courseList)}`);
        console.log(`-------------------`);
        console.log(`Khoá học có nhiều học viên nhất là: ${findMostPopular(courseList)}`);
        console.log(`-------------------`);
        console.log(`Danh sách khoá học đang mở:`);
        console.log(listActiveCourses(courseList));
        console.log(`-------------------`);
        return totalRevenue(courseList);
    }
    const result = await main();
    console.log(result);

    // Verify
    expect(totalRevenue(courseList)).toBe(247200);
    expect(findMostPopular(courseList)).toBe('C03');
    expect(countCourseActive).toBe(4);

});