<template>
  <div class="flex-center">
    <div class="card" style="width: 100%; max-width: 400px;">
      
      <!-- Card Header -->
      <div class="card-header" style="text-align: center;">
        <h1 class="card-title">Inscription</h1>
        <p class="card-description">Créez votre compte pour commencer</p>
      </div>

      <!-- Card Content -->
      <div class="card-content">
        
        <!-- Alerts -->
        <div v-if="error" class="alert alert-destructive">
          {{ error }}
        </div>
        <div v-if="success" class="alert alert-success">
          {{ success }}
        </div>

        <form @submit.prevent="handleRegister">
          <div class="input-group">
            <label class="label" for="name">Nom complet</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="input"
              placeholder="Jean Dupont"
              required
            />
          </div>

          <div class="input-group">
            <label class="label" for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="input"
              placeholder="jean.dupont@example.com"
              required
            />
          </div>

          <div class="input-group">
            <label class="label" for="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              class="input"
              placeholder="Min 6 caractères"
              required
              minlength="6"
            />
          </div>

          <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
            {{ loading ? 'Inscription...' : "S'inscrire" }}
          </button>
        </form>

        <div class="separator">
          <div class="separator-line"></div>
        </div>

        <!-- Links -->
        <div style="text-align: center;">
          <span style="font-size: 0.875rem; color: var(--muted-foreground);">
            Déjà un compte ? 
            <router-link to="/login" class="link">Se connecter</router-link>
          </span>
        </div>

      </div>

      <!-- Footer/Info -->
      <div class="card-footer" style="flex-direction: column;">
         <div class="professor-note" style="width: 100%;">
          <h3>💡 JWT Demo</h3>
          <ul>
            <li>Pas de session serveur</li>
            <li>Token stocké dans <code>localStorage</code></li>
            <li>MongoDB pour les utilisateurs uniquement</li>
          </ul>
         </div>
      </div>

    </div>
  </div>
</template>

<script>
import { authService } from '../services/api'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      error: null,
      success: null,
      loading: false
    }
  },
  methods: {
    async handleRegister() {
      this.error = null
      this.success = null
      this.loading = true

      try {
        const response = await authService.register(this.form)
        this.success = response.message
        setTimeout(() => {
          this.$router.push('/home')
        }, 1000)
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur lors de l\'inscription'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
