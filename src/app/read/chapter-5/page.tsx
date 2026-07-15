import CommentForm from '@/components/CommentForm'

export const metadata = {
  title: 'Chapter 6: Nneka — The Garbage Collector | DigitalBook',
}

export default function Chapter5Page() {
  return (
    <article className="max-w-prose mx-auto">
      <header className="mb-12 md:mb-16 text-center">
        <h2 className="text-sm sm:text-base font-bold tracking-[0.2em] text-blue-600 dark:text-blue-500 uppercase mb-3">
          The Race Condition of Late-Night Echoes
        </h2>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
          Chapter 6: NNEKA — THE GARBAGE COLLECTOR
        </h1>
        <div className="h-1 w-24 bg-blue-600 rounded-full mx-auto mt-6" />
      </header>

      <div id="chapter-content">
        <h3 className="text-2xl font-bold mt-12 mb-6">I. The Exoneration</h3>
        <p className="font-serif italic text-zinc-600 dark:text-zinc-400 border-l-4 border-blue-600 pl-4 py-1 mb-6">
          IN THE COURT OF MERCY AND MENTAL SANITY<br /><br />
          SITTING AT THE DISTRICT OF RECOVERY, LAGOS<br /><br />
          Before His Honor, The Sovereign Self<br /><br />
          IN THE MATTER OF THE UNRESOLVED MEMORY LEAKS:<br /><br />
          "It is hereby declared that the Defendant, Kenechi, did not commit emotional fraud, nor did he promise a residency in a heart that was actively undergoing foreclosure. A body cannot give what it has not compiled. The interactions with Nneka were entered into under the doctrine of 'Caveat Emptor'—let the buyer beware. The Plaintiff entered the sandbox of her own free will, seeking distraction, and departed with nothing less than she brought in. Case dismissed. The record is expunged. The memory is collected."
        </p>
        <p className="first-letter:text-7xl first-letter:font-black first-letter:text-blue-600 dark:first-letter:text-blue-500 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] first-line:uppercase first-line:tracking-widest">
          I am clean. I do not carry the weight of her unfinished stories. I am starting over, fresh, with no pending background processes.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-6">II. The Ilashe Handshake</h3>
        <p>
          The Lagos rainy season had washed the city in a permanent coat of gray. It was August, and the air was thick, wet, and smelled of salty sea-breeze and burning diesel.
        </p>
        <p>
          Kenechi had been invited to a private beach house weekend in Ilashe by a tech founder friend who had just closed a $2 million seed round. The weekend was designed for "networking and decompression," which in Lagos translated to expensive tequila, speedboats, loud Afrobeats bouncing off thatched roofs, and a crowd of young, hyper-successful professionals pretending they weren't exhausted.
        </p>
        <p>
          Nneka was twenty-five, a high-fashion model and freelance brand strategist from Anambra State, currently living in a sleek, rented apartment in Lekki Phase 1. She was tall—almost matching Kenechi’s height—with a sculpted, angular face, extremely dark skin that looked like polished obsidian under the beach house lights, and a slow, deliberate way of moving that made everyone else in the room seem like they were moving in fast-forward.
        </p>
        <p>
          They met by the pool at 2:00 AM. While the rest of the party was inside screaming along to the latest Shallipopi record, Nneka was sitting on the edge of the wooden deck, her long legs dangling over the dark water, smoking a slim joint.
        </p>
        <p>
          "You've been staring at that palm tree for ten minutes," she said, without looking back at him. Her voice was a low, velvet smoke, carrying a heavy, effortless accent that sounded like Enugu-bred wealth polished by years in Lagos.
        </p>
        <p>
          Kenechi walked over, his hands tucked into the pockets of his linen trousers. "I was calculating the wind resistance. If that storm coming from the west hits sixty knots, that tree is falling directly onto the DJ setup."
        </p>
        <p>
          She laughed—a quiet, private sound that didn't share itself with the room. "And you wouldn't want that. Where would the tech boys get their soundtrack for pretending they’re happy?"
        </p>
        <p>
          "Exactly," Kenechi said, sitting down beside her. "We need the music. Otherwise, we might have to listen to our own thoughts."
        </p>
        <p>
          She turned her head, her dark eyes reflecting the flickering blue lights of the pool. "You’re Kenechi, right? The lawyer who writes code. The boys inside were talking about you. They said you’re 'scarily smart' but you look like you’re constantly planning a robbery."
        </p>
        <p>
          "Not a robbery," Kenechi smirked, taking the joint she offered him. "Just an exit strategy. From everything."
        </p>
        <p>
          "I like that," she said, leaning her head against his shoulder. Her skin was warm, a stark contrast to the cold wind blowing off the Atlantic. "Lagos is a trap. We all need an exit strategy."
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-6">III. The Architecture of the Fling</h3>
        <p>
          What followed was a three-month loop of physical indulgence that was entirely devoid of pretense.
        </p>
        <p>
          Nneka’s apartment in Lekki was an exhibition of high-end design: low-profile boucle sofas, abstract paintings by young Nigerian artists, and a sprawling bed with silk sheets that felt like cool water against the skin.
        </p>
        <p>
          They did not go on dates. They did not do Sunday brunch in Ikoyi or attend art gallery openings together. Their relationship was confined to the hours between midnight and dawn. Kenechi would drive down the Lekki-Epe Expressway after a long day of reviewing software licensing agreements, his mind numb from legal jargon and nested JSON objects, and she would open the door in her silk robes, her hair smelling of coconut oil and premium weed.
        </p>
        <p>
          The sex was visceral, athletic, and frequent. It was a mutual expulsion of stress—two young, beautiful people using each other’s bodies to quiet the screaming noise of their ambition.
        </p>
        <p>
          She would climb onto him, her long, elegant limbs locking him in, her teeth grazing his shoulder until he groaned from a mixture of pleasure and sharp, sweet pain. She was vocal, her sighs echoing off her minimalist bedroom walls, but her eyes—whenever he looked into them—remained strangely quiet. They were the eyes of a woman who was looking at something behind him, something far out at sea.
        </p>
        <p>
          They had sex multiple times a night, falling asleep with their limbs tangled, only to wake up at 6:00 AM and do it again before Kenechi had to log onto his daily standup.
        </p>
        <p>
          But the loop was executing in a memory space that was constantly being cleared.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-6">IV. The Soliloquy of the Loop</h3>
        <p>
          It was during their second month that Kenechi realized they were struggling. Not to perform—their physical chemistry was flawless—but to exist in the same space when they were clothed.
        </p>
        <p>
          One Sunday morning, after they had spent the night in a feverish, sweat-soaked haze, Kenechi woke up early. He walked to her living room, looking for his laptop charger. He found Nneka sitting on her balcony, staring at the grey concrete sprawl of Lekki. She was wearing a oversized t-shirt, her face completely bare of makeup, looking fragile and surprisingly young.
        </p>
        <p>
          He sat beside her, handing her a mug of instant coffee he had made.
        </p>
        <p>
          "Nneka," he said, his voice soft.
        </p>
        <p>
          "Yeah?" she didn't look at him.
        </p>
        <p>
          "What are we doing?"
        </p>
        <p>
          She took a slow sip of the coffee, her throat moving elegantly. "We're having sex, Kene. And we're keeping each other from going mad. Isn't that enough?"
        </p>
        <p>
          "It was," Kenechi said, feeling a strange, hollow ache in his ribs. "But sometimes I feel like I'm talking to a ghost. I’ve been inside you, Nneka. I know the rhythm of your breath. But I don't know why you look like you’re about to cry every time the room goes quiet."
        </p>
        <p>
          Nneka turned to him, her face hardening, her eyes suddenly defensive. "Kenechi, don't do this. Don't try to be the sensitive, caring boy. You don't want my secrets. If I tell you why I’m like this, you’ll feel obligated to care. And you don't have the space for that. You're busy running your firm, writing your code, and playing the smart lawyer. I’m a brand strategist—I know how to package things. Let’s keep this packaged."
        </p>
        <p>
          She stood up, leaving her coffee on the table, and walked back inside, sliding the glass door shut behind her.
        </p>
        <p>
          Kenechi sat alone on the balcony. The Lagos sun was finally breaking through the gray clouds, heating the concrete below.
        </p>
        <p>
          He soliloquized, his fingers tapping a rhythmic, nervous code against his knee.
        </p>
        <p>
          "I am running a program with a memory leak," he whispered to the empty balcony. "Every time we touch, we allocate memory. We build these small, fragile structures of intimacy. But because we have no emotional garbage collector—no shared vulnerability to clear out the old, dead thoughts—the memory just accumulates. It clogs the system.
        </p>
        <p>
          She is right. I don't want her secrets. Because if I take her secrets, I have to give her mine. I would have to tell her about the cathedral in Enugu. I would have to tell her about the blood on the couch in Samonda. I would have to admit that I am using her dark skin to blot out the light of my own failures.
        </p>
        <p>
          We are both running on empty. We are using sex as a cache clear, but the hard drive is still full of corrupt sectors. How many times can we reboot before the operating system just refuses to load?"
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-6">V. The Silent Garbage Collection</h3>
        <p>
          The end was as quiet as the beginning.
        </p>
        <p>
          They had sex one last time on a Friday night in late October. It was less frantic, almost polite, like two business partners shaking hands at the end of a long, moderately successful transaction. When it was over, Nneka lay on her side, her back to him, her breathing even.
        </p>
        <p>
          Kenechi got out of bed, dressed in the dark, and gathered his things. He looked at her sleeping form—the long, beautiful curve of her spine, the quiet rise and fall of her shoulders.
        </p>
        <p>
          He didn't wake her up. He didn't write a note. He walked out of the Lekki apartment, got into his car, and drove back to Gbagada.
        </p>
        <p>
          He deleted her number on the drive home. Not with anger, but with the quiet, clinical efficiency of a programmer running a cleanup script.
        </p>
        <p className="bg-zinc-950 text-emerald-400 p-4 rounded-lg font-mono text-sm my-6 overflow-x-auto">
          $ rm -rf /relations/nneka
        </p>
        <p>
          He never went back. She never called. They had both agreed, without a single word, that the session had expired.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-6">VI. Connection to the Next Chapter</h3>
        <p>
          He was twenty-four, and he had now run through three identical flings in less than a year. Zainab, Damilola, Nneka. Three women who had held his body but had never touched his soul. Three systems that had executed flawlessly but had left no data behind.
        </p>
        <p>
          He was beginning to hate the pattern. He was beginning to realize that his firewall was not protecting him from pain; it was protecting him from life. He was starving in a self-made prison of "no-strings-attached" logic.
        </p>
        <p>
          He needed something different. He didn't want another sprint, another MVP, or another stateless protocol.
        </p>
        <p>
          He wanted to see if he could still feel something—anything—even if it was dangerous.
        </p>
        <p>
          He opened his phone, staring at his Telegram feed. There was a new chat thread. A different name. A different state.
        </p>
        <p>
          Let us see if Chapter 7 can break the loop, or if it will finally break the developer.
        </p>

        <div className="bg-zinc-100 dark:bg-zinc-800/50 p-6 rounded-xl mt-12 mb-8 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-lg font-bold mb-2">To the Reader:</h4>
          <p className="text-zinc-600 dark:text-zinc-300 m-0">
            I put it to you, dear judge:<br />
            Is Kenechi the victim of a cynical generation, or is he the architect of his own emotional starvation? He blames Nneka for wanting to "keep things packaged," yet he was the one who walked out in the dark without even saying goodbye. Did he use her as a human garbage collector for his own stress, only to discard her when she pointed out his own emotional cowardice?
          </p>
          <p className="text-zinc-600 dark:text-zinc-300 font-medium mt-4 mb-0">
            Tell me your verdict before we boot Chapter 7 (Girl 6).
          </p>
        </div>
      </div>

      <CommentForm chapterId={5} nextChapterUrl="/read/chapter-6" />
    </article>
  )
}
