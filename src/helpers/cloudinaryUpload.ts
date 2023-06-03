import cloudinary from 'cloudinary'

const cloud = cloudinary.v2

cloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dwqu0ohif',
  api_key: process.env.CLOUDINARY_API_KEY || '529327173831236',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'x3HKx6yJ_QxGCJltsClsq-TL2-k'
})

export const cloudinaryUpload = async (path:string,dimension:number) => {
// * sube la imagen a cloud
  const result=await cloud.uploader.upload(path)
  
  // * toma el id de la imagen subida
  const { public_id } = result
 
  //* transforma la url de la imagen a traves del id
  const transformedUrl=cloud.url(public_id,{
    width: dimension,
    height: dimension,
    crop: 'fill'
  })

  return transformedUrl
}