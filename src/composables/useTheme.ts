import { ref, computed, watch } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  return 'light'
}

export function useTheme() {
  const theme = ref<Theme>(getStoredTheme())

  const isDark = computed(() => theme.value === 'dark')

  watch(
    theme,
    (newTheme) => {
      localStorage.setItem(STORAGE_KEY, newTheme)
      applyTheme(newTheme)
    },
    { immediate: true }
  )

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function applyTheme(t: Theme) {
    if (t === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return {
    theme,
    isDark,
    toggleTheme
  }
}
