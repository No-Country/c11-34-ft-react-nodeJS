import cloudinary from 'cloudinary'

const cloud = cloudinary.v2

cloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dwqu0ohif',
  api_key: process.env.CLOUDINARY_API_KEY || '529327173831236',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'x3HKx6yJ_QxGCJltsClsq-TL2-k'
})

export const cloudinaryUpload = async (path:string,dimension:number) => {

  const result=await cloud.uploader.upload(path)
  const { public_id } = result

  const transformedUrl=cloud.url(public_id,{
    width: dimension,
    height: dimension,
    crop: 'fill'
  })

  return transformedUrl
}