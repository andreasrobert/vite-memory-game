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

{ 
    0: score,
    1: score,
    2: score,
    3: score,

}





*/