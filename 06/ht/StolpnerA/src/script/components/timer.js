/**
 * Created by andre on 29-Jun-17.
 */

function Timer(element) {
    this.element = element;

    this.time = 0;
    this.startTimer();
}

Timer.prototype = {
    startTimer(){
        this.element.innerHTML = '';

        this.timer = setInterval(() => {
            this.time++;
            this.element.innerHTML = this.time;
        }, 1000);
    }
};

export default Timer;