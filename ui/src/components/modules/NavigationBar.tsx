import React, { Fragment } from "react";  
import { NextPage } from "next";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, PlusIcon, XIcon } from '@heroicons/react/outline'
import { AppNavigation } from "../../utils/navigations";
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link';
import { useRouter } from 'next/router'


function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

interface NavigationBarProps {
  navigation?: any[]
}

export const NavigationBar: NextPage<NavigationBarProps> = ({
    navigation = AppNavigation
}) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const user = (session ? session.user : null);
  return (

<Disclosure as="nav" className="bg-gray-900 py-6">
{({ open }) => (
    <>
        <nav className="max-w-7xl mx-auto px-8" aria-label="Global">
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href="#">
                  <span className="sr-only">DigitalM</span>
                  <div className="h-10 w-10 bg-indigo-500 rounded"></div>
                </a>
                <div className="-mr-2 flex items-center md:hidden">

                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                    </Disclosure.Button>

                </div>
              </div>
              <div className="hidden space-x-4 md:flex md:flex-1 md:ml-10">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.path}>
                      <a
                        className={classNames(
                          (item.path == router.pathname) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'transition px-4 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.path == router.pathname ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}                  
              </div>
            
            { user ? (
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  <Link href="/product/create">
                    <a
                      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
                      <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />                    
                      <span>Add Product</span>
                    </a>
                  </Link>
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-4 relative z-10">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="flex text-sm rounded-full p-1 transition bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" 
                                 src={(user.image ?? `https://ui-avatars.com/api/?name=${user.name}`)} 
                                 alt={user.name ?? ''} />
                            <span className="text-white px-4 my-auto font-semibold">{user.name}</span>
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                              <Menu.Item key="profile">
                                {({active}) => (
                                  <button
                                      className={classNames(
                                        active ? "bg-gray-200" : null,
                                        "block px-4 py-2 text-sm text-gray-700 w-full text-left")}
                                      onClick={() => router.push(`/user/${user.name}`)}
                                  >  
                                    View profile
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item key="signout">
                                {({active}) => (
                                  <button
                                    type="submit"
                                    
                                    onClick={() => signOut({
                                      callbackUrl: `${window.location.origin}`
                                    })}
                                    className={classNames(
                                      active ? "bg-gray-200" : null,
                                      "block px-4 py-2 text-sm text-gray-700 w-full text-left")}
                                  >  
                                    Sign out
                                  </button>
                                )}
                              </Menu.Item>

                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
            ) : (
                <div className="hidden md:flex md:items-center md:space-x-6">
                {/* TODO: change callbackurl */}
                {/* <button type="submit" 
                        disabled={loading}
                        onClick={() => signIn('cognito', {
                          callbackUrl: `${window.location.origin}`
                        })}
                        className="mr-4 text-base font-medium text-white hover:text-gray-300">
                    Log in
                </button> */}
                <button type="submit"
                        disabled={loading}
                        onClick={() => signIn('cognito', {
                          callbackUrl: `${window.location.origin}`
                        })}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600">
                    Sign in
                </button>
                </div>)
            }
            </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-0 py-3 space-y-2 lg:px-3">
              {navigation.map((item) => (
                <Link key={item.name} href={item.path}>
                  <a
                    className={classNames(
                      (item.path == router.pathname) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.path == router.pathname ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
            { user ? (
                <div className="py-3 border-t border-gray-700">
                    <div className="flex items-center pt-4">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" 
                                 src={(user.image ?? `https://ui-avatars.com/api/?name=${user.name}`)} 
                                 alt={user.name ?? ''} />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium text-white">{user.name}</div>
                            <div className="text-sm font-medium text-gray-400">{user.email}</div>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <button
                          className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                          onClick={() => router.push(`/user/${user.name}`)}>  
                        View profile
                      </button>
                      <button
                          type="submit"
                          disabled={loading}
                          onClick={() => signOut({
                            callbackUrl: `${window.location.origin}`
                          })}
                          className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >  
                        Sign Out
                      </button>                    
                    </div>
                </div>
            ) : (
                <div className="py-3 border-t border-gray-700">
                    <div className="space-y-2 lg:px-3">
                        {/* <a href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            Sign up
                        </a> */}
                        <button type="submit"
                                disabled={loading}
                                onClick={() => signIn('cognito', {
                                  callbackUrl: `${window.location.origin}`
                                })}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600">
                            Sign in
                        </button>                        
                    </div>
                </div>
            ) }
          </Disclosure.Panel>

        </nav>
    </>
)}
</Disclosure>

    )
}