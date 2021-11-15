import { ref, reactive, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import { icons } from "../components/data";

export default function useShuffleGrid() {
  const store = useStore();
  const settings = computed(() => store.state.setting);
  const gridSize = ref(settings.value["Grid Size"] === "4x4" ? 4 : 6);

  const array = reactive([]);

  const len = Math.pow(gridSize.value, 2);

  // init array
  for (let i = 0; i < len; i++) {
    array.push(i);
  }

  const initClick = () =>{
    let tempClick = {};

    array.forEach((numb) => {
      tempClick = { ...tempClick, [numb]: { state: false, value: icons[numb] } };
    });

    return reactive(tempClick)
  }
  
  const click = initClick()

  const shuffleGrid = () => {
    let n = len;
    while (n) {
      let i = Math.floor(Math.random() * n--);
      let t = array[n];
      array[n] = array[i];
      array[i] = t;
    }
  };

  shuffleGrid();

  return {
    gridSize,
    click,
    array,
    shuffleGrid,
    initClick
  };
}

/* 






*/
