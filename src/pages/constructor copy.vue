<template>
    <div class="constructor">
        <Sidebar/>
        
        <div class="wrapper">
            <div class="constructor-body">
                <router-link to="/" class="btn btn-icon btn-link">
                    <img 
                        src="../assets/arrow-left.svg" 
                        class="svg-icon" 
                        alt="Arrow left" 
                        width="16" 
                        height="14"
                        @click="$router.push('/')">
                </router-link>
            
                <div v-if="template" class="constructor-body-content">
                    <div class="form-group">
                        <div class="custom-control">
                            <input
                                type="checkbox"
                                class="custom-control-input"
                                id="isVisible"
                                v-model="template.isVisible">
                            <label class="custom-control-label" for="isVisible">
                                <span v-if="template.isVisible">Visible</span>
                                <span v-else>Hidden</span>
                            </label>
                        </div>
                    </div>
                    <div class="constructor-body-upload form-group">
                        <UploadImages @changed="handleImages" ref="uploadImages" />
                    </div>

                    <div class="form-row">
                        <div class="form-group" :class="{'is-invalid': validation.id !== null}">
                            <input 
                                v-model="template.id"
                                type="text" 
                                class="form-control" 
                                placeholder="###"
                                :readonly="editMode">
                            <div class="invalid-tooltip" v-if="validation.id !== null">
                                {{ validation.id }}
                            </div>
                        </div>

                        <div class="form-group" :class="{'is-invalid': validation.title !== null}">
                            <input 
                                v-model="template.title"
                                type="text" 
                                class="form-control" 
                                placeholder="Name">
                            <div class="invalid-tooltip" v-if="validation.title !== null">
                                {{ validation.title }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group" :class="{'is-invalid': validation.url !== null}">
                        <input
                            v-model="template.url"
                            type="text" 
                            class="form-control" 
                            placeholder="https://design###.horoshop.ua/">
                        <div class="invalid-tooltip" v-if="validation.url !== null">
                            {{ validation.url }}
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="editMode" class="constructor-buttons">
                <button
                    @click="deleteTemplate"
                    class="btn btn-bordered">
                    Delete
                </button>
                <button 
                    @click="editTemplate"
                    class="btn btn-info">
                    Save and exit
                </button>
            </div>
            <div v-else class="constructor-buttons">
                <button 
                    @click="addTemplate"
                    class="btn btn-info">
                    Save and exit
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import Sidebar from '../components/Sidebar.vue';
import { mapGetters } from "vuex";
import UploadImages from "vue-upload-drop-images";

export default {
    mounted() {
        this.template = this.templateCopy;

        if (this.$route.params?.id) {
            if (this.$store.state.templates.length) {
                this.editMode = true;
                setTimeout(() => {
                    if (this.template?.imgUrl?.length) {
                        this.$refs.uploadImages.Imgs = this.template.imgUrl; 
                    }
                }, 500)
            } else {
                this.$router.push('/');
            }
        }
    },

    data() {
        return {
            editMode: false,
            template: null,
            validation: {
                id: null,
                title: null,
                url: null
            }
        }
    },
    computed: {
        ...mapGetters(["getTemplateById"]),
        templateCopy() {
            if (this.$route.params?.id) {
                return this.getTemplateById(this.$route.params.id);
            } else {
                return {
                    isVisible: true,
                }
            }
        }
    },
    methods: {
        handleImages(files){
            setTimeout(() => {
                this.template.imgUrl = this.$refs.uploadImages.Imgs;
            }, 500);
        },

        addTemplate() {
            this.validation.id = null;
            this.validation.title = null;
            this.validation.url = null;

            if (!this.template.id || !this.template.title || !this.template.url) {
                if (!this.template.id) {
                    this.validation.id = 'ID cant be empty';
                }
                if (!this.template.title) {
                    this.validation.title = 'Title cant be empty';
                }
                if (!this.template.url) {
                    this.validation.url = 'Url cant be empty';
                }
                return;
            }

            if (isNaN(+this.template.id)) {
                this.validation.id = 'Use digits for ID';
                return;
            }
 
            this.$store.state.templates.forEach((template) => {
                if (parseFloat(this.templateCopy.id) === parseFloat(template.id)) {
                    this.validation.id = 'Already had this ID';
                    return;
                }
            })

            if (!this.validation.id) {
                this.$store.dispatch('addTemplate', this.template);
                this.$router.push('/');
            }
        },

        editTemplate() {
            this.$store.dispatch('editTemplate', {oldObj: this.templateCopy, copyObj: this.template});
            this.$router.push('/');
        },

        deleteTemplate() {
            this.$store.dispatch('deleteTemplate', this.templateCopy.id);
            this.$router.push('/');
        },
    },
    components: {
        Sidebar,
        UploadImages
    }
}
</script>