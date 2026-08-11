import Loading from '@/components/Loading'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getEvn } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useParams } from 'react-router-dom'
import { decode } from 'entities'

const SingleBlogDetails = () => {

    const { category, blog } = useParams()

    const { data, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/get-blog/${blog}`, {
        method: 'get',
        credentials: 'include'
    }, [`${getEvn('VITE_API_BASE_URL')}/blog/get-blog/${blog}`])

    if (loading) return <Loading />

    if (error) return <div className='text-red-500'>Error: {error.message}</div>

    return (
        <div className='flex justify-between gap-20'>

            {data && data.blog &&
                <>
                    <div className='border rounded w-[70%] p-5'>
                        <h1 className='text-2xl font-bold mb-5'>{data.blog.title}</h1>

                        <div className="flex justify-between items-center">
                            <div className="flex justify-between items-center gap-5">
                                <Avatar>
                                    <AvatarImage src={data.blog.author.avatar} />
                                </Avatar>
                                <span>{data.blog.author.name}</span>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className='my-5'>
                            <img src={data.blog.featuredImage} className='rounded' />
                        </div>

                        <div dangerouslySetInnerHTML={{ __html: decode(data.blog.blogContent) || '' }}>

                        </div>
                    </div>
                </>
            }

            <div className='border rounded w-[30%]'></div>
        </div>
    )
}

export default SingleBlogDetails