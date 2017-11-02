<template>
    <div class="tree">
    
        <ProgressSection 
            :progress="'emerge_roots'"
            :unlock="'roots_emerged'"
            :unlockValue="0"
            :label="'Emerge Roots'"
            :cost="0"
            :speed="0">
        </ProgressSection>
        
        <ProgressSection 
            :progress="'gather_nutrients'"
            :unlock="'roots_emerged'"
            :unlockValue="1"
            :label="'Gather Nutrients'"
            :cost="0"
            :speed="1"
            :workable="1">
        </ProgressSection>
        
        <ProgressSection 
            :progress="'grow_cells'"
            :unlock="'cells'"
            :unlockValue="1"
            :label="'Grow Cells'"
            :cost="1"
            :speed="1"
            :workable="1">
        </ProgressSection>
    
    
        <ProgressSection 
            :progress="'gain_energy'"
            :unlock="'energy'"
            :unlockValue="1"
            :label="'Gain Energy'"
            :cost="1"
            :speed="1"
            :workable="1">
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
