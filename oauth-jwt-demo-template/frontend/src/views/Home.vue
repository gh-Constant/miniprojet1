<template>
  <div style="min-height: 100vh; background-color: var(--background);">
    
    <!-- Navbar -->
    <header style="border-bottom: 1px solid var(--border); padding: 1rem 0; background-color: rgba(255,255,255,0.8); backdrop-filter: blur(8px); position: sticky; top: 0; z-index: 50;">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
        <div style="font-weight: 700; font-size: 1.25rem;">OAuth Demo</div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <span style="font-size: 0.875rem; color: var(--muted-foreground);">{{ user?.name }}</span>
          <button @click="handleLogout" class="btn btn-outline btn-sm">
            Déconnexion
          </button>
        </div>
      </div>
    </header>

    <main class="container" style="padding-top: 2rem; padding-bottom: 2rem;">
      <div style="margin-bottom: 2rem;">
        <h1 style="margin-bottom: 0.5rem;">Tableau de bord</h1>
        <p style="color: var(--muted-foreground);">Gérez vos informations et consultez votre statut.</p>
      </div>

      <div v-if="error" class="alert alert-destructive">
        {{ error }}
      </div>

      <div style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
        
        <!-- Profile Card -->
        <div class="card" v-if="profile">
          <div class="card-header">
            <h3 class="card-title">Profil</h3>
            <p class="card-description">Vos informations personnelles</p>
          </div>
          <div class="card-content">
            <div style="display: grid; gap: 1rem;">
              <div class="input-group">
                <label class="label">ID Utilisateur</label>
                <div class="input" style="background: var(--muted); border: none; display: flex; align-items: center;">
                  {{ profile._id }}
                </div>
              </div>
              <div class="input-group">
                <label class="label">Nom</label>
                <div class="input" style="background: var(--muted); border: none; display: flex; align-items: center;">
                  {{ profile.name }}
                </div>
              </div>
              <div class="input-group">
                <label class="label">Email</label>
                <div class="input" style="background: var(--muted); border: none; display: flex; align-items: center;">
                  {{ profile.email }}
                </div>
              </div>
              <div class="input-group">
                <label class="label">Membre depuis</label>
                <div class="input" style="background: var(--muted); border: none; display: flex; align-items: center;">
                  {{ formatDate(profile.createdAt) }}
                </div>
              </div>
            </div>
            
            <button @click="fetchProfile" class="btn btn-secondary btn-full" style="margin-top: 1rem;">
              <svg style="margin-right: 8px; width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              Rafraîchir les données
            </button>
          </div>
        </div>

        <!-- professor-note info -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Session & Sécurité</h3>
            <p class="card-description">Détails techniques de votre authentification</p>
          </div>
          <div class="card-content">
            <!-- Token Box -->
            <div style="background-color: var(--secondary); padding: 1rem; border-radius: var(--radius); font-family: monospace; font-size: 0.8rem; overflow-x: auto; color: var(--secondary-foreground); margin-bottom: 2rem;">
              <div style="margin-bottom: 0.5rem; color: var(--muted-foreground);">ACCESS TOKEN</div>
              <div style="word-break: break-all;">{{ truncatedToken }}</div>
            </div>

            <div class="professor-note">
              <h3>🔑 Informations JWT</h3>
              <ul>
                <li>Token stocké dans: <code>localStorage.getItem('accessToken')</code></li>
                <li>Token utilisé: Header <code>Authorization: Bearer [TOKEN]</code></li>
                <li>Expiration: <strong>{{ tokenExpiry }}</strong></li>
                <li>Pas de session serveur: ✅ Stateless</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
import { authService } from '../services/api'

export default {
  name: 'Home',
  data() {
    return {
      user: null,
      profile: null,
      error: null,
      tokenExpiry: '1 heure'
    }
  },
  computed: {
    truncatedToken() {
      const token = localStorage.getItem('accessToken')
      if (!token) return 'Aucun token'
      return token //.substring(0, 50) + '...' + token.substring(token.length - 20)
    }
  },
  mounted() {
    this.user = authService.getCurrentUser()
    this.fetchProfile()
  },
  methods: {
    async fetchProfile() {
      this.error = null
      try {
        const response = await authService.getProfile()
        this.profile = response.user
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur lors du chargement du profil'
      }
    },
    handleLogout() {
      authService.logout()
      this.$router.push('/login')
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>
