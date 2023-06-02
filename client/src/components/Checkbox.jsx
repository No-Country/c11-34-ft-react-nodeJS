import { countries } from "../utils";


export function Checkbox() { 


  return (
        <section className="flex flex-col gap-y-3 w-full">
        {
            countries.map(countrie => {

                const name = countrie.name.split(' ')[1]

                return (
                
                <div className="w-full flex justify-between" key={countrie.name}>
                    <label className="font-inter font-medium text-lg">{name}</label>
                    <input id={name} value={name} type="checkbox" className="w-4 h-4 rounded text-red-400 border border-border-color"/>
                </div>
                )
            })
        }
    </section>
  )
}