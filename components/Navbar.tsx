"use client"

import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Shirt, ShoppingCart } from 'lucide-react'
import { usePathname } from "next/navigation"
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Checkout", href: "/checkout" },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const pathname = usePathname() 
    const totalQuantity = useCartStore((state) => state.items.reduce((total,item) => total + item.quantity, 0))

    return (
        <Disclosure as="nav" className="sticky top-0 z-50 bg-gray-50 shadow-sm">
            <div className="container">
                <div className="relative flex min-h-16 items-center justify-between">
                    
                    {/* Logo */}
                    <Link href={"/"} className="flex items-center">
                        <Shirt size={25} strokeWidth={4} />
                        <p className="ms-2 text-3xl font-bold">Clothes</p>
                    </Link>

                    {/* Links */}
                    <div className="hidden sm:block">
                        <div className="flex space-x-8">
                            {navigation.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    aria-current={pathname === link.href ? "page" : undefined}
                                    className={classNames(
                                        pathname === link.href
                                            ? "text-gray-900 border-gray-600"
                                            : "text-gray-700 border-transparent hover:border-gray-600 hover:text-gray-900",
                                        "font-medium border-b-3 transition-colors duration-100"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Shopping Cart & Mobile Navbar */}
                    <div className="inset-y-0 flex items-center justify-between gap-x-3 sm:static sm:inset-auto sm:ml-6">
                        {/* Cart Icon */}
                        <Link href={"/checkout"}>
                            <button
                            type="button"
                            className="relative rounded-full p-1 text-gray-900"
                            >
                                <span 
                                    className='w-4.5 h-4.5 absolute -top-1.5 -right-2 flex items-center justify-center p-3 text-white bg-red-600 rounded-full'>
                                        {totalQuantity}
                                </span>
                                <ShoppingCart size={25} strokeWidth={2}></ShoppingCart>
                            </button>
                        </Link>

                        {/* Mobile Navbar */}
                        <div className="inset-y-0 flex items-center sm:hidden">
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md text-gray-800 hover:text-gray-900">
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-8 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-8 group-data-open:block" />
                            </DisclosureButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <Transition
                enter="transition duration-200 ease-out"
                enterFrom="opacity-0 -translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-150 ease-in"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-2"
            >
                <DisclosurePanel className="sm:hidden bg-gray-50">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {navigation.map((link) => (
                            <Link key={link.name} href={link.href}>
                                <DisclosureButton
                                    as="div"
                                    aria-current={pathname === link.href ? "page" : undefined}
                                    className={classNames(
                                        pathname === link.href
                                            ? "text-gray-900 border-gray-600"
                                            : "text-gray-700 border-transparent hover:border-gray-600 hover:text-gray-900",
                                        "block px-3 py-2 text-base font-medium border-b-3 transition-colors duration-100"
                                    )}
                                >
                                    {link.name}
                                </DisclosureButton>
                            </Link>
                        ))}
                    </div>
                </DisclosurePanel>
            </Transition>
        </Disclosure>
    )
}
export default Navbar
