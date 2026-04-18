import { createStore} from 'vuex'
import { shallowMount } from '@vue/test-utils'

import Swal from 'sweetalert2'

import journal from '@/modules/daybook/store/journal'
import { journalState } from '../modules/daybook/store/journal/mock-data/test-journal-state'

import EntryView from '@/modules/daybook/views/EntryView.vue'

const createVuexStore = ( inicialState) => 
createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...inicialState }
        }
    }
})

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('pruebas en entryview', () => { 

    const store = createVuexStore(journalState)
    store.dispatch = jest.fn()

    const mockRouter = {
        push: jest.fn()
    }

    let  wrapper 

    beforeEach(() => {
            jest.clearAllMocks()

            wrapper = shallowMount(EntryView, {
            props: {
                id: '-N3qQb8sYVj9n9Xl2vS'
            },
            global: {
            mocks: {
                $router: mockRouter
            },
            plugins: [store]
            }
        })
    })

    test('debe sacar el usu pq el id no existe', () => { 
    
        
        const wrapper = shallowMount(EntryView, {
            props: {
                id: 'no-existe'
            },
            global: {
            mocks: {
                $router: mockRouter
            },
            plugins: [store]
            }
        })

        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })
    })

    test('debe mostrar la entrada correctamente', () => { 

        expect(wrapper.html()).toMatchSnapshot()
        expect(mockRouter.push).not.toHaveBeenCalled()
    })

    test('debe borrar entrada y salir',  (done) => {

        Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }))

        wrapper.find('.btn-danger').trigger('click')
    
        expect(Swal.fire).toHaveBeenCalledWith({
            title: '¿Está seguro?',
            text: "¡No podrás revertir esto!",
            showDenyButton: true,
            confirmButtonText: 'Sí, bórralo'
         })

        setTimeout(() => {

            expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-N3qQb8sYVj9n9Xl2vS')
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })
        done()
        }, 1)   
    })
})    