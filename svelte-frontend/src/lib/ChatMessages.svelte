<script lang="ts">
import { beforeUpdate, afterUpdate } from 'svelte';

import {messages} from '$lib/chat-store';

let container: HTMLElement;
let scroll = false;

beforeUpdate(() => {
    if (container) {
        scroll = container.offsetHeight + container.scrollTop > container.scrollHeight - 20;
    }
});

afterUpdate(() => {
    if (scroll) {
        container.scrollTo(0, container.scrollHeight);
    }
});
</script>

<div bind:this={container}>
    {#each $messages as {timestamp, body}}
        <p>{timestamp}: {body}</p>
    {/each}
</div>

<style>
div {
    height: 100px;
    overflow: auto;
}

p {
    margin: 0;
}

p + p {
    margin-top: 8px;
}
</style>
