import React from "react";
import Link from "next/link";

const CustomBreadcrumbs = ({ title, items, children }) => {
    return (
        <div className={'col-span-12 flex justify-between mb-2 items-center'}>
            <div className={'flex flex-col justify-start items-start'}>
                <h1 className={'text-xl font-semibold text-gray-800'}>{title}</h1>
                <div className={'flex text-sm text-gray-500 '}>
                    {items.map((item, index) => (
                        <div key={index}>
                            <Link className={'duration-200 hover:text-gray-900'} href={item.href}> {item.label} </Link>
                            {
                                index < items.length - 1 && (
                                    <span className={'mx-1'}> {'>'} </span>
                                )
                            }
                        </div>
                    ))}
                </div>
            </div>
            <div className={'flex'}>
                {children}
            </div>
        </div>
    )
}

export default CustomBreadcrumbs;
