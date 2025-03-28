// import { Logo } from '@/server/Logo';
import { NavLink } from '@/components/ui/NavLink';

import { Logo } from '../Logo';
import { UserNav } from '@/components/client/UserNav';
import { getHeaderMenu } from '@/actions/get-header-menu';


export async function TopNav({ menu }) {
  const menus = await getHeaderMenu();

  return (
    <nav className="w-full bg-white min-h-24 py-4 px-4">
      <ul className="max-w-screen-lg m-auto w-full flex flex-row gap-x-4 justify-end items-center">
        {/* <Logo className="mr-auto" />
        {menu.map((item, i) => (
          <li key={i} className="group">
            <NavLink href={item.href}>
              {item.label}
            </NavLink>
          </li>
        ))} */}
        <UserNav menus ={menus} />
      </ul>
    </nav>
  )
}