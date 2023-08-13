/**
 * 1. keyof Obj => get all the keys of object
 * 2. string & keyof T => exclude symbol, get string key only
 * 3. declare func
 */

type Watcher<T> = {
    on<K extends string & keyof T>(
        eventName: `${K}Changed`,
        callback: (oldValue: T[K], newValue: T[K]) => void
    ): void;
}

declare function watch<T>(obj: T): Watcher<T>

const personWatcher = watch({
    firstName: "jiarong",
    lastName: "he",
    age: 18
})

personWatcher.on<"age">(
    "ageChanged",
    (oldValue, newValue) => {}
)