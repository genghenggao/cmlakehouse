<template>
  <div class='HydrologyPlatform'></div>
</template>

<script lang='ts'>
interface HydrologyPlatform { str: string;
}
import { reactive,toRefs,onBeforeMount,onMounted, getCurrentInstance,defineComponent,ComponentInternalInstance,ToRefs} from 'vue'
export default defineComponent({
   name: 'HydrologyPlatform',
   props: [],
   setup() {
     const ctx:ComponentInternalInstance | null = getCurrentInstance()
     console.log(ctx)
     console.log('1-开始创建组件-setup')
     onBeforeMount(() => {
        console.log('2.组件挂载页面之前执行----onBeforeMount')
     })
     onMounted(() => {
       console.log('3.-组件挂载到页面之后执行-------onMounted')
     })
     const initState = (): HydrologyPlatform => {
       return {
       str: '1'
       };
     };
     const model:HydrologyPlatform = reactive(initState());
     let data: ToRefs<HydrologyPlatform> = toRefs(model);
     let resetState = (): void => {
      Object.assign(model, initState()); // 将新状态对象的属性分配到现有响应式对象
     }
     return {
       ...data,
       resetState
      }
   }
})
</script>
<style lang='scss' scoped>
</style>