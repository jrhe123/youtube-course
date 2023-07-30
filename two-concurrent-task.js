function timeout(time) {
	return new Promise((resolve) => {
  	setTimeout(() => {
    	resolve()
    }, time)
  })
}

// at most, 2 tasks execute at concurrent
class SuperTask {
	constructor(parallelCount = 2){
  	this.parallelCount = parallelCount
    this.tasks = []
    this.runningCount = 0
  }
  
  add(task) {
  	return new Promise((resolve, reject) => {
    	this.tasks.push({
      	task,
        resolve,
        reject,
      })
      this._run()
    })
  }
  
  _run(){
  	while(this.runningCount < this.parallelCount && this.tasks.length > 0) {
    	const {
      	task,
        resolve,
        reject,
      } = this.tasks.shift()
      this.runningCount++
      
      task().then(resolve, reject).finally(() => {
      	this.runningCount--
        this._run()
      })
    }
  }
  
  
}

const superTask = new SuperTask();

function addTask(time, name) {
	superTask
  	.add(() => timeout(time))
    .then(() => {
    	console.log(`task ${name} done`)
    })
}

addTask(10000, 1) // 10sec
addTask(5000, 2) // 5sec
addTask(3000, 3) // 8sec
addTask(4000, 4) // 12sec
addTask(5000, 5) // 15sec
