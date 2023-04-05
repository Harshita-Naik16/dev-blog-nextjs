import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Post from "@/components/Post";
import sortByDate from "@/utils";

export default function Home({ posts }) {
  // {console.log(posts)}
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <div className="posts container">
        {posts.map((post, index) => (
          <Post post={post} key={index}/>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // get the files in the form of array from posts directory
  const files = fs.readdirSync(path.join("posts"));

  // get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // get slug
    const slug = filename.replace(".md", "");

    // get frontmatter
    const markedFrontMatter = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markedFrontMatter);

    return {
      slug,
      frontmatter,
     };
    });

  // console.log(posts)

  return {
    props: {
      posts: posts.sort(sortByDate)
    },
  };
}
