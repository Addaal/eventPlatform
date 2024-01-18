import React, { startTransition, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ICateogory } from '@/lib/database/models/category.model'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { createCategory, getAllCategories } from '@/lib/actions/category.actions'



type DropdownProps = {
    value?: string
    onChangeHandler?: () => void
}

    const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {

    const [category, setCategories] = useState<ICateogory[]>([])
    const [newCategory, setNewCategory] = useState('')

    const handleAddCategory = () => {
        createCategory({
            categoryName: newCategory.trim()

        }).then((category) => {
                setCategories((prevState) =>[ ...prevState, category])
            
    })
    }

    useEffect(()=>{
        const getCategories = async () =>{
            const categoryList = await getAllCategories();
            categoryList && setCategories(categoryList as ICateogory[])
        }
    },[])
    return (

        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {category.length > 0 && category.map(category => (
                    <SelectItem key={category._id} value={category._id}>
                        {category.name}
                    </SelectItem>
                ))}
                <AlertDialog>
                    <AlertDialogTrigger className='p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500'>Add new category</AlertDialogTrigger>
                    <AlertDialogContent className='bg-white'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Category</AlertDialogTitle>
                            <AlertDialogDescription>
                               <Input type='text' placeholder='Category name' className='input-field mt-3' onChange={e => (setNewCategory(e.target.value))}/>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </SelectContent>
        </Select>


    )
}

export default Dropdown