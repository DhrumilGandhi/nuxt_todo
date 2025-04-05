export default defineNuxtRouteMiddleware(async (event) => {
    if (process.client) return;
    
    const { $verifyJwtToken } = useNuxtApp()
    const jwtToken = useCookie('TodoJWT');
    if(!jwtToken.value) {
       return navigateTo('/register');
    }
    try {
        await $verifyJwtToken(jwtToken.value, process.env.JWT_KEY);
    } catch (error) {
        return navigateTo('/register');
    }
});