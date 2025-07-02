// Wrapper para AnimeJS que resolve problemas de import/export
let anime = null

// Função para carregar AnimeJS dinamicamente
export const loadAnime = async () => {
    if (typeof window !== 'undefined' && !anime) {
        try {
            // Tenta carregar a versão ES module primeiro
            const animeModule = await import('animejs')
            anime = animeModule.default || animeModule
        } catch (error) {
            console.warn('Failed to load AnimeJS:', error)
        }
    }
    return anime
}

// Função helper para usar anime com verificação
export const useAnime = async (config) => {
    const animeInstance = await loadAnime()
    if (animeInstance) {
        return animeInstance(config)
    }
    return null
}

// Export direto para compatibilidade
export { anime }
