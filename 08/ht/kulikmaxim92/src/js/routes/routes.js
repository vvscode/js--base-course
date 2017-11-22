import EventBus from '../utils/eventBus';
import StateManager from '../components/stateManager';
import TextView from '../components/textView';
import CanvasView from '../components/canvasView';
import SvgView from '../components/svgView';
 
const SQUARE_SIZE = 30;
 
let eventBus, stateManager;
 
let content = document.getElementById('content');
let routes = [
    {
        name: 'index',
        match: '',
        onEnter: () => window.location.hash = 'text',
    },
    {
        name: 'textView',
        match: '#text',
        onLeave: () => {
            document.getElementById('view').innerHTML = '';
        },
        onEnter: () => {
            initComponents();
 
            let textView = new TextView({
                container: "view"
            }, eventBus);
 
            textView.render(stateManager.currentState);
        },
    },
    {
        name: 'canvasView',
        match: '#canvas',
        onLeave: () => {
            document.getElementById('view').innerHTML = '';
        },
        onEnter: () => {
            initComponents();
 
            let canvasView = new CanvasView({
                container: "view",
                squareSize: SQUARE_SIZE,
            }, eventBus);
 
            canvasView.render(stateManager.currentState);
        },
    },
    {
        name: 'svgView',
        match: '#svg',
        onLeave: () => {
            document.getElementById('view').innerHTML = '';
        },
        onEnter: () => {
            initComponents();
 
            let svgView = new SvgView({
                container: "view",
                squareSize: SQUARE_SIZE,
            }, eventBus);
 
            svgView.render(stateManager.currentState);
        },
    },
    {
        name: 'about',
        match: '#about',
        //onBeforeEnter: () => clearResources(),
        onEnter: () => content.innerHTML = '<div>О сайте</div>',
    },
]
 
function initComponents() {
    if (!eventBus  && !stateManager) {
        content.innerHTML = '<div id="view" class="view"></div><hr><div id="stateManager" class="stateManager"></div>';
 
        eventBus = new EventBus();
        stateManager = new StateManager({
            container: 'stateManager',
            speed: 2000,
            width: 20,
            height: 10
        }, eventBus);
    }
}
 
export default routes;