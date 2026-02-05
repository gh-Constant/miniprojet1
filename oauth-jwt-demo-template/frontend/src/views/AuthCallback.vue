<template>
  <div class="flex-center">
    <div class="card" style="width: 300px; text-align: center; padding: 2rem;">
      <div class="spinner"></div>
      <h3 style="margin-bottom: 0.5rem; font-size: 1.125rem;">Connexion...</h3>
      <p style="color: var(--muted-foreground); font-size: 0.875rem;">Veuillez patienter un instant</p>
      
      <div v-if="error" class="alert alert-destructive" style="margin-top: 1rem;">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthCallback',
  data() {
    return {
      error: null
    }
  },
  mounted() {
    // Récupérer le token depuis l'URL (passé par le backend)
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (token) {
      // Stocker le token dans localStorage (comme pour login classique)
      localStorage.setItem('accessToken', token)

      // Rediriger vers la page d'accueil
      setTimeout(() => {
        this.$router.push('/home')
      }, 500)
    } else {
      // Pas de token = erreur
      this.error = 'Aucun token reçu. Redirection...'
      setTimeout(() => {
        this.$router.push('/login')
      }, 2000)
    }
  }
}
</script>

<style scoped>
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--secondary);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
