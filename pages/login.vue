<template>
    <div class="flex bg-zinc-900 h-screen">
        <div class=" bg-black w-[516px] p-8 flex flex-col justify-center">
            <Logo />
            <h1 class="text-white font-bold text-lg mt-8">Log in to your account</h1>
            <p class="text-zinc-300 text-sm mt-0.5">Don't have an account? <NuxtLink to="/register"
                    class="font-bold text-[#FFAC00] underline">Sign up</NuxtLink> for one.</p>
            <form @submit.prevent="submit">
                <div class="mt-8">
                    <label class="text-zinc-300 font-normal block mb-0.5" for="">Email Address</label>
                    <input type="email" v-model="email"
                        class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white px-4 py-2 placeholder:text-zinc-500 text-sm"
                        placeholder="you@example.com">
                </div>
                <div class="mt-6">
                    <label class="text-zinc-300 font-normal block mb-0.5" for="">Password</label>
                    <input type="password" v-model="password"
                        class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white px-4 py-2 placeholder:text-zinc-500 text-sm"
                        placeholder="*********">
                </div>
                <div>
                    <button
                        class="w-full mt-4 text-[#4B360A] bg-[#FFAC00] rounded-full px-4 py-2 text-sm font-bold flex justify-center items-center gap-2">Log in
                        <ArrowRight />
                    </button>
                </div>
            </form>
        </div>
        <div>

        </div>
    </div>
</template>

<script setup>
    import Swal from 'sweetalert2';
    const email = ref('');
    const password = ref('');
    async function submit () {
        try {
            const response = await $fetch('./api/login',{
                method: 'POST',
                body: {
                    email: email.value,
                    password: password.value
                }
            });
            const { isConfirmed } = await Swal.fire({
                title: 'Success',
                text: 'Login success',
                icon: 'success',
                confirmButtonText: 'Close'
            });
            if (isConfirmed) {
                navigateTo('/');
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response?._data?.message,
                icon: 'error',
                confirmButtonText: 'Close'
            })
        }
        
    }
</script>