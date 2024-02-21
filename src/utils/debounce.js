window.superTimerDebounceFun = {}
const timerDebounce = (name, fn) => {
    if (window.superTimerDebounceFun[name]) {
        clearTimeout(window.superTimerDebounceFun[name])
        delete window.superTimerDebounceFun[name]
    }

    window.superTimerDebounceFun[name] = setTimeout(() => {
        fn()
    }, 100)
}

export default timerDebounce