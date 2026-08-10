import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { useFetch } from '@/hooks/useFetch'
// import { getEvn } from '@/helpers/getEnv'
// import Loading from '@/components/Loading'
// import { FiEdit } from "react-icons/fi";
// import { FaRegTrashAlt } from "react-icons/fa";
import { RouteBlogAdd } from '@/helpers/RouteName'

const BlogDetails = () => {
  return (
   <div>
         <Card>
           <CardHeader>
             <div>
               <Button asChild>
                 <Link to={RouteBlogAdd}>Add Blog</Link>
               </Button>
             </div>
           </CardHeader>
   
           <CardContent>
   
             <Table>
   
               <TableHeader>
                 <TableRow>
                   <TableHead>Author </TableHead>
                   <TableHead>Category </TableHead>
                   <TableHead>Title </TableHead>
                   <TableHead>Slug </TableHead>
                   <TableHead>Dated </TableHead>
   
                   <TableHead>Action</TableHead>
                 </TableRow>
               </TableHeader>
   
               <TableBody>
                 {/* {categoryData && categoryData.category.length > 0 ?
                   categoryData.category.map(category =>
                     <TableRow key={category._id}>
                       <TableCell>{category.name}</TableCell>
                       <TableCell>{category.slug}</TableCell>
   
                       <TableCell className="flex gap-3">
                         <Button variant="outline" className="hover:bg-violet-500 hover:text-white" asChild>
                           <Link to={RouteEditCategory(category._id)}>
                             <FiEdit />
                           </Link>
                         </Button>
   
                         <Button onClick={() => handleDelete(category._id)} variant="outline" className="hover:bg-violet-500 hover:text-white" >
                           <FaRegTrashAlt />
                         </Button>
                       </TableCell>
                     </TableRow>
                   )
                   :
                   <TableRow>
                     <TableCell colSpan="3">
                       Data not found.
                     </TableCell>
                   </TableRow>
                 } */}
               </TableBody>
             </Table>
           </CardContent>
         </Card>
       </div>
  )
}

export default BlogDetails