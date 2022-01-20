<script lang="ts">
import { messages } from '$lib/chat-store';
import ChatMessages from '$lib/ChatMessages.svelte';

const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        const target = (event.target as HTMLInputElement);
        messages.send(target.value);
        target.value = '';
    }
};
</script>

<main>
    <ChatMessages />
    <input on:keypress={handleKeyPress} />
</main>

<style>
main {
    display: flex;
    flex-direction: column;
}

input {
    margin-top: 8px;
}
</style>
