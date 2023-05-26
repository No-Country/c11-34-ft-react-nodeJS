import { itemsNavBottom } from "../utils/ItemsNavBottom"



export function NavBarBottom() {

    return (
      <div className="fixed z-50 bottom-0 left-0 bg-bg-dark w-full h-20 border-t border-gray-200">
        <div className="flex items-center justify-around w-full h-full">
            {itemsNavBottom.map((item, index) => (
            <button className="flex flex-col items-center justify-center gap-2" key={index}>
                <img src={item.image} className="h-6 w-6" />
                <p className="text-white text-xs">{item.name}</p>
            </button>
            ))}
        </div>
      </div>
    )
  }