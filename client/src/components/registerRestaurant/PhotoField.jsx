
export function PhotoField({onFile, file}) {
  return (
    <div className=" l">
    <div className="flex items-center justify-center w-full ">
        <label htmlFor="file" className="">
            <div className="flex flex-col items-center justify-center  cursor-pointer w-full">
             
               
                  {
                    file ? 
                    <>
                      <h3 className="text-sm font-inter font-medium mb-2">Imagen seleccionada</h3>
                      <img src={URL.createObjectURL(file)} alt="img" className="w-24 h-24 object-cover rounded-lg"/>
                    </>
                    : 
                    <>
                      <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click para </span> subir imagen del restaurante</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG OR JPEG (MAX. 800x400px)</p>
                    </>
                  }
                    
            </div>
            <input id="file"  accept=".jpg, .jpeg, .png"  type="file" className="hidden "  onChange={(e) => onFile(e)}/>
        </label>
    </div> 

  </div>
  )
}
