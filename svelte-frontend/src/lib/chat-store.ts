import { writable } from 'svelte/store';
import { Socket } from 'phoenix';
import { browser } from '$app/env';

interface Message {
	body: string;
	timestamp: string;
}

const createMessages = () => {
	const { subscribe, update } = writable<Message[]>([]);

	// Can't create socket in SSR env
	if (!browser) {
		return { subscribe };
	}

	const socket = new Socket('ws://localhost:4000/socket');
	socket.connect();
	const channel = socket.channel('room:lobby');

	channel
		.join()
		.receive('ok', (resp) => {
			console.log('Joined successfully', resp);
		})
		.receive('error', (resp) => {
			console.log('Unable to join', resp);
		});

	channel.on('new_msg', (payload: { body: string }) => {
		update((messages) => [
			...messages,
			{ body: payload.body, timestamp: new Date().toLocaleTimeString() }
		]);
	});

	return {
		subscribe,
		send: (message: string) => {
			channel.push('new_msg', { body: message });
		}
	};
};

export const messages = createMessages();
