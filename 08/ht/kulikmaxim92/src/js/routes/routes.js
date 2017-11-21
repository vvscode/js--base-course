import EventBus from '../utils/eventBus';
import GameLife from '../utils/gameLife';
import StateManager from '../components/stateManager';
import TextView from '../components/textView';
import CanvasView from '../components/canvasView';

let eventBus, gameLife, stateManager, textView, canvasView;

eventBus = new EventBus();
gameLife = new GameLife({});

var content = document.getElementById('content');

var routes = [
    {
        name: 'index',
        match: '',
        onEnter: () => window.location.hash = 'text',
    },
    {
        name: 'textView',
        match: '#text',
        onLeave: () => {
            textView = null;
            document.getElementById('view').innerHTML = '';
        },
        onEnter: () => {
            if (!stateManager) {
                content.innerHTML = '<div id="view" class="view"></div><div id="stateManager" class="stateManager"></div>';

                stateManager = new StateManager({
                    container: 'stateManager',
                    speed: 2000, 
                    width: 20,
                    heigth: 10
                }, gameLife, eventBus);
            }

            textView = new TextView({
                container: "view"
            }, eventBus);

            textView.render(stateManager.currentState);
        },
    },
    {
        name: 'canvasView',
        match: '#canvas',
        onLeave: () => {
            canvasView = null
            document.getElementById('view').innerHTML = '';
        },
        onEnter: () => {
            if (!stateManager) {
                content.innerHTML = '<div id="view" class="view"></div><div id="stateManager" class="stateManager"></div>';

                stateManager = new StateManager({
                    container: 'stateManager',
                    speed: 2000, 
                    width: 20,
                    heigth: 10
                }, gameLife, eventBus);
            }

            canvasView = new CanvasView({
                container: "view",
                width: 600,
                height: 400
            }, eventBus);

            canvasView.render(stateManager.currentState);
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
    if (!eventBus && !gameLife && !stateManager) {
        content.innerHTML = '<div id="view" class="view"></div><div id="stateManager" class="stateManager"></div>';

        gameLife = new GameLife({});
        stateManager = new StateManager({
            container: 'stateManager',
            speed: 2000, 
            width: 20,
            heigth: 10
        }, gameLife, eventBus);
    }
}

function clearResources() {
    eventBus = null;

}

export default routes;