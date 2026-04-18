import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../journal/mock-data/test-journal-state'

const createVuexStore = ( inicialState) => 
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...inicialState }
            }
        }
    })

describe('vuex-prubas en el journal module', () => { 
    test('este es el estado inicia, debe tener este state', () => {
       
        const store = createVuexStore( journalState )
        const { isLoading, entries } = store.state.journal

        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )

    })

    test('mutation: setEntries', () => {
        const store = createVuexStore( { isLoading: true, entries: [] } )
        store.commit('journal/setEntries', journalState.entries )
        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.isLoading ).toBeFalsy()
     })
     
     test('mutation: updateEntry', () => {

        const store = createVuexStore( journalState )
        const updatedEntry =         {
            id: '-N3qQb8sYVj9n9Xl2vX',
            date: 1660642800000,
            text: 'Hola mundo desde pruebas.',
        }

        store.commit('journal/updateEntry', updatedEntry )

        const storeEntries= store.state.journal.entries

        expect( storeEntries.length ).toBe(2)
        expect( storeEntries.find( e => e.id === updatedEntry.id ) ).toEqual( updatedEntry )
     })

     test('mutation: addentry deleteentry', () => {
    
        const store = createVuexStore( journalState )

        store.commit('journal/addEntry', { id: 'ABC-123', text: 'Nueva entrada desde pruebas' } )
        
        const stateEntries = store.state.journal.entries

        expect( stateEntries.length ).toBe(3)
        expect( stateEntries.find( e => e.id === 'ABC-123' ) ).toBeTruthy()

        store.commit('journal/deleteEntry', 'ABC-123' )
        
        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.entries.find( e => e.id === 'ABC-123' ) ).toBeFalsy()
     })

     test('getters: getEntriesByTerm getEntryById', () => {

        const store = createVuexStore( journalState )

        const [ entry1, entry2] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('segunda').length).toBe(1)

        expect(store.getters['journal/getEntriesByTerm']('segunda')).toEqual( [entry2] )
        
        expect(store.getters['journal/getEntryById']('-N3qQb8sYVj9n9Xl2vX')).toEqual( entry1 )
        expect(store.getters['journal/getEntryById']('-N3qQb8sYVj9n9Xl2vS')).toEqual( entry2 )

     })

     // Actions

    //  test('actions: loadEntries', async() => {
        
    //     const store = createVuexStore( { isLoading: true, entries: [] } )

    //     await store.dispatch('journal/loadEntries')

    //     expect( store.state.journal.entries.length ).toBe(2)

    //  })

          test('actions: updateEntry', async() => {
        
        const store = createVuexStore( journalState )
        
        const updatedEntry = {
            id: '-N3qQb8sYVj9n9Xl2vX',
            date: 1660642800000,
            text: 'Hola desde mock data.',
            otroCampo: true,
            otroMas: { a:1 }
        }


        await store.dispatch('journal/updateEntry', updatedEntry)

        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.entries.find( e => e.id === updatedEntry.id ) ).toEqual( {
            id: '-N3qQb8sYVj9n9Xl2vX',
            date: 1660642800000,
            text: 'Hola desde mock data.'
        } )

     })

     test('actions: createEntry deleteEntry', async() => {
        
        const store = createVuexStore( journalState )
        const newEntry = {
            date: 1660642800000,
            text: 'Nueva entrada desde pruebas'
        }
        const id = await store.dispatch('journal/createEntry', newEntry )

        expect( typeof id ).toBe( 'string' )
        expect( store.state.journal.entries.find( e => e.id === id ) ).toBeTruthy()

        await store.dispatch('journal/deleteEntry', id )

        expect( store.state.journal.entries.find( e => e.id === id ) ).toBeFalsy()

        
     })
     
 })