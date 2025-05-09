<template>
    <div class="flex bg-zinc-900 h-full">
        <div class=" bg-black w-[308px] p-8 flex flex-col">
            <Logo />
            <div>
                <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Today</p>
                <div class="ml-2 space-y-2">
                    <div v-for="note in todaysNotes" class="p-2 rounded-lg cursor-pointer" :class="{
                        'bg-[#A1842C]': note.id === selectedNote.id,
                        'hover:bg-[#A1842C]/50': note.id !== selectedNote.id
                    }" @click="selectedNote = note">
                        <h3 class="text-sm font-bold text-[#F4F4F5] truncate">{{ note.text.substring(0, 50) }}</h3>
                        <div class="leading-none truncate text-[#D6D6D6]">
                            <span class="text-xs text-[#F4F4F5] mr-4">{{
                                new Date(note.updatedAt).toDateString()
                                    ? 'Today'
                                    : new Date(note.updatedAt).toLocaleDateString()
                            }}</span>
                            <span class="text-xs text-[#D6D6D6]">...{{ note.text.substring(50, 70) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Yesterday</p>
                <div class="ml-2 space-y-2">
                    <div v-for="note in yesterdaysNotes" class="p-2 rounded-lg cursor-pointer" :class="{
                        'bg-[#A1842C]': note.id === selectedNote.id,
                        'hover:bg-[#A1842C]/50': note.id !== selectedNote.id
                    }" @click="selectedNote = note">
                        <h3 class="text-sm font-bold text-[#F4F4F5] truncate">{{ note.text.substring(0, 50) }}</h3>
                        <div class="leading-none truncate text-[#D6D6D6]">
                            <span class="text-xs text-[#F4F4F5] mr-4">{{
                                new Date(note.updatedAt).toDateString()
                                    ? 'Today'
                                    : new Date(note.updatedAt).toLocaleDateString()
                            }}</span>
                            <span class="text-xs text-[#D6D6D6]">...{{ note.text.substring(50, 70) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Earlier</p>
                <div class="ml-2 space-y-2">
                    <div v-for="note in earlierNotes" class="p-2 rounded-lg cursor-pointer" :class="{
                        'bg-[#A1842C]': note.id === selectedNote.id,
                        'hover:bg-[#A1842C]/50': note.id !== selectedNote.id
                    }" @click="selectedNote = note">
                        <h3 class="text-sm font-bold text-[#F4F4F5] truncate">{{ note.text.substring(0, 50) }}</h3>
                        <div class="leading-none truncate text-[#D6D6D6]">
                            <span class="text-xs text-[#F4F4F5] mr-4">{{
                                new Date(note.updatedAt).toDateString()
                                    ? 'Today'
                                    : new Date(note.updatedAt).toLocaleDateString()
                            }}</span>
                            <span class="text-xs text-[#D6D6D6]">...{{ note.text.substring(50, 70) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full">
            <div class="flex justify-between w-full items-start p-8">
                <button class="inline-flex items-center gap-2 text-sx text-[#C2C2C5] hover:text-white">
                    <EditIcon />Create Note
                </button>
                <button>
                    <TrashIcon class="text-[#6D6D73] hover:text-white" />
                </button>
            </div>
            <div class="max-w-[438px] mx-auto">

                <p class="text-[#929292]">{{ new Date(selectedNote.updatedAt).toLocaleDateString() }}</p>
                <p class="text-[#D4D4D4] my-4"> {{ selectedNote.text }} </p>

            </div>
        </div>
    </div>
</template>

<script setup>
const notes = ref([]);
const selectedNote = ref({});
definePageMeta({
    middleware: ['auth']
});

const todaysNotes = computed(() => {
    return notes.value.filter((note) => {
        return new Date(note.updatedAt).toDateString() === new Date().toDateString();
    });
});

const yesterdaysNotes = computed(() => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1);
    return notes.value.filter((note) => {
        return new Date(note.updatedAt).toDateString() === yesterday.toDateString();
    });
});

const earlierNotes = computed(() => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1);
    return notes.value.filter((note) => {
        return new Date(note.updatedAt) < yesterday
        && new Date(note.updatedAt).toDateString() !== yesterday.toDateString();;
    });
});


onMounted(async () => {
    notes.value = await $fetch('/api/notes');
    if (notes.value.length > 0) selectedNote.value = notes.value[0];
})
</script>