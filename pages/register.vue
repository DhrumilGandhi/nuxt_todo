<template>
    <div class="flex bg-black h-screen">
        <div class=" bg-zinc-900 w-[516px] p-8 flex flex-col justify-center">
            <Logo />
            <h1 class="text-white font-bold text-lg mt-8">Sign up for a free account</h1>
            <p class="text-zinc-300 text-sm mt-0.5">Already registered? <NuxtLink to="/login"
                    class="font-bold text-[#FFAC00] underline">Log in</NuxtLink> to your account</p>
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
                        class="w-full mt-4 text-[#4B360A] bg-[#FFAC00] rounded-full px-4 py-2 text-sm font-bold flex justify-center items-center gap-2">Sign
                        Up
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
            const response = await $fetch('./api/user',{
                method: 'POST',
                body: {
                    email: email.value,
                    password: password.value
                }
            });
            const { isConfirmed } = await Swal.fire({
                title: 'Success',
                text: 'Account Created',
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