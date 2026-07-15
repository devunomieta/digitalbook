import CommentForm from '@/components/CommentForm'

export const metadata = {
  title: 'Prelude | DigitalBook',
}

export default function PreludePage() {
  return (
    <article className="max-w-prose mx-auto">
      <header className="mb-12 md:mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
          Prelude
        </h1>
        <div className="h-1 w-24 bg-blue-600 rounded-full mx-auto" />
      </header>

      <div className="prose prose-zinc dark:prose-invert prose-lg md:prose-xl mx-auto space-y-6 leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p className="italic text-zinc-500">
          [Full Prelude text will go here once provided]
        </p>
      </div>

      <CommentForm chapterId={0} nextChapterUrl="/read/chapter-1" />
    </article>
  )
}
