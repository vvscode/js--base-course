export default class EventBus
{
	constructor()
	{
		this.listeners = {};
	}

	on(name, handler)
	{
		this.listeners[name] = this.listeners[name] || [];
		this.listeners[name].push(handler);
	}

	off(name, handler)
	{
		this.listeners[name] = this.listeners[name] || [];
		this.listeners[name] = this.listeners[name].filter((item) => item !== handler);
	}

	once(name, handler)
	{
		let self = this;
		this.on(name, function getter(data)
		{
			handler(data);
			self.off(name, getter);
		});
	}

	trigger(name, data)
	{
		(this.listeners[name] || []).forEach((handler) => handler(data));
	}
}