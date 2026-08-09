
// Hàm tự gen Id Test case theo format vd: TC_<tên module>_001
export const generateTestCaseID = (module: string, index: number) => {
    return `TC_${module.toUpperCase()}_${index.toString().padStart(3, '0')}`
}
