import { useParams } from 'react-router-dom'
import BlogHero from './BlogHero/BlogHero'
import BlogContent from './BlogContent/BlogContent'
import RecentArticles from './RecentArticles/RecentArticles'

export default function BlogDetails() {
    const { id } = useParams<{ id: string }>()

    return (
        <>
            <BlogHero />
            {id && <BlogContent postId={id} />}
            {id && <RecentArticles postId={id} />}
        </>
    )
}