import { shallowMount } from '@vue/test-utils';
import Home from '../../../src/views/HomeView.vue';


describe('Pruebas en Home view', () => { 
    
    test('debe de renderizar el componente', () => {
        const wrapper = shallowMount(Home);
        expect(wrapper.html()).toMatchSnapshot();
    })

    test('hacer clic en un boton debe redireccionar a no-entry', () => {

        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount( Home, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        } )

        wrapper.find('button').trigger('click');
        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' });

    })
 })