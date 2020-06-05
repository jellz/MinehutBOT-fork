import { Listener } from 'discord-akairo';
import { guildConfigs } from '../guild/guildConfigs';

export default class ReadyListener extends Listener {
	constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready',
		});
	}

	async exec() {
		console.log(`Logged in as ${this.client.user?.tag}`);

		this.client.guilds.cache.forEach(g => {
			if (!guildConfigs.has(g.id!))
				throw `Missing guild configuration for ${g.name} (${g.id})`;
		});

		await this.client.banScheduler.refresh();
	}
}
