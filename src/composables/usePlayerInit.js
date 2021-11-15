import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useStore } from "vuex";

export default function usePlayerInit() {
    const store = useStore();
    const settings = computed(() => store.state.setting);
    const playersNumb = ref(settings.value["Numbers of Players"]);

    const players = reactive({})

    const initPlayer = () => {
        for (let i = 1; i <= playersNumb.value; i++) {
            players[i] = 0;
          }
    }

    initPlayer();
    

    return {
        players,
        playersNumb,
        initPlayer
    }
}


/* 






*/