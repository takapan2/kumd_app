//gradeは '1':'1回生', '2':'2回生', '3':'3回生', '4':'4回生', '5':'その他', '6':'合作'。
//sizeは '1':'B4', '2':'B5', '3':'その他'。
//イラスト展示は例年の規則に従って一回生から飾っていく。また、大きさは大きい順に飾る（その他は最後）。

exports.userInformation = [
    { grade: "1", size: "1", title: "秋の女の子", penname: "ねこ野", image: "1", caption: "秋らしさをイメージした女の子を描きました。秋らしいファッションにこだわりました。", },
    { grade: "2", size: "2", title: "戦闘態勢", penname: "デンジ", image: "2", caption: "武装を展開し戦闘モードになった女の子を描きました。こだわりは殺気を感じさせるような緊張感を作り出したところです。", },
    { grade: "3", size: "3", title: "ゆっくり歩こう", penname: "めんたいこ", image: "3", caption: "優雅に投稿する天才少年。せわしないイメージのある投稿に対して亀型ロボットを起用することでゆっくりさを演出しました。", },
    { grade: "4", size: "1", title: "タコ八角", penname: "日本酒", image: "4", caption: "配色にこだわり、パキッと画面全体を引き締めるような印象を与えるような作品に仕上げることができました。", },
    { grade: "5", size: "3", title: "あおねこ天使", penname: "ラッキー", image: "5", caption: "オシャレ！青！猫！天使！", },
    { grade: "6", size: "1", title: "新歓看板", penname: "とまと なす じゃがいも", image: "6", caption: "下書きや線画、塗りなどをそれぞれ分担して作品を仕上げました。漫画風のイラストを作ること一眼を引けるような内容にしました。", },
    { grade: "1", size: "1", title: "アイボウ", penname: "たこわさ", image: "7", caption: "幼なじみで息ぴったりの二人組。しかし、そんな彼らに降りかかる災難を誰一人として知る由はなかった。", },
    { grade: "2", size: "2", title: "ハッピーニューイヤー！", penname: "goo", image: "8", caption: "新年、あけましておめでとう！今年は丑年！ハッピーニューイヤー！！", },
    { grade: "2", size: "3", title: "魅せられて", penname: "ジュディ", image: "9", caption: "美しくなると怖くなる若さによく似た真昼の蜃気楼。", },
    { grade: "2", size: "1", title: "シクラメンのかほり", penname: "アキラ", image: "10", caption: "真綿色シクラメンほど清しいものはない。出会いの時の君のようです。寂しささえ置き去りにして愛がいつの間にか歩き始めました。", },
    { grade: "2", size: "2", title: "夢想花", penname: "鈴蘭", image: "11", caption: "春をイメージした女の子を描きました。SUSHIカバンがチャームポイントです。", },
    { grade: "4", size: "1", title: "夏の天使", penname: "アイス", image: "12", caption: "夏をイメージした女の子を描きました。", },
    { grade: "5", size: "3", title: "水色の雨", penname: "八神JUN", image: "13", caption: "咎める言葉なら素直に聞けたわ。微笑んでいただけの懐かしい日々。日づついたそのぶん寂しい目をしてた。戻れない。戻れないあの日の二人には。", },
    { grade: "5", size: "1", title: "WOW!", penname: "とまといぷー", image: "14", caption: "犬好きな女の子。動物に好かれる人に悪い人はいない。", },
    { grade: "4", size: "2", title: "ゆめかわキラキラ", penname: "うじまめ", image: "15", caption: "小売のように冷ややかな髪にルビーのような赤い瞳。彼女にゆるふわで勝るものはいない。", },
    { grade: "4", size: "1", title: "風をあつめて", penname: "ロンバケ", image: "16", caption: "とても素敵な朝開け土器を通り抜けてたら伽藍とした防波堤越しに緋色の帆を掲げた都市が船舶してるのが見えたんです。", },
    { grade: "4", size: "3", title: "HAPPY HALLOWEEN", penname: "だいふく", image: "17", caption: "お菓子をくれなきゃいたずらするぞということで幽霊の男の子を描きました。", },
    { grade: "2", size: "1", title: "いとしのエリー", penname: "サザン", image: "18", caption: "泣かしたこともある。冷たくしてもなお寄り添う気持ちがあればいいのさ。俺にしてみりゃ、これで最後のLady エリー my love so sweet!", },
    { grade: "3", size: "1", title: "プレイバック", penname: "やっくん", image: "19", caption: "緑の中を走り抜けてく真紅なポルシェ一人旅なの私気ままにハンドル切るの交差点では隣りの車がミラーこすったと怒鳴っているから私もついつい大声になる馬鹿にしないでよ。そっちのせいよ。", },
    { grade: "3", size: "2", title: "きみの朝", penname: "岸田智史", image: "20", caption: "横たわるきみの顔に朝の光が射している過去の重さを洗おうとしてたどりついた深い眠りよ別れようとする魂と出会おうとする魂とあゝ心より躯のほうが確かめられるというのか。", },
    { grade: "3", size: "2", title: "出発の歌", penname: "コムロ", image: "21", caption: "乾いた空を見上げているのは誰だお前の目に焼き付いたものは 化石の街愛の形が 壊れた時に残されたものは 出発の歌さあ 今銀河の向こうに飛んでゆけ", },
    { grade: "3", size: "1", title: "傘がない", penname: "ヨースイ", image: "22", caption: "行かなくちゃ 君に逢いに行かなくちゃ君の町に行かなくちゃ 雨にぬれ", },
    { grade: "3", size: "3", title: "狙いうち", penname: "リンダ", image: "23", caption: "ウララ ウララ ウラウラでウララ ウララ ウラウラよウララ ウララ ウラウラのこの世は私のためにある", },
    { grade: "3", size: "1", title: "北の国から", penname: "まさし", image: "24", caption: "アーア アアアア アーアーアアー アアアア アーンンー ンンンン ンーンンンンン ンンン ンンアーア アアアア アーアーアアー アアアア アー", },
    { grade: "3", size: "2", title: "うっせぇわ", penname: "syudou", image: "25", caption: "はぁ？うっせぇうっせぇうっせぇわくせぇ口塞くちふたげや限界げんかいです絶対ぜったい絶対ぜったい現代げんだいの代弁者だいべんしゃは私わたしやろがいもう見飽みあきたわ", },
    { grade: "1", size: "1", title: "棒人間", penname: "野田洋次郎", image: "26", caption: "見た目が人間でなもんで 皆人並みに相手してくれます僕も期待に応えたくて 日々努力を惜しまないのです笑顔と同情と謙遜と自己犠牲、朝起床に優しさと優に1億は超えそうな 必要事項を生きるのです", },
    { grade: "3", size: "1", title: "藍色好きさ", penname: "絵音", image: "27", caption: "足しても引いても僕らはいつも違う数になって答えが出ては笑って抱き合ったその度優しさは同じだけ重なり合って深く深く望んだ", },
    { grade: "1", size: "3", title: "紅蓮の弓矢", penname: "Revo", image: "28", caption: "囚われた屈辱は 反撃の嚆矢(こうし)だ 城壁の其の彼方 獲物を屠る≪狩人≫(イェーガー)迸る≪殺意≫(しょうどう)に 其の身を灼きながら 黄昏に緋を穿つ紅蓮の弓矢", },
    { grade: "2", size: "2", title: "Wherever you are", penname: "Taka", image: "29", caption: "この先長いことずっとどうかこんな僕とずっと死ぬまで Stay with meWe carry on…", },
    { grade: "5", size: "1", title: "memories", penname: "まき", image: "30", caption: "もしも世界が変わるのなら何も知らない頃の私に連れていって　思い出が色あせないように", },
    { grade: "5", size: "3", title: "夜に駆ける", penname: "YOASOBI", image: "31", caption: "騒がしい日々に笑えない君に思い付く限り眩しい明日を明けない夜に落ちてゆく前に僕の手を掴んでほら忘れてしまいたくて閉じ込めた日々も抱きしめた温もりで溶かすから怖くないよいつか日が昇るまで二人でいよう", },
    { grade: "1", size: "1", title: "Take a picture", penname: "NiziU", image: "32", caption: "伝えたいの君に抱きしめられるの好き、こんなにありったけの愛をTo you　あげるよ oh　ずっとI'll never let go", },
    { grade: "4", size: "1", title: "さくら", penname: "ケツメイシ", image: "33", caption: "さくら舞い散る中に忘れた記憶と 君の声が戻ってくる吹き止まない春の風 あの頃のままで君が風に舞う髪かき分けた時の 淡い香り戻ってくる二人約束した あの頃のままでヒュルリーラ ヒュルリーラ", },
    { grade: "6", size: "2", title: "TEENAGE VIBE", penname: "kZm・Tohji", image: "34", caption: "超高速道路にのった Whipこの存在意義をはったギャンブル大事なもんはもった全部この人生週間少年ジャンプ", },
    { grade: "3", size: "2", title: "ドライフラワー", penname: "優里", image: "35", caption: "多分たぶん、私わたしじゃなくていいね余裕よゆうのない二人ふたりだったし気付きづけば喧嘩けんかばっかりしてさごめんね", },
    { grade: "1", size: "1", title: "ギラギラ", penname: "てにをは", image: "36", caption: "ギラギラ輝いて私は夜を呑みRap Tap Tap Tap今に見てろこのluv(ラヴ)目に染みるは1mgの花火Drag on Drag onなんてファニー　この世はビザール", },
    { grade: "3", size: "1", title: "猫", penname: "あいみょん", image: "37", caption: "夕焼ゆうやけが燃もえてこの街まちごと飲のみ込こんでしまいそうな今日きょうに僕ぼくは君きみを手放てばなしてしまった", },
    { grade: "2", size: "3", title: "ReSTARTING!!", penname: "愛美", image: "38", caption: "自分がいちばんわかってる何者(なに)にもなれないってだけど本当は「ちょっとぐらい」って、バカみたいだ。", },
    { grade: "4", size: "2", title: "怪物", penname: "Ayase", image: "39", caption: "この世界せかいで何なにが出来できるのか僕ぼくには何なにが出来できるのかただその真まっ黒くろな目めから涙なみだ溢こぼれ落おちないように", },
    { grade: "5", size: "3", title: "Pretender", penname: "Official髭男dism", image: "40", caption: "君とのラブストーリーそれは予想通りいざ始まればひとり芝居だずっとそばにいたって結局ただの観客だ", },
    { grade: "1", size: "1", title: "あの日のスウィートメロディ", penname: "CLIEVY", image: "41", caption: "ひとりぼっちを持ち寄って　始めた部屋に2人で肩を寄せ合って　夢を詰めた大抵朝は決まって　目覚ましが先に起きてひとつに減った鍵を眺めてドアをしめた", },
    { grade: "6", size: "1", title: "Lights", penname: "UTA/", image: "42", caption: "電話やLINEを返せない日曜何も手につけれないよたまにだけど嫌になるよ今が少し怖くなるんだ", },
    { grade: "2", size: "3", title: "SAKURA", penname: "良樹", image: "43", caption: "電車から 見えたのは いつかのおもかげ ふたりで通った 春の大橋卒業の ときが来て 君は故郷(まち)を出た 色づく川辺に あの日を探すの", },
    { grade: "1", size: "3", title: "チェリー", penname: "スピッツ", image: "44", caption: "愛してるの響きだけで 強くなれる気がしたよささやかな喜びを つぶれるほど抱きしめて", },
    { grade: "6", size: "1", title: "Lemon", penname: "米津玄師", image: "45", caption: "あの日の悲しみさえ　あの日の苦しみさえそのすべてを愛してた　あなたとともに胸に残り離れない　苦いレモンの匂い雨が降り止むまでは帰れない今でもあなたはわたしの光", },
    { grade: "4", size: "2", title: "全力全開!ゼンカイジャー", penname: "つるの剛士", image: "46", caption: "秘密の銃で　正義の雄叫びマジなスピリッツ　キラメく仲間(バディ)と古代も未来も　どんな並行世界(ばしょ)でも奇跡のキズナ　勇者のチカラ", },
    { grade: "3", size: "1", title: "群青", penname: "Ayase", image: "47", caption: "知らず知らず隠してた本当の声を響かせてよ、ほら見ないフリしていても確かにそこにある", },
    { grade: "1", size: "2", title: "白日", penname: "Daiki Tsuneta", image: "48", caption: "時には誰かを知らず知らずのうちに傷つけてしまったり失ったりして初めて犯した罪を知る", },
    { grade: "1", size: "1", title: "糸", penname: "中島みゆき", image: "49", caption: "縦の糸はあなた 横の糸は私織りなす布は いつか誰かを暖めうるかもしれない", },
    { grade: "2", size: "2", title: "桜が降る夜は", penname: "あいみょん", image: "50", caption: "桜が降る夜は貴方に会いたい、と思いますどうして？と聞かれても分からないのが恋でこの体ごと貴方に恋してるそれだけは分かるのです", },
    { grade: "5", size: "3", title: "ぐだふわエブリデー", penname: "悠木碧", image: "51", caption: "しかし穏やかな生活を目指そうとしてもまるで荒波のように次々と困難は襲いかかってくるのです！静謐　太平　我が家の安寧", },
    { grade: "1", size: "1", title: "バスごっこ", penname: "湯山昭", image: "52", caption: "大型バスに のってますキップをじゅんに わたしてねおとなりへ(ハイ) おとなりへ(ハイ)おとなりへ(ハイ) おとなりへ(ハイ)おわりのひとは ポケットに!", },
    { grade: "5", size: "3", title: "マリーゴールド", penname: "みょん", image: "53", caption: "目の前でずっと輝いている幸せだ", },
    { grade: "1", size: "1", title: "One Last Kiss", penname: "ヒカル", image: "54", caption: "もういっぱいあるけどもう一つ増やしましょう", },
    { grade: "6", size: "2", title: "炎", penname: "梶浦由記・LiSA", image: "55", caption: "さよならありがとう声こえの限かぎり悲かなしみよりもっと大事だいじなこと去さりゆく背中せなかに伝つたえたくてぬくもりと痛いたみに間まに合あうように", },
    { grade: "6", size: "2", title: "GRATEFUL DAYS", penname: "ACO", image: "56", caption: "Turn up radio そう今日も聞こえるよ 風に揺られ流れるStereo", },
    { grade: "1", size: "1", title: "廻廻奇譚", penname: "Eve", image: "57", caption: "闇を祓って　闇を祓って夜の帳が下りたら合図だ相対して　廻る環状戦戯言などは　吐き捨ていけと", },
    { grade: "3", size: "3", title: "なんでもないや", penname: "RADWIMPS", image: "58", caption: "二人の間 通り過ぎた風は どこから寂しさを運んできたの泣いたりしたそのあとの空は やけに透き通っていたりしたんだ", },
    { grade: "1", size: "1", title: "優しい彗星", penname: "SOBI", image: "59", caption: "今、静かな夜の中で無計画に車を走らせた左隣、あなたの横顔を月が照らした", },
    { grade: "2", size: "2", title: "勿忘", penname: "atagi", image: "60", caption: "例えば今君が　その瞳濡らしていたとしても呼ぶ声はもう聞こえない絵の具を溶かすように　君との日々は記憶の中　滲んでく", },
    { grade: "2", size: "3", title: "虹", penname: "ひゅーい", image: "61", caption: "ありのままの二人ふたりでいいよ陽ひだまりみつけて遊あそぼうよベランダで水みずをやる君きみの足元あしもとに小ちいさな虹にじねぇ", },
    { grade: "1", size: "1", title: "感電", penname: "玄師", image: "62", caption: "逃げ出したい夜の往来　行方は未だ不明回り回って虚しくって　困っちゃったワンワンワン失ったつもりもないが　何か足りない気分ちょっと変にハイになって　吹かし込んだ四輪車", },
    { grade: "6", size: "1", title: "愛の待ちぼうけ", penname: "堂珍嘉邦・上田禎", image: "63", caption: "仕舞い込んでる　迷子の言葉集めて　繰り返し見上げる空に　願い事叶えよう　祈るように", },
    { grade: "1", size: "1", title: "楓", penname: "正宗", image: "64", caption: "忘れはしないよ 時が流れてもいたずらなやりとりや心のトゲさえも 君が笑えばもう小さく丸くなっていたこと", },
    { grade: "5", size: "1", title: "Show me what you got!", penname: "flare", image: "65", caption: "夢の途中で流した涙胸の深くで終わらない期待上を目指せば避けられぬ傷その痛み　チカラに変えて", },
    { grade: "4", size: "1", title: "The Beginning", penname: "Taka", image: "66", caption: "Take my handand bring me back", },
    { grade: "1", size: "1", title: "ふるさと", penname: "貞一", image: "67", caption: "兎うさぎ追おいしかの山やま小鮒こぶな釣つりしかの川かわ夢ゆめは今いまもめぐりて忘わすれがたき故郷ふるさと", },
    { grade: "3", size: "1", title: "正夢", penname: "草野正", image: "68", caption: "似たような道をはみ出そう", },
    { grade: "5", size: "1", title: "ハッピーエンド", penname: "清水依与", image: "69", caption: "平気よ大丈夫だよ優しくなれたと思って願いに変わって最後は嘘になって", },
    { grade: "2", size: "1", title: "シンデレラガール", image: "69", penname: "まる", caption: "PM11時間近の にぎわう街並みにまだサヨナラ言うには 全然早すぎるのに", },
    { grade: "1", size: "1", title: "童謡・唱歌", penname: "不祥", image: "71", caption: "やりましょうやりましょうこれから鬼おにの征伐せいばつについて行いくならやりましょう", },
    { grade: "3", size: "1", title: "七つの子", penname: "長世", image: "72", caption: "からす なぜなくのからすは やまにかわいい ななつのこがあるからよ", },
    { grade: "4", size: "1", title: "春泥棒", penname: "n-buna", image: "73", caption: "高架橋を抜けたら雲の隙間に青が覗いた最近どうも暑いからただ風が吹くのを待ってた", },
    { grade: "1", size: "1", title: "香水", penname: "瑛人", image: "74", caption: "別べつに君きみを求もとめてないけど横よこにいられると思おもい出だす君きみのドルチェ&ガッバーナのその香水こうすいのせいだよ", },
    { grade: "5", size: "1", title: "世界の約束", penname: "倍賞千恵子", image: "75", caption: "涙の奥にゆらぐほほえみは時の始めからの世界の約束", },
    { grade: "1", size: "1", title: "ブルーベリー・ナイツ", penname: "はっとり", image: "76", caption: "合鍵は返してね愛がないならもう会えないよ", },
    { grade: "2", size: "1", title: "クロノスタシス", penname: "きのこ帝国", image: "77", caption: "コンビニエンスストアで350mlの缶ビール買ってきみと夜の散歩時計の針は0時を差してる", },
    { grade: "1", size: "1", title: "ギブス", penname: "林檎", image: "78", caption: "あなたはすぐに写真を撮りたがるあたしは何時も其れを厭がるのだって写真になっちゃえばあたしが古くなるじゃない", },
    { grade: "6", size: "1", title: "高嶺の花子さん", penname: "back number", image: "79", caption: "君から見た僕はきっと ただの友達の友達たかが知人Bにむけられた 笑顔があれならもう 恐ろしい人だ", },
    { grade: "6", size: "3", title: "ヤングアダルト", penname: "マカロニえんぴつ", image: "80", caption: "こんなはずじゃなかったかい？でもね、そんなもんなのかもしれない僕らに足りないのはいつだってアルコールじゃなくて愛情なんだけどな", },
    { grade: "6", size: "3", title: "ひまわりの約束", penname: "秦基博", image: "81", caption: "どうして君が泣くの まだ僕も泣いていないのに自分より 悲しむから つらいのがどっちか わからなくなるよ", },
    { grade: "6", size: "2", title: "桜の花びらたち", penname: "AKB48", image: "82", caption: "それぞれの未来へと 旅立って行くんだねその背中に 夢の翼(はね)が 生えてる", },
];