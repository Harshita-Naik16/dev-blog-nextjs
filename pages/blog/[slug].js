import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';

const PostPage = ({frontmatter: {title, date, cover_image}, slug, content}) => {

  return (
    <>
    <div className='container'>
      <Link href="/">
          <button className='btn btn-back'>Go Back</button>
      </Link>

      <div className='card card-page'>
        <h1 className='post-title'>{title}</h1>
        <p className='post-date'>Posted on {date}</p>
        <img src={cover_image} alt="image"/>
        <div className='post-body'>
          <div dangerouslySetInnerHTML={{__html: marked(content)}}></div>
        </div>
      </div>
    </div>
      
    </>
  )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'));

    const paths = files.map(filename => ({
        params: {
            slug: filename.replace(".md", "")
        }
    }))
    // console.log(paths)

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params: {slug}}) {
    const markedFrontMatter = fs.readFileSync(path.join('posts', slug + ".md"), 'utf-8')

    const {data:frontmatter, content} = matter(markedFrontMatter)

    return {
        props: {
          frontmatter,
          slug,
          content
        }
    }
}

export default PostPage
