<template>
    <div class="dashboard">
        <Sidebar/>
    
        <div class="wrapper">
            <div class="dashboard-title">
                <h1 class="head-md">All templates</h1>
                <router-link 
                    to="/constructor"
                    class="btn btn-info">
                    Add template
                </router-link>
            </div>
            
            <div v-if="$store.state.templates.length" class="card-group">
                <div 
                    v-for="template in $store.state.templates"
                    :key="template.id"
                    class="card"
                    :class="{'is-hidden': !template.isVisible}">
                    <router-link 
                        :to="{ name: 'constructor', params: { id: template.id } }"
                        class="link">
                        <img v-if="!template.imgUrl" src="../assets/card.jpg" alt="Card" class="card-image">
                        <img v-else :src="template.imgUrl[0]" :alt="template.title" class="card-image">
                    </router-link>
                    <div class="card-title">
                        <div class="card-title-info">
                            <span class="badge">{{ template.id }}</span>
                            <span>{{ template.title }}</span>
                        </div>
                        
                        <span v-if="!template.isVisible">Hidden</span>
                    </div>
                </div>
            </div>

            <div v-else class="dashboard-nodata">
                <p class="dashboard-nodata-text">
                    No any templates
                </p>
                <router-link 
                    to="/constructor"
                    class="btn btn-info">
                    Add template
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

import Sidebar from '../components/Sidebar.vue';

export default {
    components: {
        Sidebar
    }
}
</script>