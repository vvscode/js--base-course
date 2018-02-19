
const Router = Backbone.Router.extend({

  routes: {
    '': 'text',
    text: 'text',
    canvas: 'canvas',
    svg: 'svg',
    about: 'about',
  },

  initialize: function () {
    Backbone.history.start();
  },
  text: function () {
    $('.block').hide();
    $('#tableDiv').show();
  },
  canvas: function () {
    $('.block').hide();
    $('#tableDiv').show();
  },
  svg: function () {
    $('.block').hide();
    $('#tableDiv').show();
  },
  about: function () {
    $('.block').hide();
    $('#aboutBlock').show();
  },
});

var app = app || {};

(function () {
  app.router = new Router();
})();
