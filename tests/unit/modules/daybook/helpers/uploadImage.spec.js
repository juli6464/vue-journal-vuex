import cloudinary from 'cloudinary';
import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from "axios";

cloudinary.config({
    cloud_name: 'di5m7orpd',
    api_key: '617894513534574',
    api_secret: 'qU2AQUW74QkcTyeKcykoGZcif3o'
})

/** public_id real en Cloudinary (sin carpeta /upload ni versión v123/) */
function publicIdFromSecureUrl(secureUrl) {
    const pathname = new URL(secureUrl).pathname
    const m = pathname.match(/\/image\/upload\/(?:v\d+\/)?(.+)$/)
    if (!m) throw new Error(`No se pudo obtener public_id de: ${secureUrl}`)
    return m[1].replace(/\.[^/.]+$/, '')
}

describe('Pruebas en el uploadImage ', () => {
    
    test('debe de cargar un archivo y retornar el url', async(  ) => {
        
        const { data } = await axios.get('https://res.cloudinary.com/di5m7orpd/image/upload/v1774638119/cld-sample-4.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([ data ], 'foto.jpg')

        const url = await uploadImage( file )

        expect( typeof url ).toBe('string')

        const publicId = publicIdFromSecureUrl(url)

        const result = await new Promise((resolve, reject) => {
            cloudinary.v2.api.delete_resources([publicId], {}, (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })

        expect(result.deleted).toBeDefined()
        expect(result.deleted[publicId]).toBe('deleted')
    })
    

})