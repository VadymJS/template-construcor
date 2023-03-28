import { createStore } from 'vuex'

export default createStore({
    state: {
        templates: []
    },
    mutations: {
        UPDATE_TEMPLATES(state, payload) {
          state.templates = payload;
        }
      },
    actions: {
        addTemplate(context, payload) {
            const templates = context.state.templates;
            templates.push(payload);

            context.commit('UPDATE_TEMPLATES', templates);
        },
        deleteTemplate(context, id) {
            let templates = context.state.templates;
            templates = templates.filter(template => template.id !== id);

            context.commit('UPDATE_TEMPLATES', templates);
        },
        editTemplate(context, {oldObj, copyObj}) {
            const templates = context.state.templates;
            let index = templates.findIndex(template => template.id === oldObj.id);
            templates[index] = copyObj;

            context.commit('UPDATE_TEMPLATES', templates);
        }
    },
    getters: {
        templates: state => state.templates,

        getTemplateById: state => id => {
            return state.templates.find(template => parseFloat(template.id) === parseFloat(id));
        }
    }
})