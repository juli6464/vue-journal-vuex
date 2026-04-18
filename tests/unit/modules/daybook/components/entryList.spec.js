import { createStore} from 'vuex'
import { journalState } from '../store/journal/mock-data/test-journal-state'
import { shallowMount } from '@vue/test-utils'
import EntryList from '@/modules/daybook/components/EntryList.vue'
import journal from '@/modules/daybook/store/journal'

    const createVuexStore = ( inicialState) => 
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...inicialState }
            }
        }
    })


describe('pruebas en entrylist', () => { 
    
    const store = createVuexStore(journalState)
    const mockRouter = {
        push: jest.fn()
    }

    let  wrapper 

    beforeEach(() => {
            jest.clearAllMocks()

            wrapper = shallowMount(EntryList, {
            global: {
            mocks: {
                $router: mockRouter
            },
            plugins: [store]
            }
        })
    })

    test('debe de llamar el getentriesbyterm sin termino y mostrar 2 entradas', () => { 

        //console.log(wrapper.html())
        expect(wrapper.findAll('entry-data-stub').length).toBe(2)
        expect(wrapper.html()).toMatchSnapshot()
     })

     test('debe de llamar el getentriesbyterm con el termino y filtrar entradas', async() => {

        const input = wrapper.find('input')
        await input.setValue('segunda')
        expect(wrapper.findAll('entry-data-stub').length).toBe(1)
     })

     test('el boton de nuevo debe redireccionar a /new', () => {
        wrapper.find('button').trigger('click')
        expect(mockRouter.push)
            .toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } })
     })

 })