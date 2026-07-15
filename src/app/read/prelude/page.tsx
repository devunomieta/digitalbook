import CommentForm from '@/components/CommentForm'

export const metadata = {
  title: 'Prelude | DigitalBook',
}

export default function PreludePage() {
  return (
    <article className="max-w-prose mx-auto">
      <header className="mb-12 md:mb-16 text-center">
        <h2 className="text-sm sm:text-base font-bold tracking-[0.2em] text-blue-600 dark:text-blue-500 uppercase mb-3">
          The Architecture of Uncompiled Hearts
        </h2>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
          Prelude
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium italic mb-6">
          The Binary of the Brief: An Inquiry into Loneliness
        </p>
        <div className="h-1 w-24 bg-blue-600 rounded-full mx-auto" />
      </header>

      <div id="chapter-content">
        <p className="first-letter:text-7xl first-letter:font-black first-letter:text-blue-600 dark:first-letter:text-blue-500 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] first-line:uppercase first-line:tracking-widest">
          There is a distinct, mocking rhythm to the hum of a ceiling fan in a Yaba apartment. It slices through the heavy, humid air of a Lagos midnight, a monotonous swish-swish-swish that sounds suspiciously like the ticking of a clock that has lost its mind.
        </p>
        <p>
          At twenty-four, Kenechi sat at the intersection of two worlds that demanded absolute order but yielded only chaos. To his left lay a stack of leather-bound law reports, their pages smelling of old dust, dried ink, and the rigid, unyielding logic of judicial precedent. To his right, the cool glow of a dual-monitor setup illuminated lines of TypeScript—neat, nested blocks of code where every opened bracket had to be closed, where every variable had to be declared, and where an error was never an emotional betrayal, but merely a syntax issue waiting to be debugged.
        </p>
        <p>
          But how do you debug a heart that keeps throwing unhandled exceptions?
        </p>
        <p>
          Kenechi had just completed his National Youth Service Corps (NYSC) year. The faded white shorts and the crested khaki jacket were folded away in his wardrobe like the relics of a brief, mandatory dream. He was now, legally and socially, an adult. A smart lawyer who could draft a watertight non-disclosure agreement in his sleep, and a full-stack engineer who could build a scalable database before his morning coffee grew cold. He possessed the intellectual tools to dissect the world, yet he felt entirely unarmed against the quiet, creeping vacuum of his own room.
        </p>
        <p>
          He stood up, his tall, lean frame casting a long shadow against the white-painted wall. He walked to the window, pushing the faded curtains aside. Outside, Lagos did not sleep; it merely panted. The yellow headlights of occasional Danfo buses streaked across the damp tarmac of Herbert Macaulay Way.
        </p>
        <p>
          He soliloquized, his voice a low, raspy baritone that barely carried past his own teeth.
        </p>
        <p>
          "We build systems," he muttered, pressing his forehead against the cool glass. "We write contracts to prevent breach. We write test cases to prevent failure. But we enter love without a single assertion. We jump into the compiler and pray we don't crash. Why do I keep jumping?"
        </p>
        <p>
          In his imagination, love was supposed to be a beautifully refactored codebase. It was supposed to be a joint tenancy—an estate in fee simple where two souls held an undivided interest with the right of survivorship. He had imagined a woman who would look at his complexities not as bugs to be patched, but as features to be understood. He wanted a love that felt like a successful deployment on a Friday afternoon—smooth, stable, and quiet.
        </p>
        <p>
          Instead, his twenties had become a series of sandboxed environments. Ten different women. Ten different branches of code that had failed to merge into his main trunk.
        </p>
        <p>
          He felt a deep, biting loneliness that was not merely the absence of a body in his bed, but the absence of a shared vocabulary. He was tired of explaining his metaphors. He was tired of translating his silences. He wanted to be known, not just negotiated with. He needed someone who could sit in the silence between his legal arguments and his line-by-line compilations and know exactly what he was trying to say.
        </p>
        <p>
          He turned back to his desk, looking at a small, framed photograph of his younger self at eighteen—thin, eager-eyed, standing in the courtyard of a Catholic church in Enugu. The boy in the photo did not know about stack traces or the law of torts. He only knew the warmth of a hand that had since crossed an ocean.
        </p>
        <p>
          "Let us begin from the beginning," Kenechi whispered to the empty room, opening a new document on his screen. "Let us look at the evidence. Let us compile the first branch."
        </p>
      </div>

      <CommentForm chapterId={0} nextChapterUrl="/read/chapter-1" />
    </article>
  )
}
