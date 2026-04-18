import { shallowMount } from '@vue/test-utils';
import Fab from '../../../../../src/modules/daybook/components/FabButton.vue';


describe('pruebas en Fab component', () => { 

    test('debe mostrar icono por defecto',() => {
        
        const wrapper = shallowMount(Fab)
        const iTag = wrapper.find('i');
        expect(iTag.classes('fa-plus')).toBeTruthy()

     })

    test('debe mostrar icono por argumento:fa-circle',() => {
        const wrapper = shallowMount(Fab, {
            props: {
                icon: 'fa-circle'
            }
        })
        const iTag = wrapper.find('i');
        expect(iTag.classes('fa-circle')).toBeTruthy()
     })

    test('debe emitir on:click cuando se hace clic', () => {
        const wrapper = shallowMount(Fab)

        wrapper.find('button').trigger('click');

        expect(wrapper.emitted('on:click')).toHaveLength(1);
        //wrapper.emitted('on:click)

        
     })
    
})