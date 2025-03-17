import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../Components/ui/table'
const TableDemo = () => {
  return (
    

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <TableRow>
                <TableHead scope="col" className="px-6 py-3">
                    Product name
                </TableHead>
                <TableHead scope="col" className="px-6 py-3">
                    Color
                </TableHead>
                <TableHead scope="col" className="px-6 py-3">
                    Category
                </TableHead>
                <TableHead scope="col" className="px-6 py-3">
                    Price
                </TableHead>
                <TableHead scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <TableHead scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro"
                </TableHead>
                <TableCell className="px-6 py-4">
                    Silver
                </TableCell>
                <TableCell className="px-6 py-4">
                    Laptop
                </TableCell>
                <TableCell className="px-6 py-4">
                    $2999
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </TableCell>
            </TableRow>
            <TableRow className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <TableHead scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </TableHead>
                <TableCell className="px-6 py-4">
                    White
                </TableCell>
                <TableCell className="px-6 py-4">
                    Laptop PC
                </TableCell>
                <TableCell className="px-6 py-4">
                    $1999
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </TableCell>
            </TableRow>
            <TableRow className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <TableHead scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </TableHead>
                <TableCell className="px-6 py-4">
                    Black
                </TableCell>
                <TableCell className="px-6 py-4">
                    Accessories
                </TableCell>
                <TableCell className="px-6 py-4">
                    $99
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</div>

  )
}

export default TableDemo
