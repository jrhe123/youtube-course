const str = "100000000000"

// \B: not at the beginning
// (?=): 检测占位符,非内容本身

const r = str.replace(/(?=\B(\d{3})+$)/g, ",")

console.log(r)
// 100,000,000,000
