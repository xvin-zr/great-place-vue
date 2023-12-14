import { defineComponent, ref } from "vue";

const date = new Date().toISOString().slice(0, 10);
// const q = ref(1)

const Hello = defineComponent({
  render() {
    return (
      <h1 className="mt-4 text-left text-orange-800">Hello, it's {date}</h1>
    );
  },
});

export default Hello;
