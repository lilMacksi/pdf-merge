<template>
  <div>Loging in...</div>
</template>

<script>
import AuthService from "@/js/SecurityService";

export default {
  name: "Callback",
  data() {
    return {
      authService: AuthService.createInstance(),
    }
  },
  async created() {
    try {
      await this.authService.signInCallback();
      this.$router.push("/");
    } catch (error) {
      console.error(error);
      this.authService.signIn();
    }
  }
}
</script>

<style scoped>

</style>