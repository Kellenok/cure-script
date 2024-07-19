import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cure Dolly",
  description: "in markdown",
  srcDir: 'docs',
  base: '/cure-script/',
  markdown: {
    image: {
      // image lazy loading is disabled by default
      lazyLoading: true
    }
  },
  head: [
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
    ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    [
      'link',
      { rel: 'icon', href: '/cure-script/favicon.ico' }
    ],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet', rel: 'stylesheet' }
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' }
    ],

    sidebar: [
      {
        text: 'About',
        collapsed: false,
        items: [
          { text: 'Intro', link: '/about' },
          { text: 'From original Docs', link: '/original' }
        ]
      },
      { 
        text: 'Basic Sentence Structure and Core Grammar',
        collapsed: false,
        items: [
          {
            text: '1. The Basic Types Of Sentences',
            link: '/1-the-basic-types-of-sentences'
          },
          {
            text: '2. The Invisible Carriage And The を Particle',
            link: '/2-the-invisible-carriage-and-the-を-particle'
          },
          { text: '3. The は Particle', link: '/3-the-は-particle' },
          {
            text: '4. Japanese Verb Tenses',
            link: '/4-japanese-verb-tenses'
          },
          {
            text: '5. Verb Groups And The て Form',
            link: '/5-verb-groups-and-the-て-form'
          },
          { text: '6. Adjectives', link: '/6-adjectives' },
          {
            text: '7. Negative Forms And Adjectives In Past Tense',
            link: '/7-negative-forms-and-adjectives-in-past-tense'
          },
          { text: '7.5. Conjugation', link: '/7-5-conjugation' },
          {
            text: '8. The に And へ Particles',
            link: '/8-the-に-and-へ-particles'
          },
          {
            text: '8b. Particles Exlained',
            link: '/8b-particles-explained'
          },
          {
            text: '9. The Subject Of The Japanese Sentence Expressing Desire ほしい たい たがる',
            link: '/9-the-subject-of-the-japanese-sentence-expressing-desire-ほしい-たい-たがる'
          },
          {
            text: '10. Helper Verbs The Potential Helper Verb',
            link: '/10-helper-verbs-the-potential-helper-verb'
          },
          {
            text: '11. Compound Sentences くれる あげる And More Uses Of The て Form',
            link: '/11-compound-sentences-くれる-あげる-and-more-uses-of-the-て-form'
          },
          {
            text: '12. Quotation Particle と Compound Verbs Nouns',
            link: '/12-quotation-particle-と-compound-verbs-nouns'
          },
          {
            text: ' 13. Passive Conjugation Receptive Helper Verb',
            link: '/13-passive-conjugation-receptive-helper-verb'
          },
          {
            text: ' 14. Adverbs And The も Particle',
            link: '/14-adverbs-and-the-も-particle'
          },
          {
            text: ' 15. Transitive Intransitive Verbs',
            link: '/15-transitive-intransitive-verbs'
          },
          {
            text: ' 16. てみる や Particle から Particle Exclusive And',
            link: '/16-てみる-や-particle-から-particle-exclusive-and'
          },
          {
            text: ' 17. Polite Japanese And The Volitional',
            link: '/17-polite-japanese-and-the-volitional'
          },
          {
            text: ' 18. って は Mysteries Explained おうとする とする として という っていう',
            link: '/18-って-は-mysteries-explained-おうとする-とする-として-という-っていう'
          },
          {
            text: ' 19. Causative Causative Receptive',
            link: '/19-causative-causative-receptive'
          },
          {
            text: ' 20. Directionals それ その そんな そう Etc',
            link: '/20-directionals-それ-その-そんな-そう-etc'
          },
        ]
      },
      { 
        text: 'Advanced Grammar and Expressions',
        collapsed: false,
        items: [
          { text: ' 21. てある ている ておく', link: '/21-てある-ている-ておく' },
          { text: ' 22. ては ても', link: '/22-ては-ても' },
          { text: ' 23. だって だから それから', link: '/23-だって-だから-それから' },
          {
            text: ' 24. Hearsay Guesses そう そうだ そうです',
            link: '/24-hearsay-guesses-そう-そうだ-そうです'
          },
          {
            text: ' 25. らしい Vs そうだ そうです っぽい Ppoi',
            link: '/25-らしい-vs-そうだ-そうです-っぽい-ppoi'
          },
          {
            text: ' 26. Similes ようだ のように のような みたい',
            link: '/26-similes-ようだ-のように-のような-みたい'
          },
          { text: ' 27. ばかり', link: '/27-ばかり' },
          {
            text: ' 28. ように One Key To All The Main Uses',
            link: '/28-ように-one-key-to-all-the-main-uses'
          },
          { text: ' 29. ことにする ことになる', link: '/29-ことにする-ことになる' },
          {
            text: ' 30. Japanese Conditionals と',
            link: '/30-japanese-conditionals-と'
          },
          {
            text: ' 31. The ば れば Conditional',
            link: '/31-the-ば-れば-conditional'
          },
          {
            text: ' 32. The たら なら Conditionals',
            link: '/32-the-たら-なら-conditionals'
          },
          {
            text: ' 33. Limiting Terms だけ しか ばかり のみ',
            link: '/33-limiting-terms-だけ-しか-ばかり-のみ'
          },
          {
            text: ' 34. Understand Any Sentence',
            link: '/34-understand-any-sentence'
          },
          { text: ' 35. より のほう 一方', link: '/35-より-のほう-一方' },
          {
            text: ' 36. 所 The Concept Of Place',
            link: '/36-所-the-concept-of-place'
          },
          {
            text: ' 37. New Structure Secrets な Vs の なる たる Adjectives',
            link: '/37-new-structure-secrets-な-vs-の-なる-たる-adjectives'
          },
          {
            text: ' 38. When It Isn T Means It Is じゃない ではない',
            link: '/38-when-it-isn-t-means-it-is-じゃない-ではない'
          },
          {
            text: ' 39. The か Particle Buried Questions かな もんか かどうか',
            link: '/39-the-か-particle-buried-questions-かな-もんか-かどうか'
          },
          {
            text: ' 40. 3 Pitfalls In Japanese And How To Avoid Them',
            link: '/40-3-pitfalls-in-japanese-and-how-to-avoid-them'
          },
        ]
      },
      { 
        text: 'Language Learning Strategies and Sentence Analysis',
        collapsed: false,
        items: [
          {
            text: ' 41. 5 Key Facts About The Basic Structure Of Japanese',
            link: '/41-5-key-facts-about-the-basic-structure-of-japanese'
          },
          {
            text: ' 42. Basic Word Confusion まま',
            link: '/42-basic-word-confusion-まま'
          },
          {
            text: ' 43. Paradigm Shift Cut Through The Confusion',
            link: '/43-paradigm-shift-cut-through-the-confusion'
          },
          {
            text: ' 44. How To Use Natural Japanese ちゃう ちゃった',
            link: '/44-how-to-use-natural-japanese-ちゃう-ちゃった'
          },
          {
            text: ' 45. First Step Guide Into Self Immersion Technique',
            link: '/45-first-step-guide-into-self-immersion-technique'
          },
          {
            text: ' 46. Word Order Matters 2 Simple Rules To Crack Tough Sentences',
            link: '/46-word-order-matters-2-simple-rules-to-crack-tough-sentences'
          },
          {
            text: ' 47. How To Understand Japanese Your Secret Weapon For Breaking Down Sentences',
            link: '/47-how-to-understand-japanese-your-secret-weapon-for-breaking-down-sentences'
          },
          {
            text: ' 48. Dealing With Ambiguity In Japanese',
            link: '/48-dealing-with-ambiguity-in-japanese'
          },
          {
            text: ' 49. Japanese Point Of View Deconfused もらう てもらう',
            link: '/49-japanese-point-of-view-deconfused-もらう-てもらう'
          },
          {
            text: ' 50. 2 Aspects Of Japanese That Foreigners Can T Fathom させてもらう Last Secret Of The Potential',
            link: '/50-2-aspects-of-japanese-that-foreigners-can-t-fathom-させてもらう-last-secret-of-the-potential'
          },
          {
            text: ' 51. How To Read A Japanese 怪談 かいだん Ghost Story',
            link: '/51-how-to-read-a-japanese-怪談-かいだん-ghost-story'
          },
          {
            text: ' 52. In Depth Japanese Sentence Analysis In Real Native Context',
            link: '/52-in-depth-japanese-sentence-analysis-in-real-native-context'
          },
          {
            text: ' 53. Enjoy Japanese Horror In Japanese',
            link: '/53-enjoy-japanese-horror-in-japanese'
          },
          {
            text: ' 54. Irregularities How They Work 見る 見られる 見れる 見える 聞く 聞ける 聞こえる',
            link: '/54-irregularities-how-they-work-見る-見られる-見れる-見える-聞く-聞ける-聞こえる'
          },
          {
            text: ' 55. Secrets Of The で Particle Why Do We Say みんなで行く And 世界で一番',
            link: '/55-secrets-of-the-で-particle-why-do-we-say-みんなで行く-and-世界で一番'
          },
          {
            text: ' 56. Agility Deeper Secrets Of は And の Particles',
            link: '/56-agility-deeper-secrets-of-は-and-の-particles'
          },
          {
            text: ' 57. 込む Komu And The Secret Of Multi Meaning Japanese Words',
            link: '/57-込む-komu-and-the-secret-of-multi-meaning-japanese-words'
          },
          {
            text: ' 58. Japanese Double Particles How They Work',
            link: '/58-japanese-double-particles-how-they-work'
          },
          {
            text: ' 59. Untranslatable Japanese Exists How To Understand It',
            link: '/59-untranslatable-japanese-exists-how-to-understand-it'
          },
          {
            text: ' 60. The Other Half Of Japanese Structure Non Logical Topic Comment Structure',
            link: '/60-the-other-half-of-japanese-structure-non-logical-topic-comment-structure'
          },
        ]
      },
      { 
        text: 'Advanced Topics and Cultural Context',
        collapsed: false,
        items: [
          {
            text: ' 61. は And が The Deeper Secrets The Yin Yang Structure Of Japanese',
            link: '/61-は-and-が-the-deeper-secrets-the-yin-yang-structure-of-japanese'
          },
          {
            text: ' 62. ておく Vs てしまう Helper Verb Secrets',
            link: '/62-ておく-vs-てしまう-helper-verb-secrets'
          },
          {
            text: ' 63. Wild Sentence Enders In Real Life Japanese かい だい ぜ ぞ さ から し ちょうだい',
            link: '/63-wild-sentence-enders-in-real-life-japanese-かい-だい-ぜ-ぞ-さ-から-し-ちょうだい'
          },
          {
            text: ' 64. Things Get Strange もの And こと Advanced Secrets ものだ ことがある こと As Sentence Ender',
            link: '/64-things-get-strange-もの-and-こと-advanced-secrets-ものだ-ことがある-こと-as-sentence-ender'
          },
          {
            text: ' 65. Coming And Going Deeper Secrets Of 行く And 来る て行くAnd て来る Te Iku Te Kuru',
            link: '/65-coming-and-going-deeper-secrets-of-行く-and-来る-て行くand-て来る-te-iku-te-kuru'
          },
          {
            text: ' 66. Hidden Subjects In Japanese And How To Understand Them',
            link: '/66-hidden-subjects-in-japanese-and-how-to-understand-them'
          },
          {
            text: ' 67. もう And まだ The Time Relations That Make Sense Of Them',
            link: '/67-もう-and-まだ-the-time-relations-that-make-sense-of-them'
          },
          {
            text: ' 68. Japanese Underlying Logic わけ そういうわけ わけが分からない わけない',
            link: '/68-japanese-underlying-logic-わけ-そういうわけ-わけが分からない-わけない'
          },
          {
            text: ' 69. Japanese In The Wild Tackling Native Japanese Material 怪談 4',
            link: '/69-japanese-in-the-wild-tackling-native-japanese-material-怪談-4'
          },
          {
            text: ' 70. かける かかる All Purpose Japanese Explained',
            link: '/70-かける-かかる-all-purpose-japanese-explained'
          },
          {
            text: ' 71. Japanese Counters 3 Simple Rules',
            link: '/71-japanese-counters-3-simple-rules'
          },
          {
            text: ' 72. The Great Connector い Stem Magic',
            link: '/72-the-great-connector-い-stem-magic'
          },
          {
            text: ' 73. Secrets Of 気 気になる 気にする 気がする 気に入る Etc',
            link: '/73-secrets-of-気-気になる-気にする-気がする-気に入る-etc'
          },
          {
            text: ' 74. Love And Other Mysteries Of こと あなたのことが好き 私のことが嫌い ということ そういうこと どういうこと そんなこと',
            link: '/74-love-and-other-mysteries-of-こと-あなたのことが好き-私のことが嫌い-ということ-そういうこと-どういうこと-そんなこと'
          },
          {
            text: ' 75. Japanese Is Not English How Expression Strategies Differ Polite 英本語 Rude Japanese',
            link: '/75-japanese-is-not-english-how-expression-strategies-differ-polite-英本語-rude-japanese'
          },
          {
            text: ' 76. The Right Opening あく あける ひらく ひらける 開く 開け',
            link: '/76-the-right-opening-あく-あける-ひらく-ひらける-開く-開け'
          },
          {
            text: ' 77. Real Japanese Structure Vs Tae Kim Structural Review Of Tae Kim S Japanese Grammar',
            link: '/77-real-japanese-structure-vs-tae-kim-structural-review-of-tae-kim-s-japanese-grammar'
          },
          {
            text: ' 78. Breaking The Core Tae Kim Vs The Copula Japanese Structure Based Critical Review',
            link: '/78-breaking-the-core-tae-kim-vs-the-copula-japanese-structure-based-critical-review'
          },
          {
            text: ' 79. Deeper Secret Of The Copula',
            link: '/79-deeper-secret-of-the-copula'
          },
          {
            text: ' 80. Dropped Particles Casual Omissions',
            link: '/80-dropped-particles-casual-omissions'
          },
        ]
      },
      { 
        text: 'Fine-tuning Your Japanese',
        collapsed: false,
        items: [
          {
            text: ' 81. Global Principle Of All Japanese Word Forms',
            link: '/81-global-principle-of-all-japanese-word-forms'
          },
          {
            text: ' 82. なんて なんか など 3 Common Words Clarified',
            link: '/82-なんて-なんか-など-3-common-words-clarified'
          },
          {
            text: ' 83. Three Levels Of Command In Japanese て Form Commands なさい な Commands Imperative Form',
            link: '/83-three-levels-of-command-in-japanese-て-form-commands-なさい-な-commands-imperative-form'
          },
          {
            text: ' 84. である And The Structure Of Japanese What Older Copulas Tell Us である であります でござる でございます',
            link: '/84-である-and-the-structure-of-japanese-what-older-copulas-tell-us-である-であります-でござる-でございます'
          },
          {
            text: ' 85. まい The Negative Helper',
            link: '/85-まい-the-negative-helper'
          },
          { text: ' 86. 次第 Shidai', link: '/86-次第-shidai' },
          {
            text: ' 87. Japanese Structure Inverted Strange Life Of しか',
            link: '/87-japanese-structure-inverted-strange-life-of-しか'
          },
          { text: ' 88. Xをしたい Vs Xがしたい', link: '/88-xをしたい-vs-xがしたい' },
          {
            text: ' 89. De Mystifying Japanese The Universal Subject',
            link: '/89-de-mystifying-japanese-the-universal-subject'
          },
          {
            text: ' 90. Japanese Punctuation How It Works',
            link: '/90-japanese-punctuation-how-it-works'
          },
          {
            text: ' 91. Outer Limits 限る 限り Its Many Meanings And How They Work 知っている限り とは限らない And More',
            link: '/91-outer-limits-限る-限り-its-many-meanings-and-how-they-work-知っている限り-とは限らない-and-more'
          },
          {
            text: ' 92. Will English Eat Japanese Loan Word Invasion Is It Really A Threat',
            link: '/92-will-english-eat-japanese-loan-word-invasion-is-it-really-a-threat'
          },
          {
            text: ' 93. Cussin Em Out With くせに How It Works',
            link: '/93-cussin-em-out-with-くせに-how-it-works'
          },
          { text: ' 94. くらい Vs ほど', link: '/94-くらい-vs-ほど' },
          {
            text: ' 95. Using Word History The Smart Way どうも やっぱり やはり',
            link: '/95-using-word-history-the-smart-way-どうも-やっぱり-やはり'
          },
          {
            text: ' 96. 通り And せっかく A Metaphorical Road And An Untranslatable Word',
            link: '/96-通り-and-せっかく-a-metaphorical-road-and-an-untranslatable-word'
          },
          {
            text: ' 97. The Meanings Of うち Home Self Social Boundary Time Marker いまのうち そのうち',
            link: '/97-the-meanings-of-うち-home-self-social-boundary-time-marker-いまのうち-そのうち'
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Kellenok/cure-script' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Created by <a href="https://bento.me/kln">Kellen</a>',
      copyright: 'Originally transripted by <a href="https://docs.google.com/document/d/1XpuXerkGU8waJ4DPDNJA4bGeqOvM-csXjTe57iHARHc">nunko/dinuz</a>.'
    }

    
  }
}

)