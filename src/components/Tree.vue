<template>
    <div class="tree">
    
        <ProgressSection 
            :progress="'emerge_roots'"
            :unlock="'roots_emerged'"
            :unlockValue="0"
            :label="'Emerge Roots'"
            :speed="0">
        </ProgressSection>
        
        <ProgressSection 
            :progress="'gather_nutrients'"
            :unlock="'roots_emerged'"
            :unlockValue="1"
            :label="'Gather Nutrients'"
            :desc="'Increases your nutrients count.'"
            :speed="1">
        </ProgressSection>
        
        <ProgressSection 
            :progress="'grow_roots'"
            :unlock="'unlock_grow_roots'"
            :unlockValue="1"
            :label="'Grow Roots'"
            :desc="'Decreases the time it takes to gather nutrients.'"
            :speed="1">
        </ProgressSection>
        
        <ProgressSection 
            :progress="'grow_bigger'"
            :unlock="'unlock_grow_bigger'"
            :unlockValue="1"
            :label="'Grow Roots'"
            :desc="'Increases the size of your tree.'"
            :speed="1">
        </ProgressSection>
        
    </div>
</template>

<script>
import ProgressSection from '../components/ProgressSection.vue';

export default {
  components: {
    ProgressSection,
  },
}

</script>
