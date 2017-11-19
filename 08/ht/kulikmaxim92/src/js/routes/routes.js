import EventBus from '../utils/eventBus';
import GameLife from '../utils/gameLife';
import StateManager from '../components/stateManager';
import TextView from '../components/textView';

let eventBus, gameLife, stateManager, textView;

var content = document.getElementById('content');

var routes = [
    {
        name: 'index',
        match: '',
        onEnter: () => window.location.hash = 'textView',
    },
    {
        name: 'textView',
        match: '#textView',
        onEnter: () => {
            if (!eventBus && !gameLife && !stateManager) {
                content.innerHTML = '<div id="view" class="view"></div><div id="stateManager" class="stateManager"></div>';

                eventBus = new EventBus();
                gameLife = new GameLife({}, eventBus);
                textView = new TextView({
                    container: "view"
                }, eventBus);
                stateManager = new StateManager({
                    container: 'stateManager'
                }, gameLife, eventBus);
            }
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
    content.innerHTML = '<div id="view" class="view"></div><div id="stateManager" class="stateManager"></div>';

    eventBus = new EventBus();

}

function clearResources() {
    eventBus = null;

}

export default routes;