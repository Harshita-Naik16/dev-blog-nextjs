import Link from 'next/link'
import React from 'react'

const Post = ({post}) => {
  return (
    <div className='card'>
     <img src={post.frontmatter.cover_image} alt="cover image"/>

     <h3>{post.frontmatter.title}</h3>

     <p>{post.frontmatter.date}</p>

     <p>{post.frontmatter.excerpt}</p>

     <Link href={`/blog/${post.slug}`} className='btn'>Read more</Link>
    </div>
  )
}

export default Post
