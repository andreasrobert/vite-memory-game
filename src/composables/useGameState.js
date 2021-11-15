import { ref, onMounted, watch } from 'vue'

export default function usePlayerState(params) {
    const { theme, player, grid } = params

    let temp = []
    const players = ref([0,0,0,0])

    return {
        players
    }
}


/* 






*/