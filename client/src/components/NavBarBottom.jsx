import { useAuth } from "../hooks"
import { itemsNavBottom } from "../utils/ItemsNavBottom"
import { Link } from 'react-router-dom'


export function NavBarBottom() {

  const { isAuth } = useAuth()

    return (
      <div className="fixed z-20 bottom-0 left-0 bg-bg-dark w-full h-20 border-t border-gray-200">
        <div className="flex items-center justify-around w-full h-full">
            {itemsNavBottom.map((item, index) => (
            <Link to={isAuth ? item.href : '/auth'} className="flex flex-col items-center justify-center gap-2" key={index}>
                <img src={item.image} className="h-6 w-6" />
                <p className="text-white text-xs">{item.name}</p>
            </Link>
            ))}
        </div>
      </div>
    )
  }