import Link from "next/link";

interface NavBarLinkProps {
    links: {
        link: string;
        label: string;
    }[]
    btnColours?: string
}

export const NavBarLinks = ({ links, btnColours = 'text-gray-700 hover:text-black hover:underline' }: NavBarLinkProps): JSX.Element => {
    return (
        <div className="flex flex-row gap-x-6 h-full">
            {links?.map((nav, i) => {
                return (
                    <Link key={i} href={nav.link}>
                        <a className={`font-light ${btnColours}  z-10 flex items-center text-sm`} aria-expanded="false">
                            {nav.label}
                        </a>
                    </Link>
                )
            })}
        </div>
    )
}