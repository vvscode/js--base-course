export default function CoordsFetcher(eventBus, method = 'fetch') {
  this.bus = eventBus;
  this.method = method;
}
