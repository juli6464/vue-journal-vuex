
export default () => ({
    isLoading: true,
    entries: [
        {
            id: '1',
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.',
            picture: null   
        },
        {
            id: '2',
            date: new Date().toDateString(),
            text: 'Long text Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.',
            picture: null   
        },
        {
            id: '3',
            date: new Date().toDateString(),
            text: 'Short text Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.',
            picture: null   
        }
    ]
})