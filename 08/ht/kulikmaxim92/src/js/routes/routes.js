import EventBus from '../utils/eventBus';
import StateManager from '../components/stateManager';
import TextView from '../components/textView';
import CanvasView from '../components/canvasView';
import SvgView from '../components/svgView';
 
const SQUARE_SIZE = 30;
 
let eventBus, stateManager;
let content = '<div id="view" class="view"></div><hr><div id="stateManager" class="stateManager"></div>';
let container = document.getElementById('content');

let routes = [
    {
        name: 'textView',
        match: /(^$|#text)/,
        onEnter: () => {
            initComponents();
 
            let textView = new TextView({
                container: "view"
            }, stateManager.currentState, eventBus);
        },
        onLeave: () => document.getElementById('view').innerHTML = '',
    },
    {
        name: 'canvasView',
        match: '#canvas',
        onEnter: () => {
            initComponents();
 
            let canvasView = new CanvasView({
                container: "view",
                squareSize: SQUARE_SIZE,
            }, stateManager.currentState, eventBus);
        },
        onLeave: () => document.getElementById('view').innerHTML = '',
    },
    {
        name: 'svgView',
        match: '#svg',
        onEnter: () => {
            initComponents();
 
            let svgView = new SvgView({
                container: "view",
                squareSize: SQUARE_SIZE,
            }, stateManager.currentState, eventBus);
        },
        onLeave: () => document.getElementById('view').innerHTML = '',
    },
    {
        name: 'about',
        match: '#about',
        onBeforeEnter: () => stateManager.stop(),
        onEnter: () => container.innerHTML = '<div>О сайте</div>',
        onLeave: () => {
            container.innerHTML = content;
            stateManager && stateManager.init();
        },
    },
]
 
function initComponents() {
    if (!eventBus  && !stateManager) {
        container.innerHTML = content;
 
        eventBus = new EventBus();
        stateManager = new StateManager({
            container: 'stateManager',
            width: 20,
            height: 10,
            speed: {
                min: 1000,
                max: 5000,
                current: 2000,
                step: 1000
            },
        }, eventBus);
    }
}
 
export default routes;